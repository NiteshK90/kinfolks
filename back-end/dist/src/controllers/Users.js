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
exports.deleteUser = exports.getUsers = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const Visitors_1 = __importDefault(require("../models/Visitors"));
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users_1.default.find();
        if (!users) {
            return res.status(400).json({ message: "Users data empty" });
        }
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteUser = yield Users_1.default.findByIdAndDelete({ _id: id });
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const deleteVisitor = yield Visitors_1.default.findByIdAndDelete({
            _id: deleteUser.refId,
        });
        if (!deleteVisitor) {
            return res
                .status(404)
                .json({ message: "Visitor not found", user: { deleteUser } });
        }
        res.json({ user: deleteUser, visitor: deleteVisitor });
    }
    catch (error) {
        res.status(500).json({ message: "Error ocurred" });
    }
});
exports.deleteUser = deleteUser;
