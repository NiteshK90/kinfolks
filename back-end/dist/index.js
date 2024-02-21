"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Visitors_1 = __importDefault(require("./src/routes/Visitors"));
const app = (0, express_1.default)();
const port = 8000;
const MONGO_URL = process.env.DB_CONN_STRING ||
    "mongodb+srv://NiteshK90:41m0xCpFScSa9bVV@cluster0.4uzprbh.mongodb.net/kinfolks?retryWrites=true&w=majority";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//All routes-
// visitors
app.use("/visitors", Visitors_1.default);
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch((err) => console.log(err));
