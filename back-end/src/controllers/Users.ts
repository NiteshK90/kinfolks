import { Request, Response } from "express";
import Users from "../models/Users";
import Visitors from "../models/Visitors";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(400).json({ message: "Users data empty" });
    }
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteUser = await Users.findByIdAndDelete({ _id: id });
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const deleteVisitor = await Visitors.findByIdAndDelete({
      _id: deleteUser.refId,
    });
    if (!deleteVisitor) {
      return res
        .status(404)
        .json({ message: "Visitor not found", user: { deleteUser } });
    }
    res.json({ user: deleteUser, visitor: deleteVisitor });
  } catch (error) {
    res.status(500).json({ message: "Error ocurred" });
  }
};
