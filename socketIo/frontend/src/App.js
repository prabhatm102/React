import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./chat";
const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && room.trim() !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App my-5">
      {!showChat ? (
        <div className="offset-4 col-4">
          <form onSubmit={handleJoinRoom}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="room" className="form-label">
                Room Id
              </label>
              <input
                type="text"
                className="form-control"
                id="room"
                onChange={(e) => {
                  setRoom(e.currentTarget.value);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Join Room
            </button>
          </form>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
