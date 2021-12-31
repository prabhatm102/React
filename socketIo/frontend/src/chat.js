import React, { useEffect, useState } from "react";

const Chat = ({ socket, room, username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messageFormate = {
        message,
        room,
        username,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
      };
      await socket.emit("sendMessage", messageFormate);
      setMessages([...messages, messageFormate]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);
  return (
    <div className="chat offset-4 col-4 border">
      <div className="chat-header bg-secondary text-white text-center">
        Live Chat
      </div>
      <div
        className="chat-body w-100 border"
        style={{ height: "400px", overflow: "scroll" }}
      >
        {messages.map((m) => (
          <div
            className="message-box"
            id={m.username === username ? "my-message" : "other-message"}
            key={m.time + Math.random()}
          >
            <div className="message">{m.message}</div>
            <div className="message-info">
              {m.username} {m.time}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-footer p-2">
        <form onSubmit={handleSendMessage} className="d-flex">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.currentTarget.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary mx-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
