import Task from "./Task.js";

export function getFormattedDay() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export function getFormattedHour() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  return `${hh}:${min}`;
}

export function formatDueToValue(dueToValue) {
  if (!dueToValue) return "";
  const dd = dueToValue.getDate().toString().padStart(2, "0");
  const mm = (dueToValue.getMonth() + 1).toString().padStart(2, "0");
  const yy = dueToValue.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

export function parseDate(dateStr) {
  const [dd, mm, yyyy] = dateStr.split("/");
  return new Date(yyyy, mm - 1, dd);
}

export function randomTaskGenerator(completed) {
  function getRandomClassification() {
    const categoriesArr = Object.entries(Task.category).map(([key, value]) => {
      return [key, value];
    });
    const randomCategoriesIndex = Math.floor(Math.random() * categoriesArr.length);

    const typesArr = Object.entries(Task.type).map(([key, value]) => {
      return [key, value];
    });
    const randomTypesIndex = Math.floor(Math.random() * typesArr.length);

    return {
      category: categoriesArr[randomCategoriesIndex][1],
      type: typesArr[randomTypesIndex][1],
    };
  }

  function getRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  function getRandomDescription(length) {
    return Math.random() >= 0.5 ? getRandomString(length) : "";
  }

  function getRandomDueDate() {
    const start = new Date();
    const end = new Date(2075, 11, 31);
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());

    return Math.random() >= 0.5 ? new Date(randomTime) : "";
  }

  return {
    name: getRandomString(5),
    description: getRandomDescription(20),
    dueDate: getRandomDueDate(),
    classification: getRandomClassification(),
  };
}
