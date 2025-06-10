"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
// async function addGadget(req: Request, res: Response) {
//     const gadgetName = req.gadgetName;
//     if (!gadgetName || gadgetName.trim() === "") {
//         return res.status(400).json({ error: "Gadget name missing" });
//     }
//     const newGadget = await prisma.Gadget.create({
//         data: {
//             name: gadgetName,
//             codename: generateCodename(),
//             status: "Available"
//         }
//     })
//     return res.status(201).json({ gadget: newGadget });
// }
async function getGadgets(req, res) {
    const gadgets = await prisma_1.default.Gadget.findMany();
    return res.status(200).json({ gadgets });
}
