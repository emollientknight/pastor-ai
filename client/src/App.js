import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-web-gifted-chat";
// import * as R from "ramda";

// import "./styles.css";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: '/Users/emollient/pastor-ai2/client2/resources/img/aiPastor.png',
        },
      },
    ])
  }, [])

  const onSend = (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  };

  return (
    <div style={{ flex: 1, height: "300px" }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          id: 1
        }}
      />
    </div>
  );
}
