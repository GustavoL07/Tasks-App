import "../css/Sidebar.css";
import Task from "../Task.js";

export default function Sidebar({ taskList, title, setSidebar }) {
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
    <div
      className="sidebar-container"
      onMouseEnter={() => setSidebar(true)}
      onMouseLeave={() => setSidebar(false)}>
      <div className="sidebar-content">
        <p className="title">{title}</p>
        <ul>
          <li className="section-text">Status</li>
          <li>
            {listLength === 0 && (
              <p>Create a new Task!</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
