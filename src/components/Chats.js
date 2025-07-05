import { useContext, useEffect, useState } from 'react';
import profileimg from '../img/profileimg.jpeg';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState({});

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (docSnap) => {
        if (docSnap.exists()) {
          setChats(docSnap.data());
        } else {
          setChats({});
        }
      });
      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map(([chatId, chat]) => (
          <div className="userChat" key={chatId} onClick={() => handleSelect(chat.userInfo)}>
            <img src={chat.userInfo.photoURL || profileimg} alt="" />
            <div className="userChatInfo">
              <span>{chat.userInfo.displayName}</span>
              <p>{chat.lastMessage?.text || "Say hi!"}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
