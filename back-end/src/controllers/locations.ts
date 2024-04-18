import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addNewLocationWithPlaces = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const location = await prisma.locations.create({
      data: {
        name: data.name,
        bestTime: data.bestTime,
        places: {
          createMany: {
            data: data.places.map(
              (place: { name: any; timeToVisit: any; description: any }) => ({
                name: place.name,
                timeToVisit: place.timeToVisit,
                description: place.description,
              })
            ),
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
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

export const getAllLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await prisma.locations.findMany({
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
  } catch (err: any) {
    res.status(500).json(err.message);
  } finally {
    prisma.$disconnect();
  }
};
