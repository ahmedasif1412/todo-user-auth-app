import { useState, useEffect } from "react";
import { getCurrentUser } from "./api/auth";
import Auth from "./components/Auth";
import Todos from "./components/Todos";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const data = await getCurrentUser();
        setUser(data.name);
      } catch (err) {
        localStorage.removeItem("token");
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (user) {
    return <Todos user={user} onLogout={handleLogout} />;
  }

  return <Auth onLoginSuccess={setUser} />;
}

export default App;
