import mongoose from "mongoose";
import CounterModel from "./CustomCounter.js";

const MembersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mailID: { type: String, required: true },
  contactNumber: { type: Number },
  joinDate: { type: Date, required: true },
  membEndDate: { type: Date },
  assignedTrainer: { type: String },
  trainerID: { type: Number },
  workOutPlanID: { type: Number },
  membType: { type: String, required: true },
  password: { type: String, required: true },
  customNote: { type: String },
  weight: { type: Number },
  optionalNotes: { type: String },
  memberID: { type: String, unique: true },
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
MembersSchema.pre("save", async function (next) {
  if (this.isNew && !this.memberID) {
    try {
      const counter = await CounterModel.findOneAndUpdate(
        {
          counterName: "memberID",
        },
        {
          $sec: { counter: 1 },
        },
        {
          new: true,
          upsert: true,
        }
      );
      this.memberID = "MB-" + counter.counter;

      if (this.isNew && this.membType) {
        console.log(this.membType);
        const membDuration = parseInt(this.membType);
        const membEndDate = new Date(this.joinDate);
        membEndDate.setMonth(membEndDate.getMonth + membDuration);
        this.endDate = membEndDate;
      }
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
const MembersModel = mongoose.model("MemberModel", MembersSchema);

export default MembersModel;
