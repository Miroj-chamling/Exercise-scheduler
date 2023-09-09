import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, reps, load };

    const response = await fetch("http://localhost:8000/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added to the db");
      dispatch({ type: "CREATE_WORKOUT", payload: json.workout });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Excercise Title: </label>
      <input
        type="text"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Load(in Kg): </label>
      <input
        type="number"
        required
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label>Reps: </label>
      <input
        required
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add workout</button>
    </form>
  );
};

export default WorkoutForm;
