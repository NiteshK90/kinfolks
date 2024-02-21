import { Request, Response } from "express";
import Visitors from "../models/Visitors";

export const getVisitors = async (_req: Request, res: Response) => {
  try {
    const visitors = await Visitors.find();
    if (!visitors) {
      res.status(400).json({ error: "Visitors data empty" });
    }
    res.status(200).json(visitors);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export const getSingleVisitor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const visitor = await Visitors.findById({ _id: id });
    if (!visitor) {
      res.status(400).json({ error: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
