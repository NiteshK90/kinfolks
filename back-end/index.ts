import express, { Express } from "express";
import cors from "cors";
import mongoose, { Error } from "mongoose";
import visitorsRoutes from "./src/routes/Visitors";
import usersRoutes from "./src/routes/Users";

const app: Express = express();
const port = 8000;
const MONGO_URL =
  process.env.DB_CONN_STRING ||
  "mongodb+srv://NiteshK90:41m0xCpFScSa9bVV@cluster0.4uzprbh.mongodb.net/kinfolks?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

//All routes-

// visitors
app.use("/visitors", visitorsRoutes);

app.use("/users", usersRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err: Error) => console.log(err));
