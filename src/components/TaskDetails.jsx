import "../css/TaskDetails.css";
export default function TaskDetails({ task }) {
  if (task === null) return;

  return (
    <div className="details-container">
      {task.completed && task.completedAt.hour && (
        <div className="task-completed">
          Completed!
          <br /> {task.completedAt.hour}, {task.completedAt.day}{" "}
        </div>
      )}

      <div>
        {task.classification?.priority && !task.completed && (
          <p
            className="creation-c"
            id="priority">
            {task.classification.priority}
          </p>
        )}

        <p className="details-name">{task.name}</p>

        <div className="main">
          <div>
            <p className="creation">Due To:</p>
            <p
              className="creation"
              id="time">
              {task.dueTo || "--/--/----"}
            </p>
          </div>

          <div className="creation-c-container">
            <p className="creation-c">Created At:</p>
            <p
              className="creation-c"
              id="time">
              {task.creation.hour}
            </p>
            <p
              className="creation-c"
              id="time">
              {task.creation.day}
            </p>
          </div>
        </div>
      </div>

      {task.classification.type && (
        <p className="classification-type">{task.classification.type}</p>
      )}

      {task.description && (
        <div className="description">
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
}
