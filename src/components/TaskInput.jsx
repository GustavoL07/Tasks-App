import "../css/TaskInput.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Task from "../Task.js";

export default function taskInput({
  nameValue,
  descriptionValue,
  dueToValue,
  categoryValue,
  typeValue,
  nameOnChange,
  dueToOnChange,
  descriptionOnChange,
  categoryOnChange,
  typeOnChange,
  onSubmit,
  labelText,
}) {
  return (
    <form
      id="form"
      name="input-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
      <div className="input-container">
        <input
          id="TEXT"
          name="TEXT"
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
          id="TEXT-AREA"
          name="TEXT-AREA"
          className="text-description"
          placeholder={labelText.description}
          value={descriptionValue}
          onChange={(e) => descriptionOnChange(e.target.value)}></textarea>

        <div id="date-container">
          <DatePicker
            id="DATE-PICKER"
            name="DATE-PICKER"
            className="date-input"
            selected={dueToValue}
            onChange={(date) => dueToOnChange(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText={labelText.dueDate}
            showPopperArrow={false}
          />

          <select
            id="SELECT-CATEGORY"
            name="SELECT-CATEGORY"
            className="priority-select"
            value={categoryValue}
            onChange={(e) => categoryOnChange(e.target.value)}>
            <option
              key={Task.priority.none}
              value={Task.priority.none}>
              Priority
            </option>

            {Object.entries(Task.priority).map(([key, value]) => {
              return key === "none" ? null : (
                <option
                  key={key}
                  value={value}>
                  {value}
                </option>
              );
            })}
          </select>

          <select
            id="SELECT-TYPE"
            name="SELECT-TYPE"
            className="priority-select"
            value={typeValue}
            onChange={(e) => typeOnChange(e.target.value)}>
            <option
              key={Task.type.none}
              value={Task.type.none}>
              Type
            </option>

            {Object.entries(Task.type).map(([key, value]) => {
              return key === "none" ? null : (
                <option
                  key={key}
                  value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>

        <button
          id="BUTTON"
          name="BUTTON"
          type="submit"
          className="task-btn">
          {labelText.btnText}
        </button>
      </div>
    </form>
  );
}
