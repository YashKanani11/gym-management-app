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
membersrouter.get("/members/membEnding", jwtMiddleware, async (req, res) => {
  try {
    const members = await MembersModel.find().select(
      "name memberID membEndDate"
    );
    const membersData = members.map((m) => ({
      name: m.name,
      value: m.membEndDate ? new Date(m.membEndDate).getDate() : "-",
      id: m.memberID,
    }));
    res.status(200).json({
      status: "Successfull",
      membersData,
    });
  } catch (error) {
    console.log(
      `encountered following error while fetching memb ending data at backend ${error}`
    );
    res.status(500).json({
      status: "Unsuccessfull",
      message: `Encountered following error while fetching memb ending data at backend ${error}`,
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
membersrouter.get("/trainers/pendSalary", jwtMiddleware, async (req, res) => {
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
export default membersrouter;
