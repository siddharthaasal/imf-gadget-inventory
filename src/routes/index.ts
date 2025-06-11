import express from "express";
import gadgetRouter from "./gadgets";
import authRouter from "./auth";

const mainRouter = express.Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/gadgets", gadgetRouter);

export default mainRouter;