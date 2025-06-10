import express from "express";
const gadgetRouter = express.Router();
import { getGadgets } from "../controllers/GadgetController";

gadgetRouter.get("/", getGadgets);

export default gadgetRouter;