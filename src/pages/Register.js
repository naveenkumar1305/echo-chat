import {  createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth ,db } from '../firebase'
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate ,Link} from "react-router-dom";

const Register = () => {
  const[err , setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Firebase response:", res);

      await updateProfile(res.user, {
        displayName: displayName.toLowerCase(),
      });

      await auth.currentUser.reload();
      
      await setDoc(doc(db , "users" , res.user.uid) ,{
      uid :res.user.uid,
      displayName : displayName.toLowerCase(),
      email
    })
      await setDoc(doc(db, "userChats" , res.user.uid), { })
      navigate("/")
  }
    catch(err){
      setErr(true)
    }
  } 
  return (
    <div className="register">
      <div className="register-form">
        <span className="logo">Echo Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" required/>
          <input type="email" placeholder="Enter Your Email" required/>
          <input type="password" placeholder="Enter Your Password" required/>
          <button>Sign up</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p> You Do Have Account ?<Link to="/login" className="register-link">Login</Link></p>
      </div>
    </div>
  )
}

export default Register