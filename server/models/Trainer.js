import mongoose from "mongoose";
import CounterModel from "./CustomCounter.js";

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mailID: { type: String, required: true },
  contactNumber: { type: Number },
  joinDate: { type: Date, required: true },
  trainerID: { type: String, unique: true },
  password: { type: String, required: true },
  optionalNotes: { type: String },
  salary: { type: Number, required: true },
  salaryPaid: { type: Number },
});

TrainerSchema.pre("save", async function (next) {
  if (this.isNew && !this.trainerID) {
    try {
      const counter = await CounterModel.findOneAndUpdate(
        { counterName: "trainerID" },
        {
          $inc: { counter: 1 },
        },
        {
          new: true,
          upsert: true,
        }
      );
      this.trainerID = "TR-" + counter.counter;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
const TrainersModel = mongoose.model("TrainerModel", TrainerSchema);

export default TrainersModel;
