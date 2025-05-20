import express from "express";
import jwtMiddleware from "./middleware/jwtMiddleware.js";
import TrainersModel from "../../models/Trainer.js";

const trainersrouter = express.Router();

trainersrouter.get("/trainers", jwtMiddleware, async (req, res) => {
  try {
    const { name, trainerID } = req.query;
    let filter = {};
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
    } else if (trainerID) {
      filter.trainerID = trainerID;
    }
    const trainers = await TrainersModel.find(filter);
    res.status(200).json({
      status: "Successfull",
      message: `found trainers successfully`,
      data: trainers,
    });
  } catch (error) {
    console.log(`Error fetching trainers in backend ${error}`);
    res.status(500).json({
      status: "Unsuccessful",
      message: `Error fetching trainers in backend ${error}`,
    });
  }
});
trainersrouter.get("/trainers/pendSalary", jwtMiddleware, async (req, res) => {
  try {
    const trainers = await TrainersModel.find().select(
      "name trainerID salaryPaid salary"
    );
    const trainersData = trainers.map((m) => ({
      name: m.name,
      value: `₹ ${(m.salary - m.salaryPaid).toLocaleString("en-IN")}`,
      id: m.trainerID,
    }));
    res.status(200).json({
      status: "Successfull",
      trainersData,
    });
  } catch (error) {
    console.log(`Error fetching trainers in backend ${error}`);
    res.status(500).json({
      status: "Unsuccessful",
      message: `Error fetching trainers in backend ${error}`,
    });
  }
});

export default trainersrouter;
