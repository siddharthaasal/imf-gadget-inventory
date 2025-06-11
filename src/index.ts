import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import mainRouter from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server for imf-gadgets-inventory says hello");
})

app.use("/", mainRouter);


const portNumber = process.env.portNumber || 3001;
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
});
