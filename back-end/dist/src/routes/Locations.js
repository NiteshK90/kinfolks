"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Locations_1 = require("../controllers/Locations");
const router = express_1.default.Router();
router.post("/", Locations_1.addNewLocationWithPlaces);
router.get("/", Locations_1.getAllLocations);
exports.default = router;
