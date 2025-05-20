import express from "express";
import jwtMiddleware from "./middleware/jwtMiddleware.js";
import MembersModel from "../../models/MembersModel.js";

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
    if (!members) {
      return res.status(404).json({ message: "Member not found" });
    }
    console.log(members);
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
export default membersrouter;
