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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.users.findMany();
        if (!users) {
            return res.status(400).json({ message: "Users data empty" });
        }
        const serialisedUsers = users.map((item) => (Object.assign(Object.assign({}, item), { mobile: item.mobile.toString() })));
        res.status(200).json(serialisedUsers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteUser = yield prisma.users.delete({ where: { id } });
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const serialisedUser = Object.assign(Object.assign({}, deleteUser), { mobile: deleteUser.mobile.toString() });
        const deleteVisitor = yield prisma.visitors.delete({
            where: { id: deleteUser.visitorId },
        });
        if (!deleteVisitor) {
            return res
                .status(404)
                .json({ message: "Visitor not found", user: serialisedUser });
        }
        const serialisedVisitor = Object.assign(Object.assign({}, deleteVisitor), { mobile: deleteVisitor.mobile.toString() });
        res.json({ user: serialisedUser, visitor: serialisedVisitor });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
