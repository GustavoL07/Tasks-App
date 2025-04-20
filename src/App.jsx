import { useState, useEffect } from "react";
import useTaskManager from "./hooks/useTaskManager.js";
import { useFeedbackMsg } from "./hooks/useFeedbackMsg.js";
import { formatDueToValue } from "./utils.js";
import { useDialogs } from "./hooks/useDialogs.js";
import { useTaskValues } from "./hooks/taskValues.js";

import TaskItem from "./components/TaskItem.jsx";
import FeedbackMsg from "./components/FeedbackMsg.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Dialogs from "./components/Dialogs.jsx";
import "./css/App.css";

export default function App() {
  const [sortMethod, setSortMethod] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [feedbackMsg, showFeedbackMsg] = useFeedbackMsg();
  const { addTaskDialogRef, taskDetailsDialogRef, taskDeleteDialogRef, taskEditDialogRef } =
    useDialogs();

  const {
    taskList,
    selectedTask,
    setSelectedTask,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted,
    addRandomTask,
    deleteAllTasks,
  } = useTaskManager(showFeedbackMsg, sortMethod, searchValue);

  const {
    taskInputValue,
    setTaskInputValue,
    taskDescriptionValue,
    setTaskDescriptionValue,
    taskDueToValue,
    setTaskDueToValue,
    taskCategory,
    setTaskCategory,
    taskType,
    setTaskType,
    taskEditedInputValue,
    setTaskEditedInputValue,
    taskEditedDescriptionValue,
    setTaskEditedDescriptionValue,
    taskEditedDueToValue,
    setTaskEditedDueToValue,
    taskEditedCategoryValue,
    setTaskEditedCategoryValue,
    taskEditedTypeValue,
    setTaskEditedTypeValue,

    resetTaskValues,
    resetTaskEditedValues,
  } = useTaskValues();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "+") {
        addRandomTask();
      } else if (event.key === "-") {
        deleteAllTasks();
      } else if (event.key === "*") {
        console.log(taskList);
      } else if (event.key === ".") {
        console.log(selectedTask);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleAddTask() {
    if (!taskInputValue.trim()) return;

    addTask(taskInputValue, taskDescriptionValue, taskDueToValue, {
      priority: taskCategory,
      type: taskType,
    });

    resetTaskValues();
    addTaskDialogRef.current.close();
  }

  function handleEditTask() {
    if (!selectedTask) return;

    editTask(selectedTask, {
      name: taskEditedInputValue,
      description: taskEditedDescriptionValue,
      dueTo: formatDueToValue(taskEditedDueToValue),
      classification: { priority: taskEditedCategoryValue, type: taskEditedTypeValue },
    });

    resetTaskEditedValues();
    taskEditDialogRef.current.close();
  }

  return (
    <>
      <Dialogs
        addTaskDialogRef={addTaskDialogRef}
        taskDetailsDialogRef={taskDetailsDialogRef}
        taskDeleteDialogRef={taskDeleteDialogRef}
        taskEditDialogRef={taskEditDialogRef}
        taskInputProps={{
          nameValue: taskInputValue,
          descriptionValue: taskDescriptionValue,
          dueToValue: taskDueToValue,
          categoryValue: taskCategory,
          typeValue: taskType,
          nameOnChange: setTaskInputValue,
          descriptionOnChange: setTaskDescriptionValue,
          dueToOnChange: setTaskDueToValue,
          categoryOnChange: setTaskCategory,
          typeOnChange: setTaskType,
          labelText: {
            name: "Task Name",
            description: "Task Description",
            dueDate: "Due Date",
            btnText: "Add Task",
          },
          onClose: resetTaskValues,
        }}
        taskEditProps={{
          nameValue: taskEditedInputValue,
          descriptionValue: taskEditedDescriptionValue,
          dueToValue: taskEditedDueToValue,
          categoryValue: taskEditedCategoryValue,
          typeValue: taskEditedTypeValue,
          nameOnChange: setTaskEditedInputValue,
          descriptionOnChange: setTaskEditedDescriptionValue,
          dueToOnChange: setTaskEditedDueToValue,
          categoryOnChange: setTaskEditedCategoryValue,
          typeOnChange: setTaskEditedTypeValue,
          labelText: {
            name: "New Name",
            description: "New Description",
            dueDate: "New Date",
            btnText: "Save Changes",
          },
          onClose: resetTaskEditedValues,
        }}
        selectedTask={selectedTask}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        deleteTask={deleteTask}
        openEditDialog={() => {
          taskEditDialogRef.current.showModal();
          resetTaskEditedValues();
        }}
      />

      <FeedbackMsg
        text={feedbackMsg.text}
        type={feedbackMsg.type}
      />

      {/* HEADER */}
      <Header
        title={"Tasks App"}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        addTaskOnClick={() => addTaskDialogRef.current.showModal()}
        sortValue={sortMethod}
        onSortChange={setSortMethod}
      />

      <div className="task-list-container">
        <ul>
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDetailsClick={() => {
                setSelectedTask(task);
                taskDetailsDialogRef.current.showModal();
              }}
              openDeleteDialog={() => {
                setSelectedTask(task);
                taskDeleteDialogRef.current.showModal();
              }}
              onToggleComplete={() => toggleTaskCompleted(task)}
            />
          ))}
        </ul>
      </div>

      <Footer taskList={taskList} />
    </>
  );
}
