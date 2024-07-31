import React, { useState } from "react";
import Login_Signup from "./Components/Login_Signup";
import Home from "./Components/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user")?true:false);
  const [User, setUser] = useState(localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{});

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login_Signup onLoginSuccess={handleLoginSuccess}  User={User} setUser={setUser} />
      ) : (
        <Home  setIsAuthenticated={setIsAuthenticated}  User={User} setUser={setUser}/>
      )}
    </>
  );
}

export default App;
