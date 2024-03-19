import { Request, Response } from "express";
import Visitors from "../models/Visitors";
import { v4 } from "uuid";
import Users from "../models/Users";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addNewVisitor = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const visitor = await prisma.visitors.create({
      data: { ...data, isValidVisitor: false },
    });
    if (!visitor) {
      res.status(500).send({ error: "Unable to add visitor" });
    }
    const serializedData = { ...visitor, mobile: visitor.mobile.toString() };
    res
      .status(201)
      .send({ msg: "Visitor added successfully", data: serializedData });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getVisitors = async (_req: Request, res: Response) => {
  try {
    const visitors = await prisma.visitors.findMany();
    if (!visitors) {
      res.status(400).json({ error: "Visitors data empty" });
    }
    const serializedData = visitors.map((item) => ({
      ...item,
      mobile: item.mobile.toString(),
    }));
    res.status(200).json(serializedData);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export const getSingleVisitor = async (req: Request, res: Response) => {
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
    const serializedData = { ...visitor };
    res.status(200).json(serializedData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateValidity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isValidVisitor } = req.body;

  try {
    const updateVisitor = await prisma.visitors.update({
      where: { id },
      data: { isValidVisitor },
    });
    if (!updateVisitor) {
      return res.status(404).json({ message: "User not found" });
    }
    const serializedVisitor = {
      ...updateVisitor,
      mobile: updateVisitor.mobile.toString(),
    };
    const saveUser = await prisma.users.create({
      data: {
        name: updateVisitor.name,
        email: updateVisitor.email,
        mobile: updateVisitor.mobile,
      },
    });
    if (!saveUser) {
      return res
        .status(500)
        .json({ message: "User not created", visitor: serializedVisitor });
    }
    const serializedUser = { ...saveUser, mobile: saveUser.mobile.toString() };
    res.json({ user: serializedUser, visitor: serializedVisitor });
  } catch (error) {
    res.status(500).json({ message: "Error ocurred" });
  }
};

export const deleteVisitor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteVisitor = await Visitors.findByIdAndDelete({ _id: id });
    if (!deleteVisitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.json(deleteVisitor);
  } catch (error) {
    res.status(500).json({ message: "Error ocurred" });
  }
};
