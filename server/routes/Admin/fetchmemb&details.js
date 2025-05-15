import express from "express";
import jwtMiddleware from "./middleware/jwtMiddleware.js";
import MembersModel from "../../models/MembersModel.js";
import TrainersModel from "../../models/Trainer.js";

const membersrouter = express.Router();

membersrouter.get("/members", jwtMiddleware, async (req, res) => {
  try {
    const { name, memberID } = req.query;
    let filter = {};
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
    } else if (memberID) {
      filter.memberID = memberID;
    }
    const members = await MembersModel.find(filter);
    res.status(200).json({
      status: "Successfull",
      message: `found members successfully`,
      data: members,
    });
  } catch (error) {
    console.log(`Error fetching members in backend ${error}`);
    res.status(500).json({
      status: "Unsuccessful",
      message: `Error fetching members in backend ${error}`,
    });
  }
});
membersrouter.get("/trainers", jwtMiddleware, async (req, res) => {
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
export default membersrouter;
