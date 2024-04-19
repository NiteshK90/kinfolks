import express, { Express } from "express";
import cors from "cors";
import visitorsRoutes from "./src/routes/Visitors";
import usersRoutes from "./src/routes/Users";
import adminRoutes from "./src/routes/Admin";
import locationRoutes from "./src/routes/Locations";

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(cors());

//All routes-
app.use("/visitors", visitorsRoutes);
app.use("/users", usersRoutes);
app.use("/admin", adminRoutes);
app.use("/locations", locationRoutes);

// Connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
