import { Request, Response, request } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const updatePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updateAdminUser = await prisma.adminUsers.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
  if (!updateAdminUser) {
    return res.status(400).json({ message: "User not found" });
  }
  res.status(201).json({ user: updateAdminUser });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body();
  const user = await prisma.adminUsers.findUnique({ where: { email: email } });
  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(500).json({ message: "Wrong username or password" });
  }

  const token = jwt.sign({ userId: user.id }, "your_secret_key", {
    expiresIn: "1h",
  });
  res.status(201).json({ message: "Login successful", token: token });
};
