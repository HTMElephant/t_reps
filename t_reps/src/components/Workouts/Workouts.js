import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import "./Workouts.css";
import axios from "axios";
import Modal from "../Modal";

const Workouts = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutExercises, setNewWorkoutExercises] = useState([]);
  const { workouts, exercises, user, setWorkouts } = useContext(AppContext);

  const handleClose = () => {
    setNewWorkoutName('');
    setNewWorkoutExercises([]);
    setIsCreateModalOpen(false);
  };

  const handleSave = async () => {
    const { data: workout } = await axios.post(`http://localhost:4001/v1/workouts`, {
      name: newWorkoutName,
      user_id: user.id,
      exercises: newWorkoutExercises,
    });

    setWorkouts(prevState => [...prevState, workout])
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/v1/workouts/${id}`);

    const newWorkouts = [...workouts];
    const indexToDelete = newWorkouts.findIndex(w => w.id === id)
    newWorkouts.splice(indexToDelete, 1);
    setWorkouts(newWorkouts)
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
          <div className="workout" key={workout.id}>
            <h2>{workout.name}</h2>
            <button>Edit</button>
            <button onClick={() => handleDelete(workout.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Modal open={isCreateModalOpen} close={() => setIsCreateModalOpen(false)}>
        <h3>Create new workout</h3>
        <div>
          <input
            placeholder="Workout name"
            value={newWorkoutName}
            onChange={e => setNewWorkoutName(e.target.value)}
          />
        </div>
        <h3>Added Exercises</h3>
        <div className="exercise-container">
          {newWorkoutExercises.map(exercise => (
            <div className="exercise" key={`added-exercise-${exercise.id}`}>
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
            .filter(exercise => {
              const foundMatchingIndex = newWorkoutExercises.findIndex(
                ex => ex.id === exercise.id
              );

              const existsInNewList = foundMatchingIndex !== -1;

              return !existsInNewList;
            })
            .map(exercise => (
              <div className="exercise" key={`available-exercise-${exercise.id}`}>
                <div>{exercise.name}</div>
                <div>{exercise.body_part}</div>
                <div>{exercise.weight_type}</div>
                <button onClick={() => addExercise(exercise)}>+</button>
              </div>
            ))}
        </div>
        <button onClick={handleClose}>CANCEL</button>
        <button onClick={handleSave}>SAVE</button>
      </Modal>
    </div>
  );
};

export default Workouts;
