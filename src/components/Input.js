import img from '../img/img.png'
import attach from '../img/attach.png'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useContext, useState } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';

const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
  if (!text.trim()) return;

  try {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    const senderData = {
      [data.chatId + ".userInfo"]: {
        uid: data.user.uid,
        displayName: data.user.displayName,
        photoURL: data.user.photoURL,
      },
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    };

    const receiverData = {
      [data.chatId + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), senderData);
    await updateDoc(doc(db, "userChats", data.user.uid), receiverData);

    setText(""); // Clear input after sending
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};

  return (
    <div className="input">
      <input
        className="input-chat"
        type="text"
        placeholder="Enter Something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;