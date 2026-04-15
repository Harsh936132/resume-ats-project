import { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Ask me about resume tips!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };

    // Simple dummy AI response
    const botMsg = {
      text: "💡 Tip: Add quantified achievements and strong action verbs.",
      sender: "bot"
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "350px" }}>

      {/* CHAT AREA */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          borderRadius: "10px",
          background: "#020617"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "12px",
                background:
                  msg.sender === "user"
                    ? "linear-gradient(90deg,#7c3aed,#22d3ee)"
                    : "#1e293b",
                color: "white",
                maxWidth: "70%"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#020617",
            color: "white"
          }}
        />

        <button
          onClick={send}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            borderRadius: "10px",
            background: "linear-gradient(90deg,#7c3aed,#22d3ee)",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default Chatbot;