import express, { Express } from "express";
import cors from "cors";
import visitorsRoutes from "@routes/Visitors";
import usersRoutes from "@routes/Users";
import adminRoutes from "@routes/Admin";
import locationRoutes from "@routes/Locations";

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
