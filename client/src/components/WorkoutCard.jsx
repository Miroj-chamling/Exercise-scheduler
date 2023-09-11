import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

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
    <div className="workout-card">
      <div key={key} className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (Kg): </strong>
          {workout.load}
        </p>
        <br />
        <p>
          <strong>Reps : </strong>
          {workout.reps}
        </p>
        <br />
        <p>{workout.createdAt}</p>
        <br />
      </div>
      <div className="buttons">
        <div className="delete-btn">
          <FontAwesomeIcon
            onClick={() => handleDeleteWorkout(workout._id)}
            icon={faTrash}
            aria-label="delete"
          />
          <br />
        </div>
        <div className="edit-btn">
          <FontAwesomeIcon
            onClick={() => {
              setCurrentId(workout._id);
            }}
            icon={faEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
