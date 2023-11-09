import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
  }, []);

  useEffect(() => {
    const getWorkouts = async () => {
      const response = await axios.get(
        `http://localhost:4001/v1/users/${user.id}/workouts`
      );
      setWorkouts(response.data);
    };

    const getExercises = async () => {
      const response = await axios.get(
        `http://localhost:4001/v1/exercises`
      );
      setExercises(response.data);
    };

    if (user?.id) {
      getWorkouts();
      getExercises();
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:4001/v1/login", {
      email,
      password,
    });
    if (response.data) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      console.error("Login failed.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        workouts,
        exercises,
        setWorkouts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
