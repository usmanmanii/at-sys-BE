const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const connectDB = require("./database").connectDB;
connectDB();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/userRoutes");
const topReviewsRoutes = require("./routes/topReviewsRoutes");
const driverRoutes = require("./routes/driverRoutes");
const offerRoutes = require("./routes/offerRoutes");
const universityRoutes = require("./routes/universityRoutes");
const departmentRoutes = require("./routes/DepartmentRoutes"); 
const instructorRoutes = require("./routes/instructorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const timeRoutes= require("./routes/timeRoutes");
const classRoutes=require("./routes/classRoutes");
const courseRoutes = require("./routes/courseRoutes");
const timesheetRoutes = require("./routes/timesheetRoutes");
const dashboard = require("./routes/dashboardRoutes");

app.listen(3030, () => {
  console.log("App Listening on 3030");
});

app.use(userRoutes);
app.use("/reviews", topReviewsRoutes);
app.use(driverRoutes);
app.use(offerRoutes);
app.use(universityRoutes);
app.use(departmentRoutes);
app.use(instructorRoutes);
app.use(studentRoutes);
app.use(roomRoutes);
app.use(timeRoutes);
app.use(userRoutes);
app.use(classRoutes);
app.use(courseRoutes);
app.use(timesheetRoutes);
app.use(dashboard);
app.use((req, res) => {
  res.status(404).json({ error: true, message: "Page not found." });
});
