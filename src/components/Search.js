import { useContext, useState } from 'react';
import { collection, query, where, getDocs, setDoc ,doc ,serverTimestamp ,getDoc} from "firebase/firestore";
import { db  } from '../firebase';
import profileimg from '../img/profileimg.jpeg';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName.trim().toLowerCase()));
    try {
      const querySnapshot = await getDocs(q);
      console.log("Query size:", querySnapshot.size);
      if (querySnapshot.empty) {
        setUser(null);
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          console.log("Found user:", doc.data());
          setUser(doc.data());
        });
        setErr(false);
      }
    } catch (err) {
      console.error("Error searching user:", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async() =>{
    //check wheather the group(chats in firebase) exists , if not create 
    //create user chats 
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    try{
      const res = await getDoc(doc(db, "chats" , combinedId));

      if(!res.exists()){
        //starting an chat b/w people first time so create it in firebase 
        //create a chat in chats collections
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create a user chat
        await setDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId]: {
        userInfo: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || profileimg,
          },
            lastMessage: "",
            date: serverTimestamp(),
  }
}, { merge: true }); 

      await setDoc(doc(db, "userChats", user.uid), {
        [combinedId]: {
          userInfo: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL || profileimg,
          },
          lastMessage:"",
          date: serverTimestamp(),
        },
      },{merge:true});
      }
    }catch(err){

    }
    setUser(null)
    setUserName("")
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search a User"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value = {userName}
        />
      </div>
      {err && <span style={{ color: "red" }}>User Not Found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL || profileimg} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <p>Click to start chat</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
