import { v4 } from 'uuid';

let createItem = function(enlightenment) {
    let itemNames = [
        "Frozen Rat Leg",
        "Hefty Stick",
        "Frozen Orb",
        "Sun Orb",
        "Light Orb",
        "Obsidian Orb",
        "Glittering Shards",
        "Old Pot",
    ];
    let maxRoll = enlightenment * 25;
    let nameRoll = itemNames[Math.floor(Math.random() * itemNames.length)];
    let maxEnergyRoll = enlightenment * 100;
    let sparkRoll = Math.floor(Math.random() * maxRoll);
    let luminosityRoll = Math.floor(Math.random() * maxRoll);
    let energyRoll = Math.floor(Math.random() * maxEnergyRoll);
    let item = {
        name: nameRoll,
        spark: sparkRoll,
        luminosity: luminosityRoll,
        energy: energyRoll,
        id: v4()
    };
    return item;
}

export default createItem;

// Higher Enlightenment unlocks better ranges, but can still roll lower tiers
// Enlightenment 1 - Range (1-25) for spark/luminosity - Range 1-100 for Energy
// Enlightenment 2 - Range (26 - 50) for spark/luminosity - Range 100-200 for energy

