import { getFormattedDay } from "./utils.js";
import { getFormattedHour } from "./utils.js";

class Task {
  constructor(name, description = "", dueTo = null, category="") {
    this.name = name;
    this.description = description;
    this.dueTo = dueTo;

    this.completed = false;
    this.category = category;
    this.creation = {time: getFormattedHour(), day: getFormattedDay()};
    this.completedAt = {time: null, day: null};
  }

  complete() {
    this.completed = true;
  }
}

export default Task;