import { Request, Response } from "express";
import Visitors from "../models/Visitors";
import { v4 } from "uuid";

export const addNewVisitor = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const visitor = new Visitors({ ...data, _id: v4(), isValidVisitor: false });
    const savedData = await visitor.save();
    if (!savedData) {
      res.status(500).send({ error: "Unable to add visitor" });
    }
    res
      .status(201)
      .send({ msg: "Visitor added successfully", data: savedData });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

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

export const updateValidity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isValidVisitor } = req.body;

  try {
    const updateUser = await Visitors.findByIdAndUpdate(
      { _id: id },
      { isValidVisitor },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updateUser);
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
