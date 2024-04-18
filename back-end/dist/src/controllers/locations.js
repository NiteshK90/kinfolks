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
exports.getAllLocations = exports.addNewLocationWithPlaces = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addNewLocationWithPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const location = yield prisma.locations.create({
            data: {
                name: data.name,
                bestTime: data.bestTime,
                places: {
                    createMany: {
                        data: data.places.map((place) => ({
                            name: place.name,
                            timeToVisit: place.timeToVisit,
                            description: place.description,
                        })),
                    },
                },
            },
        });
        if (!location) {
            res.status(500).send({ error: "Unable to add places" });
        }
        res
            .send(201)
            .send({ data: location, message: "Location added successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
    finally {
        prisma.$disconnect();
    }
});
exports.addNewLocationWithPlaces = addNewLocationWithPlaces;
const getAllLocations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield prisma.locations.findMany({
            select: {
                id: true,
                name: true,
                bestTime: true,
                createdAt: true,
                places: true,
            },
        });
        if (!locations) {
            res.status(400).json({ error: "Locations are empty" });
        }
        res.status(200).json(locations);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
    finally {
        prisma.$disconnect();
    }
});
exports.getAllLocations = getAllLocations;
