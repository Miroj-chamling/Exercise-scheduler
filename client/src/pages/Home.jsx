import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    setIsLoading(true);
    const fetchWoroutsFromContext = async () => {
      const response = await fetch("http://localhost:8000/api/workouts");
      const json = await response.json();
      setIsLoading(false);
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
  }, [dispatch]);

  return (
    <div className="home">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                setCurrentId={setCurrentId}
              />
            ))}
        </div>
      )}
      <WorkoutForm currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Home;
