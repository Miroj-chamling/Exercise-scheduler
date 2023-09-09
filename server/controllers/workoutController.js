const mongoose = require("mongoose");

const Workout = require("../models/workoutModel.js");

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json({ workouts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Workout not found!" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found!" });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No workout with that id");

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).send("Workout not found");
    }
    res.status(200).json({ message: "Workout deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No workout with that id");

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!workout) {
      return res.status(404).send("Workout not found");
    }
    res.status(200).json({ message: "Workout updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
};
