const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  email: String,
  username: String,  // Changed from name to username for consistency
  password: String,
});

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
