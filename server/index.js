require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const workoutRouter = require("./routes/workout.js");

const app = express();

//middleware

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//

app.use("/api/workouts", workoutRouter);

//connect to mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & Server is running on port:",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
