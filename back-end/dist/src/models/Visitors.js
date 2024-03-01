"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const visitorsSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    isValidVisitor: { type: Boolean },
    places: { type: [String] },
    whenToVisit: { type: String },
});
const Visitors = mongoose_1.default.model("visitors", visitorsSchema);
exports.default = Visitors;
