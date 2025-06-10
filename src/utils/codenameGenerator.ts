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
]

export function generateCodename(): string {
    const index = Math.floor(Math.random() * codenames.length);
    const suffix = Math.floor(Math.random() * 10000);
    const uniqueCodename = codenames[index] + suffix;
    console.log(uniqueCodename);
    return uniqueCodename;
}