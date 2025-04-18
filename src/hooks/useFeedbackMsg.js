import { useState } from "react";

export function useFeedbackMsg(timeout = 3000) {
  const [messageData, setMessageData] = useState({ text: null, type: "default" });

  function show(text, type = "default") {
    setMessageData({ text, type });
    setTimeout(() => setMessageData({ text: null, type: "default" }), timeout);
  }

  return [messageData, show];
}
