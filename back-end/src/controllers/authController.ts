import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.send("Login Page");
};

export const dashboard = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.name}`);
  } else {
    res.status(401).send("Please log in to view this page");
  }
};
