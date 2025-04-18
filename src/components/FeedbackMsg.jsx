import "../css/FeedbackMsg.css";

export default function FeedbackMsg({ text, type = "default" }) {
  if (!text) return;
  return <div className={`feedback-msg ${type}`}>{text}</div>;
}
