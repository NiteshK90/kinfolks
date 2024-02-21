"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Visitors_1 = require("../controllers/Visitors");
const router = express_1.default.Router();
router.post("/", Visitors_1.addNewVisitor);
router.get("/", Visitors_1.getVisitors);
router.get("/:id", Visitors_1.getSingleVisitor);
exports.default = router;
