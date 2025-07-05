import profileimg from '../img/profileimg.jpeg'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  console.log("Navbar - currentUser:", currentUser);
  
  return (
    <div className="navbar">
      <span className="Nav-logo">Echo Chat</span>
      <div className="user">
        <img src={profileimg} alt="" />
        <span className='currentuser-name'>
            {currentUser?.displayName || "No Name"}
        </span>
        {/* signOut is an firebase function from firebase authentication */}
        <button className="Nav-button" onClick={() => signOut(auth)}>Log Out</button>
      </div>
    </div>
  )
}

export default Navbar