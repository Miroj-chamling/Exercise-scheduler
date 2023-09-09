import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState([]);

  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWoroutsFromContext = async () => {
      const response = await fetch("http://localhost:8000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_WORKOUTS", payload: json.workouts });
      }
    };

    fetchWoroutsFromContext();

    // const fetchWorkouts = async () => {
    //   const response = await fetch("http://localhost:8000/api/workouts");
    //   const json = await response.json();

    //   if (response.ok) {
    //     setWorkouts(json.workouts);
    //     console.log(workouts);
    //   }
    // };

    // fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        <h1>Schedule</h1>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
