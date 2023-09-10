import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutCard = ({ key, workout, setCurrentId }) => {
  const { dispatch } = useWorkoutContext();

  const handleDeleteWorkout = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      console.log("workout deleted from db");
      console.log(json);
      dispatch({ type: "DELETE_WORKOUT", payload: id });
    }

    if (!response.ok) {
      console.log(json.message);
    }
  };

  return (
    <div key={key} className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <br />
      <button onClick={() => handleDeleteWorkout(workout._id)}>Delete</button>
      <br />
      <button
        onClick={() => {
          setCurrentId(workout._id);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default WorkoutCard;
