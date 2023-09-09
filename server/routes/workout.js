const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController.js");

const router = express.Router();

router.route("/").get(getWorkouts);

router.route("/:id").get(getWorkoutById);

router.route("/").post(createWorkout);

router.route("/:id").delete(deleteWorkout);

router.route("/:id").patch(updateWorkout);

module.exports = router;
