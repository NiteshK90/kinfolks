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
            data: data.places,
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
