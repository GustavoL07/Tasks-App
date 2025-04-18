import "../css/TaskItem.css";
export default function TaskItem({ task, onDetailsClick, openDeleteDialog, toggleValue, onToggleComplete }) {
  if (!task) return;
  return (
    <>
      <li>
        <div className="container">
          <div className="info">
            <div className="name-wrapper">
              <p className={`name ${task.completed ? "completed" : ""}`}>{task.name}</p>
            </div>

            {task.dueTo && (
              <p className={`dueTo ${task.completed ? "completed" : ""}`}>Due To: {task.dueTo}</p>
            )}
          </div>

          <div className="options">
            {!task.completed && task.category && (
              <p className={`category ${task.completed ? "completed" : ""}`}>{task.category}</p>
            )}
            <div id="flex">
              <div className="btns">
                <button
                  className="config-btn"
                  onClick={onDetailsClick}>
                  Details
                </button>
                <button
                  className="config-btn"
                  onClick={openDeleteDialog}>
                  Delete
                </button>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="completed-checkbox"
                  value={toggleValue}
                  onClick={onToggleComplete}
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
