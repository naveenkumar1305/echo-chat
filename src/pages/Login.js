import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

  const[err , setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
      e.preventDefault()
      const email = e.target[0].value;
      const password = e.target[1].value;
      console.log("Email:", email);
      console.log("Password:", password);
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }
      try{
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/");
    }
    catch(err){
        console.error("Firebase Error:", err.code, err.message);
        setErr(err.message); // display exact reason
      }
    } 

  return (
    <div className="register">
      <div className="register-form">
        <span className="logo">Echo Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter Your Email" required/>
          <input type="password" placeholder="Enter Your Password" required/>
          <button>Sign In</button>
          {err && <span className="error-message">Something Went Wrong</span>}
        </form>
        <p> You Don't Have Account ? <Link to="/register" className="register-link">Register</Link></p>
      </div>
    </div>
  )
}

export default Login