import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Workouts = () => {
  const { workouts } = useContext(AppContext);

  return (
    <div>
      <h1>Workouts</h1>
      <button>Add Workout</button>
      {workouts.map(workout => (
        <div>
          <h2>{workout.name}</h2>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Workouts;
