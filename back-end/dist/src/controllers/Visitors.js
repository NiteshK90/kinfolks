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
exports.deleteVisitor = exports.updateValidity = exports.getSingleVisitor = exports.getVisitors = exports.addNewVisitor = void 0;
const Visitors_1 = __importDefault(require("../models/Visitors"));
const uuid_1 = require("uuid");
const Users_1 = __importDefault(require("../models/Users"));
const addNewVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const visitor = new Visitors_1.default(Object.assign(Object.assign({}, data), { _id: (0, uuid_1.v4)(), isValidVisitor: false }));
        const savedData = yield visitor.save();
        if (!savedData) {
            res.status(500).send({ error: "Unable to add visitor" });
        }
        res
            .status(201)
            .send({ msg: "Visitor added successfully", data: savedData });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.addNewVisitor = addNewVisitor;
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
const updateValidity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isValidVisitor } = req.body;
    try {
        const updateVisitor = yield Visitors_1.default.findByIdAndUpdate({ _id: id }, { isValidVisitor }, { new: true });
        if (!updateVisitor) {
            return res.status(404).json({ message: "User not found" });
        }
        const newUser = new Users_1.default({
            _id: (0, uuid_1.v4)(),
            name: updateVisitor.name,
            mobile: updateVisitor.mobile,
            email: updateVisitor.email,
            refId: updateVisitor._id,
        });
        const saveUser = yield newUser.save();
        if (!saveUser) {
            return res
                .status(500)
                .json({ message: "User not created", visitor: updateVisitor });
        }
        res.json({ user: saveUser, visitor: updateVisitor });
    }
    catch (error) {
        res.status(500).json({ message: "Error ocurred" });
    }
});
exports.updateValidity = updateValidity;
const deleteVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteVisitor = yield Visitors_1.default.findByIdAndDelete({ _id: id });
        if (!deleteVisitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        res.json(deleteVisitor);
    }
    catch (error) {
        res.status(500).json({ message: "Error ocurred" });
    }
});
exports.deleteVisitor = deleteVisitor;
