import "../css/Sidebar.css";
import Task from "../Task.js";

export default function Sidebar({ taskList, title, setSidebar, setTheme, theme }) {
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

  let tasksAmountText;
  if (listLength === 0) tasksAmountText = "Create a new Task!";
  else if (listLength === 1) tasksAmountText = "You have 1 task in total.";
  else tasksAmountText = `You have ${listLength} tasks in total.`;

  let completedTasksText = completedTasks > 0 ? `Completed: ${completedTasks}` : "";
  let remainingTasksText = `Remaining: ${remainingTasks}`;
  let completedPercentageText = completedPercentage > 0 ? `Completed: ${completedPercentage}%` : "";

  return (
    <div
      className="sidebar-container"
      onMouseEnter={() => setSidebar(true)}
      onMouseLeave={() => setSidebar(false)}>
      <div className="sidebar-content">
        <p className="title">{title}</p>
        <ul>
          <li className="section-text">Overview</li>
          <li>{tasksAmountText}</li>
          {completedTasks !== listLength && <li>{completedTasksText}</li>}
          {remainingTasks > 0 && <li>{remainingTasksText}</li>}
          {completedPercentage !== 0 && completedPercentage !== 100 && (
            <li>{completedPercentageText}</li>
          )}
          {completedPercentage === 100 && <li className="all-completed">All tasks completed!</li>}
        </ul>

        {soonestTask && (
          <ul>
            <li className="section-text">Soonest</li>
            <li className="important">{soonestTask.name}</li>
            <li>Due to: {soonestTask.dueTo}</li>
          </ul>
        )}

        {latestTask && (
          <ul>
            <li className="section-text">Latest</li>
            <li className="important">{latestTask.name}</li>
            <li>Due to: {latestTask.dueTo}</li>
          </ul>
        )}

        <button
          className="theme-toggle-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
