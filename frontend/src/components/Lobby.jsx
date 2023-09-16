import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Lobby = ({ joinRoom }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Form
      className="lobby"
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom(username, room);
      }}
    >
      <Form.Group>
        <Form.Control
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></Form.Control>
        <Form.Control
          className="my-2"
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        ></Form.Control>
      </Form.Group>
      <Button variant="success" type="submit" disabled={!username || !room}>
        Join
      </Button>
    </Form>
  );
};

export default Lobby;
