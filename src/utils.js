/*utils.js*/
export function getFormattedDay() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  
  return `${dd}/${mm}/${yyyy}`;
}

export function getFormattedHour(){
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

export function parseDate(dateStr){
  const [dd, mm, yyyy] = dateStr.split("/");
  return new Date(yyyy, mm-1, dd);
}