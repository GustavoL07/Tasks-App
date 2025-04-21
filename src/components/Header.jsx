import "../css/Header.css";
export default function Header({
  title,
  searchValue,
  onSearchValueChange,
  addTaskOnClick,
  sortValue,
  onSortChange,
}) {
  return (
    <>
      <p className="header-title">{title}</p>
      <div className="header-container">
        <button
          className="task-btn"
          onClick={addTaskOnClick}>
          New Task
        </button>

        <input
          id="SEARCH"
          name="SEARCH"
          type="text"
          className="text-input"
          placeholder="Search Task"
          value={searchValue}
          onChange={(e) => onSearchValueChange(e.target.value)}
        />

        <select
          id="SORT"
          name="SORT"
          className="priority-select"
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Sort</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="due-date-soon">Due Date (Soonest)</option>
          <option value="due-date-late">Due Date (Latest)</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted</option>
          <option value="priority">Priority</option>
          <option value="type">Type</option>
        </select>
      </div>
    </>
  );
}
