const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const helpers = require("../utils/helpers");
const validators = require("../utils/validators");

const register = async (req, res) => {
  try {
    const { name, email, pass, cPass } = req.body;
    if (!name || !email || !pass || !cPass) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (pass !== cPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (!validators.checkEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!validators.checkPass(pass)) {
      return res.status(400).json({
        message: "Password must contain at least 10 characters and a number",
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(pass, 10);
    const newUser = new UserModel({ name, email, password: hashedPass });
    await newUser.save();
    res.status(201).json({
      message: "User Created",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const { token, expiresIn } = helpers.createJWT(user._id, email);
    res.status(200).json({
      message: "Login success",
      token,
      user: { id: user._id, name: user.name, email: user.email },
      tokenExpiry: expiresIn,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { pass } = req.body;
    if (!email || !pass) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    await UserModel.deleteOne({ email });
    res.status(200).json({ message: "User Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  register,
  loginUser,
  deleteUser,
};
