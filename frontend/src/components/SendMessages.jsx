import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const SendMessages = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></FormControl>
      </InputGroup>
    </Form>
  );
};

export default SendMessages;
