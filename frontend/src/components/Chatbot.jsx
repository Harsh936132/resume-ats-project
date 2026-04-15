import { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "AI Ready 🚀", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const getReply = (msg) => {
    if (msg.includes("skills")) return "Add Java, React, SQL.";
    if (msg.includes("improve")) return "Use strong action verbs.";
    return "Try asking about skills or improvement.";
  };

  const sendMessage = () => {
    if (!input) return;

    const user = { text: input, sender: "user" };
    const bot = { text: getReply(input), sender: "bot" };

    setMessages([...messages, user, bot]);
    setInput("");
  };

  return (
    <div className="chatbox">

      <h3>AI Assistant</h3>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "user-msg" : "bot-msg"}>
            {m.text}
          </div>
        ))}
      </div>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Run</button>

    </div>
  );
}

export default Chatbot;