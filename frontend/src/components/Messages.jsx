import React, { useEffect, useRef } from "react";

const Messages = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className="message-container">
      {messages.map((m, index) => (
        <div key={index} className="user-message">
          <div className="from-user">{m.username}</div>
          <div className="message bg-primary mb-3">{m.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
