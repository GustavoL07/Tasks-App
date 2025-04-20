import "../css/Footer.css";
import Task from "../Task.js";

export default function Footer({ taskList, title = "Current Progress" }) {
  if (taskList.length === 0) return;

  const listLength = taskList.length;
  const completedTasks = taskList.filter((task) => task.completed).length;
  const completedPercentage = Math.round((completedTasks / listLength) * 100) || 0;
  const remainingTasks = listLength - completedTasks;

  const soonestTask = taskList.sort((a, b) => {
    return Task.getSoonestTask(a, b);
  })[0];

  const latestTask = taskList.sort((a, b) => {
    return Task.getLatestTask(a, b);
  })[0];

  return (
    <footer className="footer">
      <p className="title">{title}</p>
      <div className="footer-content">
        <div>
          <p>
            You have {listLength} tasks in total, {completedTasks} completed, and {remainingTasks}{" "}
            remaining.
          </p>
          <p>
            Completion Rate: <span className="text">{completedPercentage}%</span>
          </p>
        </div>
        <div>
          <p>Soonest : {soonestTask.name} - {soonestTask.dueTo}</p>
          <p>Latest  : {latestTask.name} - {latestTask.dueTo}</p>
        </div>
      </div>
    </footer>
  );
}
