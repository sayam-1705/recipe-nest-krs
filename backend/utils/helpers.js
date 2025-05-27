const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (userId, email) => {
  const payload = { userId, email };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
  const expiresIn = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  return { token, expiresIn };
};

module.exports = { createJWT };
