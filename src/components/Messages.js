import Message from "./Message";
import { ChatContext } from '../context/ChatContext';
import { useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    let unSub;

    if (data.chatId && data.chatId !== "null") {
      unSub = onSnapshot(doc(db, "chats", data.chatId), (docSnap) => {
        if (docSnap.exists()) {
          setMessages(docSnap.data().messages || []);
        } else {
          setMessages([]);
        }
      });
    }

    return () => {
      if (unSub) unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map(m => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
