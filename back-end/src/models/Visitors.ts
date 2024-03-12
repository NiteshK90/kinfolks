import mongoose from "mongoose";

const visitorsSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  isValidVisitor: { type: Boolean },
  places: { type: [String] },
  whenToVisit: { type: String },
});

const Visitors = mongoose.model("visitors", visitorsSchema);
export default Visitors;
