import "../css/TaskInput.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function taskInput({
  nameValue,
  descriptionValue,
  dueToValue,
  categoryValue,
  nameOnChange,
  dueToOnChange,
  descriptionOnChange,
  categoryOnChange,
  onSubmit,
  labelText,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          placeholder={labelText.name}
          value={nameValue}
          onChange={(e) => nameOnChange(e.target.value)}
          autoComplete="off"
          required
          maxLength={20}
        />

        <textarea
          className="text-description"
          placeholder={labelText.description}
          value={descriptionValue}
          onChange={(e) => descriptionOnChange(e.target.value)}></textarea>

        <div id="date-container">
          <DatePicker
            className="date-input"
            selected={dueToValue}
            onChange={(date) => dueToOnChange(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText={labelText.dueDate}
            showPopperArrow={false}
          />

          <select
            className="category-select"
            value={categoryValue}
            onChange={(e) => categoryOnChange(e.target.value)}>
            <option value="">Category</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
            <option value="Later">Later</option>
          </select>
        </div>

        <button
          type="submit"
          className="task-btn">
          {labelText.btnText}
        </button>
      </div>
    </form>
  );
}
