import { Request, Response } from "express";
import Users from "../models/Users";
import Visitors from "../models/Visitors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    if (!users) {
      return res.status(400).json({ message: "Users data empty" });
    }
    const serialisedUsers = users.map((item) => ({
      ...item,
      mobile: item.mobile.toString(),
    }));
    res.status(200).json(serialisedUsers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteUser = await prisma.users.delete({ where: { id } });
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const serialisedUser = {
      ...deleteUser,
      mobile: deleteUser.mobile.toString(),
    };
    const deleteVisitor = await prisma.visitors.delete({
      where: { id: deleteUser.visitorId },
    });
    if (!deleteVisitor) {
      return res
        .status(404)
        .json({ message: "Visitor not found", user: serialisedUser });
    }
    const serialisedVisitor = {
      ...deleteVisitor,
      mobile: deleteVisitor.mobile.toString(),
    };
    res.json({ user: serialisedUser, visitor: serialisedVisitor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
