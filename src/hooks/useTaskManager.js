import { useState } from "react";
import Task from "../Task";
import { getFormattedDay, getFormattedHour, formatDueToValue, parseDate } from "../utils";

export default function useTaskManager(showFeedbackMsg, sortMethod, searchValue) {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  function addTask(name, description, dueTo, category) {
    const newTask = new Task(name, description, formatDueToValue(dueTo), category);
    setTaskList([newTask, ...taskList]);
    showFeedbackMsg("Task Created!", "add");
  }

  function editTask(originalTask, updatedValues) {
    const updatedList = taskList.map((task) => {
      return task === originalTask ? { ...task, ...updatedValues } : task;
    });

    setTaskList(updatedList);
    showFeedbackMsg("Changes Saved!", "edited");
  }

  function deleteTask(indexToDelete) {
    const newList = taskList.filter((_, index) => index !== indexToDelete);
    setTaskList(newList);
    showFeedbackMsg("Task Deleted!", "delete");
  }

  function toggleTaskCompleted(index) {
    const updated = [...taskList];
    const task = updated[index];
    task.completed = !task.completed;
    task.completedAt = {
      day: getFormattedDay(),
      hour: getFormattedHour(),
    };

    setTaskList(updated);
    if (task.completed) showFeedbackMsg("Task Completed!", "completed");
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
        return parseDate(a.dueTo || Infinity) - parseDate(b.dueTo || Infinity);
      case "due-date-late":
        return parseDate(b.dueTo || 0) - parseDate(a.dueTo || 0);

      default:
        return 0;
    }
  });

  return {
    taskList: sortedTasks,
    selectedTask,
    setSelectedTask,
    deleteIndex,
    setDeleteIndex,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted,
  };
}
