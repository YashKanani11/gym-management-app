import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  counterName: { type: String, required: true, unique: true },
  counter: { type: Number, default: 0 },
});

const CounterModel = mongoose.model("CounterModel", CounterSchema);

export default CounterModel;
