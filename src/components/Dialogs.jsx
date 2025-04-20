import TaskDialog from "./TaskDialog.jsx";
import TaskInput from "./TaskInput.jsx";
import TaskDetails from "./TaskDetails.jsx";
import TaskDeletion from "./TaskDeletion.jsx";

export default function Dialogs({
  addTaskDialogRef,
  taskDetailsDialogRef,
  taskDeleteDialogRef,
  taskEditDialogRef,

  taskInputProps,
  taskEditProps,
  
  selectedTask,
  handleAddTask,
  handleEditTask,
  deleteTask,
  openEditDialog,
}) {
  return (
    <>
      {/* New Task Dialog */}
      <TaskDialog
        ref={addTaskDialogRef}
        title="New Task"
        onClose={taskInputProps.onClose}>
        <TaskInput
          {...taskInputProps}
          onSubmit={handleAddTask}
        />
      </TaskDialog>

      {/* Task Details Dialog */}
      <TaskDialog
        ref={taskDetailsDialogRef}
        title="Task Details"
        onClose={() => taskDetailsDialogRef.current.close()}>
        <TaskDetails task={selectedTask} />
        {!selectedTask?.completed && (
          <div className="dialog-btn">
            <button
              className="btn-edit"
              onClick={() => {
                taskDetailsDialogRef.current.close();
                openEditDialog();
              }}>
              Edit
            </button>
          </div>
        )}
      </TaskDialog>

      {/* Edit Task Dialog */}
      <TaskDialog
        ref={taskEditDialogRef}
        title="Edit Task"
        onClose={taskEditProps.onClose}>
        <TaskInput
          {...taskEditProps}
          onSubmit={handleEditTask}
        />
      </TaskDialog>

      {/* Delete Task Dialog */}
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
    </>
  );
}
