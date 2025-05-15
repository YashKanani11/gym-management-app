import express from "express";
import cors from "cors";
import adminRouter from "./routes/Admin/auth.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import accessrouter from "./routes/Admin/manageAccess.js";
import membersrouter from "./routes/Admin/fetchmemb&details.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminRouter);
app.use("/api/access", accessrouter);
app.use("/api/fetch", membersrouter);
const port = 5000;
app.listen(port, () => {
  connect();
  console.log("Device connected successfuly on port", port);
});

// Function to connect to mango data base
const connect = async () => {
  try {
    console.log("Bluetooth device ready to pair");
    await mongoose.connect("mongodb://localhost:27017/GymAPP");
    console.log("Device connected sucessfully");
  } catch (error) {
    console.log("Error connecting to mongoDB");
  }
};
