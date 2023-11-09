import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import "./Workouts.css";
import axios from "axios";

const Workouts = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutExercises, setNewWorkoutExercises] = useState([]);
  const { workouts, exercises, user } = useContext(AppContext);

  const handleClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleSave = async () => {
    const workout = await axios.post(`http://localhost:4001/v1/workouts`, {
      name: newWorkoutName,
      user_id: user.id,
      exercises: newWorkoutExercises,
    });

    console.log('From the DB!!', {workout});
  };

  const addExercise = exercise => {
    setNewWorkoutExercises([...newWorkoutExercises, exercise]);
  };

  const removeExercise = exercise => {
    const newExerciseList = [...newWorkoutExercises];
    const indexToRemove = newExerciseList.findIndex(
      ex => ex.id === exercise.id
    );
    newExerciseList.splice(indexToRemove, 1);
    setNewWorkoutExercises(newExerciseList);
  };

  return (
    <div>
      <h1>Workouts</h1>
      <button
        className="add-workout-button"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Add Workout
      </button>
      <div className="workout-container">
        {workouts.map(workout => (
          <div className="workout">
            <h2>{workout.name}</h2>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
      {isCreateModalOpen && (
        <div className="create-modal-background" onClick={handleClose}>
          <div
            className="create-modal"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <h3>Create new workout</h3>
            <div>
              <input
                placeholder="Workout name"
                onChange={e => setNewWorkoutName(e.target.value)}
              />
            </div>
            <h3>Added Exercises</h3>
            <div className="exercise-container">
              {newWorkoutExercises.map(exercise => (
                <div className="exercise">
                  <div>{exercise.name}</div>
                  <div>{exercise.body_part}</div>
                  <div>{exercise.weight_type}</div>
                    <button onClick={() => removeExercise(exercise)}>-</button>
                </div>
              ))}
            </div>
            <h3>Available Exercises</h3>
            <div className="exercise-container">
              {exercises
                .filter(
                  exercise =>
                  {
                    const foundMatchingIndex = newWorkoutExercises.findIndex(
                      ex => ex.id === exercise.id
                    );

                    const existsInNewList = foundMatchingIndex !== -1;

                    return !existsInNewList;
                  }
                )
                .map(exercise => (
                  <div className="exercise">
                    <div>{exercise.name}</div>
                    <div>{exercise.body_part}</div>
                    <div>{exercise.weight_type}</div>
                    <button onClick={() => addExercise(exercise)}>+</button>
                  </div>
                ))}
            </div>
            <button onClick={handleClose}>CANCEL</button>
            <button onClick={handleSave}>SAVE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
