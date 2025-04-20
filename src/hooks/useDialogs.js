import { useRef } from "react";

export function useDialogs() {
  const addTaskDialogRef = useRef(null);
  const taskDetailsDialogRef = useRef(null);
  const taskDeleteDialogRef = useRef(null);
  const taskEditDialogRef = useRef(null);

  return {
    addTaskDialogRef,
    taskDetailsDialogRef,
    taskDeleteDialogRef,
    taskEditDialogRef,
  };
}
