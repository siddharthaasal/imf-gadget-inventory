import express from "express";
import gadgetRouter from "./gadgets";

const mainRouter = express.Router();

mainRouter.use("/gadgets", gadgetRouter);

export default mainRouter;