const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const jobRoutes = require("../routes/jobRoutes");

const app = express();

// ✅ Connect DB (serverless-safe)
connectDB();

app.use(cors());
app.use(express.json());

app.get("https://jobtracker-ijknbackend.vercel.app/api", (req, res) => {
  res.send("Job Tracker API Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;
