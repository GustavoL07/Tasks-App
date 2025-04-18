import "../css/TaskDeletion.css";

export default function TaskDeletion({ task, onClickDelete }) {
  if (!task) return null;

  return (
    <div className="task-deletion-container">
      <p className="task-deletion-title">Delete Task</p>

      <p className="task-deletion-warning">
        Are you sure you want to delete "{task.name}" ?
        <br />
        This action <span className="danger-text">cannot be undone</span>.
      </p>

      <div>
        <button className="delete-btn" onClick={onClickDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
