const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const userRoute = require("./routes/user.route");
const recipeRoute = require("./routes/recipe.route");

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://recipe-nest-krs-frontend.vercel.app",
  process.env.FRONTEND_URL,
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Everything is fine!" });
});

app.use("/user", userRoute);
app.use("/recipe", recipeRoute);

app.listen(PORT, () => {
  console.log(
    `Server started on PORT ${PORT}\nLocal: http://localhost:${PORT}`
  );
});
