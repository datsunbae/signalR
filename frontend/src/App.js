import { useState } from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [connection, setConnection] = useState();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const joinRoom = async (username, room) => {
    try {
      const con = new HubConnectionBuilder()
        .withUrl("https://localhost:7005/chat")
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      con.on("ReceiveMessage", (username, message) => {
        console.log(message);
        setMessages((messages) => [...messages, { username, message }]);
      });

      con.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      con.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await con.start();
      await con.invoke("JoinRoom", { username, room });
      setConnection(con);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (err) {
      console.error(err);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Chat App SignalR</h1>
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat
          users={users}
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
        />
      )}
    </div>
  );
}

export default App;
