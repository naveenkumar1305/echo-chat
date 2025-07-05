import { useContext, useEffect, useRef } from 'react';
import profileimg from '../img/profileimg.jpeg'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  
  const {currentUser} = useContext(AuthContext)
  const isOwner = message.senderId === currentUser.uid;
  const {data} = useContext(ChatContext)

  const ref = useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  return (
    <div className={`message ${isOwner ? 'owner' : ''}`} ref={ref}>
      <div className="messageInfo">
        <img src={profileimg} alt="" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* <img src={profileimg} alt="" /> */}
      </div>
    </div>
  )
}

export default Message