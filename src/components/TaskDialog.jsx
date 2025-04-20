import { forwardRef } from "react";
import "../css/TaskDialog.css";

const TaskDialog = forwardRef(({ title, children, onClose }, ref) => {
  return (
    <dialog ref={ref}>
      {title && <p className="title">{title}</p>}

      {children}

      <div className="btn-container">
        <button
          className="close"
          onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
});

export default TaskDialog;
