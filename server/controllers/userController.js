const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.PRIVATE_KEY, { expiresIn: "1h" });
};

const User = require("../models/userModel.js");

const loginUser = async (req, res) => {
  res.status(200).json({ message: "login user" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
