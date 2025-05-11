import mongoose from "mongoose";

const MembersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number },
  joinData: { type: Date, required: true },
  membEndDate: { type: Date },
  trainersName: { type: String },
  trainerID: { type: Number },
  workOutPlanID: { type: Number },
  membType: { type: Number, required: true },
  customNote: { type: String },
  weight: { type: Number },
  PR: [
    {
      exercise: { type: String, required: true },
      weight: { type: Number, required: true },
      reps: { type: Number }, // optional
      date: { type: Date, default: Date.now },
      notes: { type: String },
    },
  ],
});

const MembersModel = mongoose.model("UserModel", MembersSchema);

export default MembersModel;
