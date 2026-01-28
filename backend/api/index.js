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

app.get("/favicon.ico",(req,res)=>res.status(204).end());
app.get("/", (req, res) =>  {
  res.status(200).json({
    message:"Backend Running",
    status: "ok"
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;
})