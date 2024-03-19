import express, { Express } from "express";
import cors from "cors";
import mongoose, { Error } from "mongoose";
import visitorsRoutes from "./src/routes/Visitors";
import usersRoutes from "./src/routes/Users";

const app: Express = express();
const port = 8000;
const DB_URL =
  process.env.DATABASE_URL ||
  "postgresql://justmac@localhost:5432/kinfolks?schema=public&connection_limit=5&pool_timeout=0";

app.use(express.json());
app.use(cors());

//All routes-
app.use("/visitors", visitorsRoutes);
app.use("/users", usersRoutes);

// Connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
