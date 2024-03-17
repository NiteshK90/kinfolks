import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  refId: { type: String },
});

const Users = mongoose.model("users", userSchema);
export default Users;
