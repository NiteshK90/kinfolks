import mongoose from "mongoose";

const visitorsSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  places: { type: [String] },
  whenToVisit: { type: String },
});

const Visitors = mongoose.model("visitors", visitorsSchema);
export default Visitors;
