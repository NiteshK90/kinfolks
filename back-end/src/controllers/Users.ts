import { Request, Response } from "express";
import Users from "../models/Users";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = Users.find();
    if (!users) {
      return res.status(400).json({ message: "Users data empty" });
    }
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
