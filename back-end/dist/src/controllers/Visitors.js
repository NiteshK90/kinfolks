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
exports.deleteVisitor = exports.updateValidity = exports.getSingleVisitor = exports.getVisitors = exports.addNewVisitor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addNewVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const visitor = yield prisma.visitors.create({
            data: Object.assign(Object.assign({}, data), { isValidVisitor: false }),
        });
        if (!visitor) {
            res.status(500).send({ error: "Unable to add visitor" });
        }
        const serializedData = Object.assign(Object.assign({}, visitor), { mobile: visitor.mobile.toString() });
        res
            .status(201)
            .send({ msg: "Visitor added successfully", data: serializedData });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
    finally {
        prisma.$disconnect();
    }
});
exports.addNewVisitor = addNewVisitor;
const getVisitors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitors = yield prisma.visitors.findMany();
        if (!visitors) {
            res.status(400).json({ error: "Visitors data empty" });
        }
        const serializedData = visitors.map((item) => (Object.assign(Object.assign({}, item), { mobile: item.mobile.toString() })));
        res.status(200).json(serializedData);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
    finally {
        prisma.$disconnect();
    }
});
exports.getVisitors = getVisitors;
const getSingleVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const visitor = prisma.visitors.findUnique({
            where: {
                id,
            },
        });
        if (!visitor) {
            res.status(400).json({ error: "Visitor not found" });
        }
        const serializedData = Object.assign({}, visitor);
        res.status(200).json(serializedData);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
    finally {
        prisma.$disconnect();
    }
});
exports.getSingleVisitor = getSingleVisitor;
const updateValidity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isValidVisitor } = req.body;
    try {
        const updateVisitor = yield prisma.visitors.update({
            where: { id },
            data: { isValidVisitor },
        });
        if (!updateVisitor) {
            return res.status(404).json({ message: "User not found" });
        }
        const serializedVisitor = Object.assign(Object.assign({}, updateVisitor), { mobile: updateVisitor.mobile.toString() });
        const saveUser = yield prisma.users.create({
            data: {
                name: updateVisitor.name,
                email: updateVisitor.email,
                mobile: updateVisitor.mobile,
                visitorId: updateVisitor.id,
            },
        });
        if (!saveUser) {
            return res
                .status(500)
                .json({ message: "User not created", visitor: serializedVisitor });
        }
        const serializedUser = Object.assign(Object.assign({}, saveUser), { mobile: saveUser.mobile.toString() });
        res.json({ user: serializedUser, visitor: serializedVisitor });
    }
    catch (error) {
        res.status(500).json({ message: "Error ocurred" });
    }
    finally {
        prisma.$disconnect();
    }
});
exports.updateValidity = updateValidity;
const deleteVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteVisitor = yield prisma.visitors.delete({ where: { id } });
        if (!deleteVisitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        const serialisedVisitor = Object.assign(Object.assign({}, deleteVisitor), { mobile: deleteVisitor.mobile.toString() });
        res.json(serialisedVisitor);
    }
    catch (error) {
        res.status(500).json({ message: "Error ocurred" });
    }
    finally {
        prisma.$disconnect();
    }
});
exports.deleteVisitor = deleteVisitor;
