import { Request, Response } from "express";
import prisma from "../config/prisma";
import { generateCodename } from "../utils/codenameGenerator";


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


async function getGadgets(req: Request, res: Response) {
    try {
        const gadgets = await prisma.gadget.findMany();
        res.status(200).json({ gadgets });
        return;
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch gadgets" });
        return
    }
}



export { getGadgets };