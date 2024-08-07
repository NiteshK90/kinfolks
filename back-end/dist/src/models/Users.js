"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    _id: { type: String },
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    refId: { type: String },
});
const Users = mongoose_1.default.model("users", userSchema);
exports.default = Users;
