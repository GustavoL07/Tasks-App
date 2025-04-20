import { getFormattedDay, getFormattedHour, parseDate } from "./utils.js";
import { v4 as uniqueID } from "uuid";

class Task {
  static category = {
    none: "",
    urgent: "Urgent",
    important: "Important",
    later: "Later",
  };

  static type = {
    none: "",
    personal: "Personal",
    work: "Work",
    school: "School",
    email: "Email",
    calls: "Calls",
    meetings: "Meetings",
    shopping: "Shopping",
    other: "Other",
  };

  static getSoonestTask(a, b) {
    return (a.dueTo ? parseDate(a.dueTo) : Infinity) - (b.dueTo ? parseDate(b.dueTo) : Infinity);
  }

  static getLatestTask(a, b) {
    return (b.dueTo ? parseDate(b.dueTo) : 0) - (a.dueTo ? parseDate(a.dueTo) : 0);
  }

  constructor(name, description = "", dueTo = null, classification = { category: "", type: "" }, completed = false) {
    this.id = uniqueID();

    this.name = name;
    this.description = description;
    this.dueTo = dueTo;

    this.completed = completed;
    this.classification = classification;
    this.creation = { hour: getFormattedHour(), day: getFormattedDay() };
    this.completedAt = { hour: null, day: null };
  }

  complete() {
    this.completed = true;
  }
}

export default Task;
