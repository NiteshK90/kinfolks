import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

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
