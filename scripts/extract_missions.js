
import fs from 'fs';
import path from 'path';

const unitsPath = path.join(process.cwd(), 'src/data/units.json');
const missionsPath = path.join(process.cwd(), 'src/data/missions.json');

const data = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const missions = [];
const units = [];

data.forEach(item => {
  if (
    item.points === 0 &&
    item.force === 0 &&
    item.stamina === 0 &&
    item.durability === 0 &&
    (!item.eras || item.eras.length === 0) &&
    (!item.keywords || item.keywords.length === 0) &&
    (!item.abilityIds || item.abilityIds.length === 0) &&
    (!item.stanceIds || item.stanceIds.length === 0)
  ) {
    missions.push({
      name: item.name,
      image: item.image
    });
  } else {
    units.push(item);
  }
});

fs.writeFileSync(missionsPath, JSON.stringify(missions, null, 2));
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));

console.log(`Extracted ${missions.length} missions.`);
console.log(`Remaining units: ${units.length}`);
