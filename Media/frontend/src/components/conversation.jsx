import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import {
  getConversations,
  saveConversation,
} from "../services/conversationService";
import { getFriends } from "../services/userService";
import FriendList from "./friendList";
import Chat from "./chats.jsx";
import auth from "../services/authService";

const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Conversation = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [message, setMessage] = useState("");
  const [userStatus, setUserStatus] = useState([]);

  const showConversation = (friend) => {
    const getChats = async () => {
      try {
        const { data } = await getConversations(friend._id);
        setConversations(data);
        const receiver = friends.find((f) => f._id === friend._id);
        setReceiver(receiver);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) toast.error(ex.message);
      }
    };
    getChats();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        let conversation = {};
        conversation.receiver = receiver._id;
        conversation.message = message;
        const { data } = await saveConversation(conversation);
        setConversations([...conversations, data]);
        setMessage("");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) toast.error(ex.message);
      }
    }
  };
  const handleMessage = (msg) => {
    setMessage(msg);
  };
  useEffect(() => {
    const getAllFriends = async () => {
      try {
        const { data } = await getFriends();
        setFriends(data);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) toast.error(ex.message);
      }
    };

    getAllFriends();
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", auth.getCurrentUser()._id);
    socket.on("userStatus", (data) => {
      console.log(socket);
      setUserStatus([...userStatus, data]);
    });
    socket.on("receiveMessage", (data) => {
      setConversations([...conversations, data]);
    });
  }, [conversations]);
  return (
    <div className="container-fluid">
      {/* {!user && <Redirect to="/signin" />} */}
      <div className="row">
        <div className="col-4">
          {friends.length > 0 && (
            <FriendList
              friends={friends}
              onShowConversation={showConversation}
            />
          )}
        </div>
        <div className="col">
          {receiver._id && (
            <Chat
              conversations={conversations}
              receiver={receiver}
              onSendMessage={handleSendMessage}
              onMessage={handleMessage}
              message={message}
              userStatus={userStatus}
              socket={socket}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
