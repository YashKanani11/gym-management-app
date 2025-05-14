import express from "express";
import bcrypt from "bcrypt";
import AdminModel from "../../models/Admin.js";
import jwt from "jsonwebtoken";
import jwtMiddleware from "./middleware/jwtMiddleware.js";
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
          sameSite: "lax",
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
      console.log("Data received:", userName, mailID, password);
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
        userName: userName,
        mailID: mailID,
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

adminRouter.post("/verify", jwtMiddleware, async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "unsuccessfull",
        message: "Security token not found, consider signing up",
      });
    }
    const decoded = await jwt.verify(token, "YK2002.yk");
    const isUser = await AdminModel.findOne({ mailID: decoded.id });
    if (!isUser) {
      res.status(401).json({
        status: "unsuccessfull",
        message:
          "Security token found but not matching in DB, consider signing up",
      });
    }
    res.status(200).json({
      status: "successfull",
      message: `security token found for mailID ${res.user.id}`,
    });
  } catch (error) {
    console.log("error verrifieng token at backend", error);
    res.status(500).json({
      status: "unsuccessfull",
      message: `Error verrifieng token at backend ${error}`,
    });
  }
});

export default adminRouter;
