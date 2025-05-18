import express from "express";
import bcrypt from "bcrypt";
import jwtMiddleware from "./middleware/jwtMiddleware.js";
import MembersModel from "../../models/MembersModel.js";
import TrainersModel from "../../models/Trainer.js";
const accessrouter = express.Router();

accessrouter.post("/add_member", jwtMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const {
      assignedTrainer,
      contactNumber,
      joinDate,
      mailID,
      membType,
      name,
      optionalNotes,
      password,
      workoutPlan,
    } = req.body;
    const ifMember = await MembersModel.findOne({ mailID });
    if (ifMember) {
      res.status(401).json({
        status: "preExisting",
        message: `A member with mail id ${mailID} already exists`,
      });
      return;
    }
    console.log(password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newMember = new MembersModel({
      assignedTrainer,
      contactNumber,
      joinDate: new Date(joinDate).toISOString().split("T")[0],
      mailID,
      membType,
      name,
      optionalNotes,
      password: encryptedPassword,
      workoutPlan,
    });
    const savedMember = await newMember.save();
    console.log("member saved", savedMember);
    res.status(200).json({
      status: "Successfull",
      message: `new member added with mail id ${mailID}`,
      ID: savedMember.memberID,
    });
  } catch (error) {
    console.log("Error while adding member in backend", error);
    res.status(500).json({
      status: "Unsuccessful",
      message: `Following error encounterd while adding member in backend ${error}`,
    });
  }
});
accessrouter.post("/add_trainer", jwtMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const { contactNumber, joinDate, mailID, name, optionalNotes, password } =
      req.body;
    const ifTrainer = await TrainersModel.findOne({ mailID });
    if (ifTrainer) {
      res.status(401).json({
        status: "preExisting",
        message: `A trainer with mail id ${mailID} already exists`,
      });
      return;
    }
    console.log(password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newTrainer = new TrainersModel({
      contactNumber,
      joinDate,
      mailID,
      name,
      optionalNotes,
      password: encryptedPassword,
    });
    const savedTrainer = await newTrainer.save();
    res.status(200).json({
      status: "Successfull",
      message: `new trainer added with mail id ${mailID}`,
      ID: savedTrainer.trainerID,
    });
  } catch (error) {
    console.log("Error while adding trainer in backend", error);
    res.status(500).json({
      status: "Unsuccessful",
      message: `Following error encounterd while adding trainer in backend ${error}`,
    });
  }
});

export default accessrouter;
