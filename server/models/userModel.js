const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("The entered email is already in use.");
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All the fields are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email or Password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Email or Password");
  }

  return user;
};

module.exports = mongoose.model("Users", userSchema);
