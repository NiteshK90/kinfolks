"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Visitors_1 = __importDefault(require("./src/routes/Visitors"));
const Users_1 = __importDefault(require("./src/routes/Users"));
const Admin_1 = __importDefault(require("./src/routes/Admin"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//All routes-
app.use("/visitors", Visitors_1.default);
app.use("/users", Users_1.default);
app.use("/admin", Admin_1.default);
// Connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
