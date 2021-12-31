import React from "react";

const FriendList = ({ friends, onShowConversation }) => {
  return (
    <div>
      <div className="friends">
        <div className="friends-header bg-success text-white text-center">
          Friends
        </div>
        <div className="friends body">
          <ul className="list-group">
            {friends.map((friend) => (
              <li
                className="list-group-item"
                key={friend._id}
                onClick={() => onShowConversation(friend)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    friend && process.env.REACT_APP_USER_IMAGE_URL + friend.file
                  }
                  className="img-fluid rounded-start img-thumbnail m-2"
                  alt="friend"
                  height="25"
                  width="25"
                />
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
