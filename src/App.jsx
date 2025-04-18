import { useRef, useState, useEffect } from "react";
import useTaskManager from "./hooks/useTaskManager.js";
import { useFeedbackMsg } from "./hooks/useFeedbackMsg.js";
import { formatDueToValue } from "./utils.js";

import TaskInput from "./components/TaskInput.jsx";
import TaskItem from "./components/TaskItem.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import TaskDeletion from "./components/TaskDeletion.jsx";
import FeedbackMsg from "./components/FeedbackMsg.jsx";
import TaskDialog from "./components/TaskDialog.jsx";
import Header from "./components/Header.jsx";
import "./css/App.css";

export default function App() {
  const addTaskDialogRef = useRef(null);
  const taskDetailsDialogRef = useRef(null);
  const taskDeleteDialogRef = useRef(null);
  const taskEditDialogRef = useRef(null);

  const [sortMethod, setSortMethod] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [feedbackMsg, showFeedbackMsg] = useFeedbackMsg();

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

  const [taskInputValue, setTaskInputValue] = useState("");
  const [taskDescriptionValue, setTaskDescriptionValue] = useState("");
  const [taskDueToValue, setTaskDueToValue] = useState(null);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskType, setTaskType] = useState("");

  const [taskEditedInputValue, setTaskEditedInputValue] = useState("");
  const [taskEditedDescriptionValue, setTaskEditedDescriptionValue] = useState("");
  const [taskEditedDueToValue, setTaskEditedDueToValue] = useState(null);
  const [taskEditedCategoryValue, setTaskEditedCategoryValue] = useState("");
  const [taskEditedTypeValue, setTaskEditedTypeValue] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "+") {
        addRandomTask();
      } else if (event.key === "-") {
        deleteAllTasks();
      } else if (event.key === "*") {
        console.log(taskList);
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
      category: taskCategory,
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
      classification: { category: taskEditedCategoryValue, type: taskEditedTypeValue },
    });

    resetTaskEditedValues();
    taskEditDialogRef.current.close();
  }

  function resetTaskValues() {
    setTaskInputValue("");
    setTaskDescriptionValue("");
    setTaskDueToValue(null);
    setTaskCategory("");
    setTaskType("");
  }

  function resetTaskEditedValues() {
    setTaskEditedInputValue("");
    setTaskEditedDescriptionValue("");
    setTaskEditedDueToValue(null);
    setTaskEditedCategoryValue("");
    setTaskEditedTypeValue("");
  }

  function openEditDialog() {
    taskEditDialogRef.current.showModal();

    setTaskEditedInputValue("");
    setTaskEditedDescriptionValue("");
    setTaskEditedDueToValue(null);
    setTaskEditedCategoryValue("");
  }

  return (
    <>
      {/* NEW TASK */}
      <TaskDialog
        ref={addTaskDialogRef}
        title="New Task"
        onClose={() => {
          addTaskDialogRef.current.close();
          setTaskInputValue("");
          setTaskDescriptionValue("");
          setTaskDueToValue(null);
          setTaskCategory("");
        }}>
        <TaskInput
          nameValue={taskInputValue}
          descriptionValue={taskDescriptionValue}
          dueToValue={taskDueToValue}
          categoryValue={taskCategory}
          typeValue={taskType}
          nameOnChange={setTaskInputValue}
          descriptionOnChange={setTaskDescriptionValue}
          dueToOnChange={setTaskDueToValue}
          categoryOnChange={setTaskCategory}
          typeOnChange={setTaskType}
          labelText={{
            name: "Task Name",
            description: "Task Description",
            dueDate: "Due Date",
            btnText: "Add Task",
          }}
          onSubmit={handleAddTask}
        />
      </TaskDialog>

      {/* TASK DETAILS */}
      <TaskDialog
        ref={taskDetailsDialogRef}
        title="Task Details"
        onClose={() => taskDetailsDialogRef.current.close()}>
        <TaskDetails task={selectedTask} />
        {!selectedTask?.completed && (
          <div className="dialog-btn">
            <button
              className="edit"
              onClick={() => {
                taskDetailsDialogRef.current.close();
                openEditDialog();
              }}>
              Edit
            </button>
          </div>
        )}
      </TaskDialog>

      {/* EDIT TASK */}
      <TaskDialog
        ref={taskEditDialogRef}
        title="Edit Task"
        onClose={() => {
          taskEditDialogRef.current.close();
          setTaskEditedInputValue("");
          setTaskEditedDescriptionValue("");
          setTaskEditedDueToValue(null);
        }}>
        <TaskInput
          nameValue={taskEditedInputValue}
          descriptionValue={taskEditedDescriptionValue}
          dueToValue={taskEditedDueToValue}
          categoryValue={taskEditedCategoryValue}
          typeValue={taskEditedTypeValue}
          nameOnChange={setTaskEditedInputValue}
          descriptionOnChange={setTaskEditedDescriptionValue}
          dueToOnChange={setTaskEditedDueToValue}
          categoryOnChange={setTaskEditedCategoryValue}
          typeOnChange={setTaskEditedTypeValue}
          labelText={{
            name: "New Name",
            description: "New Description",
            dueDate: "New Date",
            btnText: "Save Changes",
          }}
          onSubmit={handleEditTask}
        />
      </TaskDialog>

      {/* DELETE TASK */}
      <TaskDialog
        ref={taskDeleteDialogRef}
        onClose={() => taskDeleteDialogRef.current.close()}>
        <TaskDeletion
          task={selectedTask}
          onClickDelete={() => {
            deleteTask(selectedTask.id);
            taskDeleteDialogRef.current.close();
          }}
        />
      </TaskDialog>

      {/* HEADER */}
      <Header
        title={"Tasks App"}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        addTaskOnClick={() => addTaskDialogRef.current.showModal()}
        sortValue={sortMethod}
        onSortChange={setSortMethod}></Header>

      <FeedbackMsg
        text={feedbackMsg.text}
        type={feedbackMsg.type}
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
    </>
  );
}
