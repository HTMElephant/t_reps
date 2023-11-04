import { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./Workouts.css";

const Workouts = () => {
  const { workouts } = useContext(AppContext);

  return (
    <div>
      <h1>Workouts</h1>
      <button className="add-workout-button">Add Workout</button>
      <div className="workout-container">
        {workouts.map(workout => (
          <div className="workout">
            <h2>{workout.name}</h2>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
