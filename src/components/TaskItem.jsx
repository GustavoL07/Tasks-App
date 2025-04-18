import "../css/TaskItem.css";
export default function TaskItem({ task, onDetailsClick, openDeleteDialog, onToggleComplete }) {
  if (!task) return;
  return (
    <>
      <li>
        <div
          className={`container ${task.completed ? "completed" : ""}`}
          onClick={onDetailsClick}>
          <div className="info">
            <div className="name-wrapper">
              <p className={`name ${task.completed ? "completed" : ""}`}>{task.name}</p>
            </div>

            {task.classification.type && (
              <p className={`dueTo ${task.completed ? "completed" : ""}`}>
                {task.classification.type}
              </p>
            )}

            {task.dueTo && (
              <p className={`dueTo ${task.completed ? "completed" : ""}`}>Due To: {task.dueTo}</p>
            )}
          </div>

          <div className="options">
            {task.classification.category && (
              <p className={`category ${task.completed ? "completed" : ""}`}>
                {task.completed ? "Completed!" : task.classification.category}
              </p>
            )}
            {task.completed && !task.classification.category && (
              <p className={`category ${task.completed ? "completed" : ""}`}>
                {task.completed ? "Completed!" : task.classification.category}
              </p>
            )}
            <div id="flex">
              <button
                className="config-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteDialog();
                }}>
                Delete
              </button>
              <input
                id={task.id}
                type="checkbox"
                className="completed-checkbox"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleComplete();
                }}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
