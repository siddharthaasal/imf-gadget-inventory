"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodename = generateCodename;
const codenames = [
    "The Nightingale",
    "The Kraken",
    "The Hound",
    "The Vampire",
    "The Oracle",
    "The Lynx",
    "The Basilisk",
    "The Obsidian",
    "The Ghost",
    "The Harbinger",
    "The Devil",
    "The Serpent",
    "The Cursed",
    "The Omni"
];
function generateCodename() {
    const index = Math.floor(Math.random() * codenames.length);
    const suffix = Math.floor(Math.random() * 10000);
    const uniqueCodename = codenames[index] + suffix;
    console.log(uniqueCodename);
    return uniqueCodename;
}
