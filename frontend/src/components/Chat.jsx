import React from "react";
import { Button } from "react-bootstrap";
import UsersConnected from "./UsersConnected";
import Messages from "./Messages";
import SendMessages from "./SendMessages";

const Chat = ({ users, messages, sendMessage, closeConnection }) => {
  return (
    <>
      <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>
          Leave Room
        </Button>
      </div>

      <UsersConnected users={users} />
      <div className="chat">
        <Messages messages={messages} />
        <SendMessages sendMessage={sendMessage} />
      </div>
    </>
  );
};

export default Chat;
