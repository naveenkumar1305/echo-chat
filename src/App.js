import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import './App.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {currentUser} = useContext(AuthContext)

  const ProctedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to ="/login" />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index 
          element=
              {<ProctedRoute>
                <Home/>
              </ProctedRoute>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
