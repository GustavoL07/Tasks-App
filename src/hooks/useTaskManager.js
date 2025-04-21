import { useState } from "react";
import Task from "../Task";
import { getFormattedDay, getFormattedHour, formatDueToValue, randomTaskGenerator } from "../utils";

export default function useTaskManager(showFeedbackMsg, sortMethod, searchValue) {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  function addTask(name, description, dueTo, classification) {
    const newTask = new Task(name, description, formatDueToValue(dueTo), classification);
    setTaskList([newTask, ...taskList]);
    showFeedbackMsg("Task Created!", "add");
  }

  function addRandomTask() {
    const randomTask = { ...randomTaskGenerator() };
    addTask(randomTask.name, randomTask.description, randomTask.dueDate, randomTask.classification);
  }

  function editTask(originalTask, updatedValues) {
    const updatedList = taskList.map((task) => {
      return task === originalTask ? { ...task, ...updatedValues } : task;
    });

    setTaskList(updatedList);
    showFeedbackMsg("Changes Saved!", "edited");
  }

  function deleteTask(id) {
    const newList = taskList.filter((task) => task.id !== id);
    setTaskList(newList);
    showFeedbackMsg("Task Deleted!", "delete");
  }

  function deleteAllTasks() {
    setTaskList([]);
    showFeedbackMsg("ALL Tasks Deleted!", "delete");
  }

  function toggleTaskCompleted(targetTask) {
    const updated = taskList.map((task) => {
      if (task.id === targetTask.id) {
        const updatedTask = { ...task };
        updatedTask.completed = !task.completed;
        updatedTask.completedAt = {
          hour: getFormattedHour(),
          day: getFormattedDay(),
        };
        return updatedTask;
      }
      return task;
    });

    setTaskList(updated);
    if (!targetTask.completed) showFeedbackMsg("Task Completed!", "completed");
  }

  const filteredTasks = taskList.filter((task) => {
    return task.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortMethod) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "due-date-soon":
        return Task.getSoonestTask(a, b);

      case "due-date-late":
        return Task.getLatestTask(a, b);

      case "priority":
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;

        return (a.classification?.priority?.toLowerCase() || "zzz").localeCompare(
          b.classification?.priority?.toLowerCase() || "zzz"
        );

      case "type":
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;

        return (a.classification?.type?.toLowerCase() || "zzz").localeCompare(
          b.classification?.type?.toLowerCase() || "zzz"
        );

      case "completed":
        if (a.completed === b.completed) return 0;
        else return a.completed ? -1 : 0;

      case "incompleted":
        if (a.completed === b.completed) return 0;
        else return a.completed ? 0 : -1;

      default:
        return 0;
    }
  });

  return {
    taskList: sortedTasks,
    selectedTask,
    setSelectedTask,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted,
    addRandomTask,
    deleteAllTasks,
  };
}
