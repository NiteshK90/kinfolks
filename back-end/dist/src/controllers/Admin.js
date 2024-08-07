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
exports.login = exports.updatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const secretKey = process.env.JWT_SECRET;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const updateAdminUser = yield prisma.adminUsers.update({
        where: { id },
        data: { password: hashedPassword },
    });
    if (!updateAdminUser) {
        return res.status(400).json({ message: "User not found" });
    }
    res.status(201).json({ user: updateAdminUser });
});
exports.updatePassword = updatePassword;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.adminUsers.findUnique({ where: { email: email } });
    if (!user) {
        return res.status(400).json({ message: "User not found." });
    }
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        return res.status(500).json({ message: "Wrong username or password" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey || "", {
        expiresIn: "1h",
    });
    res.status(201).json({ message: "Login successful", token: token });
});
exports.login = login;
