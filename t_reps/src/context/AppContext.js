import { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:4001/v1/login", {
      email,
      password,
    });
    if (response.data) {
      setUser(response.data);
    } else {
      console.error("Login failed.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        workouts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
