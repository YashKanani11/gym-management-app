import express from "express";
import bcrypt from "bcrypt";
import AdminModel from "../../models/Admin.js";
import jwt from "jsonwebtoken";

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  try {
    const { mailID, password } = req.body;
    const ifUser = await AdminModel.findOne({ mailID });
    if (!ifUser) {
      res.status(409).json({
        status: "nonExistingUser",
        message: `No account found with ${mailID} Consider signing up first`,
      });
    } else {
      const savedPassword = ifUser.password;
      const passIsMatch = await bcrypt.compare(password, savedPassword);
      if (passIsMatch) {
        const token = jwt.sign({ id: ifUser.mailID }, "YK2002.yk", {
          expiresIn: "1d",
        });
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          status: "Successful",
          message: `User logged in with mail ID ${ifUser.mailID}`,
          user: ifUser.userName,
        });
      }
    }
  } catch (error) {
    console.log("Error while login in backend", error);
    res.status(500).json({
      status: "Unsuccessful",
      message: "Following error encounterd while login in backend",
      error,
    });
  }
});

adminRouter.post("/register", async (req, res) => {
  try {
    const { userName, mailID, password } = req.body;
    const ifUser = await AdminModel.findOne({ mailID });
    if (ifUser) {
      res.status(409).json({
        status: "preExistingUser",
        message: "User already registered, try loging in instead",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new AdminModel({
        mailID: mailID,
        userName: userName,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`User saved with UserName ${userName} and mail ID ${mailID}`);
      res.status(200).json({
        status: "Successful",
        message: `saved user with UserName ${userName} and mail ID ${mailID}`,
      });
    }
  } catch (error) {
    console.log("Error registering user in backend", error);
    res.status(500).json({
      status: "Unsuccessfull",
      message: `Error registering user in backend ${error}`,
    });
  }
});

export default adminRouter;
