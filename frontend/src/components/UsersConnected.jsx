import React from "react";

const UsersConnected = ({ users }) => {
  return (
    <div className="user-list">
      <h4>UsersConnected</h4>
      {users.map((user, index) => (
        <h6 key={index}>{user}</h6>
      ))}
    </div>
  );
};

export default UsersConnected;
