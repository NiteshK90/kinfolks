"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleVisitor = exports.getVisitors = void 0;
const Visitors_1 = __importDefault(require("../models/Visitors"));
const getVisitors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitors = yield Visitors_1.default.find();
        if (!visitors) {
            res.status(400).json({ error: "Visitors data empty" });
        }
        res.status(200).json(visitors);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getVisitors = getVisitors;
const getSingleVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const visitor = yield Visitors_1.default.findById({ _id: id });
        if (!visitor) {
            res.status(400).json({ error: "Visitor not found" });
        }
        res.status(200).json(visitor);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getSingleVisitor = getSingleVisitor;
