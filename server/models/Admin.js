import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  mailID: { type: String, required: true },
  password: { type: String, required: true },
});

const AdminModel = mongoose.model("AdminModel", AdminSchema);

export default AdminModel;
