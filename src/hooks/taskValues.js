import { useState } from "react";

export function useTaskValues() {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [taskDescriptionValue, setTaskDescriptionValue] = useState("");
  const [taskDueToValue, setTaskDueToValue] = useState(null);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskType, setTaskType] = useState("");

  const [taskEditedInputValue, setTaskEditedInputValue] = useState("");
  const [taskEditedDescriptionValue, setTaskEditedDescriptionValue] = useState("");
  const [taskEditedDueToValue, setTaskEditedDueToValue] = useState(null);
  const [taskEditedCategoryValue, setTaskEditedCategoryValue] = useState("");
  const [taskEditedTypeValue, setTaskEditedTypeValue] = useState("");

  function resetTaskValues() {
    setTaskInputValue("");
    setTaskDescriptionValue("");
    setTaskDueToValue(null);
    setTaskCategory("");
    setTaskType("");
  }

  function resetTaskEditedValues() {
    setTaskEditedInputValue("");
    setTaskEditedDescriptionValue("");
    setTaskEditedDueToValue(null);
    setTaskEditedCategoryValue("");
    setTaskEditedTypeValue("");
  }

  return {
    taskInputValue,
    setTaskInputValue,
    taskDescriptionValue,
    setTaskDescriptionValue,
    taskDueToValue,
    setTaskDueToValue,
    taskCategory,
    setTaskCategory,
    taskType,
    setTaskType,

    taskEditedInputValue,
    setTaskEditedInputValue,
    taskEditedDescriptionValue,
    setTaskEditedDescriptionValue,
    taskEditedDueToValue,
    setTaskEditedDueToValue,
    taskEditedCategoryValue,
    setTaskEditedCategoryValue,
    taskEditedTypeValue,
    setTaskEditedTypeValue,

    resetTaskValues,
    resetTaskEditedValues,
  };
}
