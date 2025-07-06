import { useState } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await fetch(`http://localhost:8000/messages/send/${selectedUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`, // if token required
        },
        body: JSON.stringify({ text }),
      });

      setText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="border-top p-3 bg-white d-flex gap-2 align-items-center">
      <input
        type="text"
        className="form-control"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="btn btn-primary"
        onClick={handleSend}
        disabled={!text.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
