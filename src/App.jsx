import { useRef, useState } from "react";
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
  const [toggleValue, setToggleValue] = useState(false);

  const [feedbackMsg, showFeedbackMsg] = useFeedbackMsg();

  const {
    taskList,
    selectedTask,
    setSelectedTask,
    deleteIndex,
    setDeleteIndex,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted,
  } = useTaskManager(showFeedbackMsg, sortMethod, searchValue);

  const [taskInputValue, setTaskInputValue] = useState("");
  const [taskDescriptionValue, setTaskDescriptionValue] = useState("");
  const [taskDueToValue, setTaskDueToValue] = useState(null);
  const [taskCategory, setTaskCategory] = useState("");

  const [taskEditedInputValue, setTaskEditedInputValue] = useState("");
  const [taskEditedDescriptionValue, setTaskEditedDescriptionValue] = useState("");
  const [taskEditedDueToValue, setTaskEditedDueToValue] = useState(null);
  const [taskEditedCategoryValue, setTaskEditedCategoryValue] = useState("");

  function addTaskToList() {
    if (!taskInputValue.trim()) return;

    addTask(taskInputValue, taskDescriptionValue, taskDueToValue, taskCategory);

    setTaskInputValue("");
    setTaskDescriptionValue("");
    setTaskDueToValue(null);

    addTaskDialogRef.current.close();
  }

  function handleEditTask() {
    if (!selectedTask) return;

    editTask(selectedTask, {
      name: taskEditedInputValue,
      description: taskEditedDescriptionValue,
      dueTo: formatDueToValue(taskEditedDueToValue),
      category: taskEditedCategoryValue,
    });

    setTaskEditedInputValue("");
    setTaskEditedDescriptionValue("");
    setTaskEditedDueToValue(null);
    setTaskEditedCategoryValue("");

    taskEditDialogRef.current.close();
  }

  function openEditDialog() {
    taskEditDialogRef.current.showModal();

    setTaskEditedInputValue("");
    setTaskEditedDescriptionValue("");
    setTaskEditedDueToValue(null);
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
        }}>
        <TaskInput
          nameValue={taskInputValue}
          descriptionValue={taskDescriptionValue}
          dueToValue={taskDueToValue}
          categoryValue={taskCategory}
          nameOnChange={setTaskInputValue}
          descriptionOnChange={setTaskDescriptionValue}
          dueToOnChange={setTaskDueToValue}
          categoryOnChange={setTaskCategory}
          labelText={{
            name: "Task Name",
            description: "Task Description",
            dueDate: "Due Date",
            btnText: "Add Task",
          }}
          onSubmit={addTaskToList}
        />
      </TaskDialog>

      {/* TASK DETAILS */}
      <TaskDialog
        ref={taskDetailsDialogRef}
        title="Task Details"
        onClose={() => taskDetailsDialogRef.current.close()}>
        <TaskDetails task={selectedTask} />
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
          nameOnChange={setTaskEditedInputValue}
          descriptionOnChange={setTaskEditedDescriptionValue}
          dueToOnChange={setTaskEditedDueToValue}
          categoryOnChange={setTaskEditedCategoryValue}
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
            deleteTask(deleteIndex);
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
          {taskList.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onDetailsClick={() => {
                setSelectedTask(task);
                taskDetailsDialogRef.current.showModal();
              }}
              openDeleteDialog={() => {
                setDeleteIndex(index);
                setSelectedTask(task);
                taskDeleteDialogRef.current.showModal();
              }}
              toggleValue={toggleValue}
              onToggleComplete={() => {
                toggleTaskCompleted(index);
                setToggleValue(!toggleValue);
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
