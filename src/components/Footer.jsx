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
      <p className="important">
        {title}: {completedPercentage}%
      </p>
      <div className="footer-content">
        <div>
          <p>
            <p className="footer-text">You have {listLength} tasks in total.</p> 
            <p className="footer-text">{completedTasks} completed</p>
            <p className="footer-text">{remainingTasks} remaining</p>
          </p>
        </div>
        <div>
          <p className="footer-text">
            Soonest : {soonestTask.name} - {soonestTask.dueTo}
          </p>
          <p className="footer-text">
            Latest : {latestTask.name} - {latestTask.dueTo}
          </p>
        </div>
      </div>
    </footer>
  );
}
