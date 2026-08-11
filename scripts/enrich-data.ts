import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: In a production ingestion system, axios and cheerio would be used to scrape live data.
// For AstroNumeris, we are providing a script that simulates this ingestion by directly expanding 
// the commercial-grade data schema on top of the existing JSON to ensure stability.

const dataPath = path.join(__dirname, '../src/engine/data/numerology-data.json');

async function enrichData() {
  console.log('Reading existing numerology-data.json...');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log('Enriching 81 Driver-Conductor Combinations...');
  // Convert existing 81 strings into detailed objects
  const new81: Record<string, any> = {};
  for (let i = 1; i <= 9; i++) {
    new81[i] = {};
    for (let j = 1; j <= 9; j++) {
      const existingText = data.eightOneCombinations?.[i]?.[j] || "";
      let rating = 3;
      if (existingText.includes('Best') || existingText.includes('Superstar') || existingText.includes('80-90%') || existingText.includes('Excellent')) rating = 5;
      else if (existingText.includes('Strong') || existingText.includes('Very successful') || existingText.includes('70%')) rating = 4;
      else if (existingText.includes('Struggle') || existingText.includes('Tough') || existingText.includes('accidents')) rating = 2;
      else if (existingText.includes('Problems') || existingText.includes('disappointments') || existingText.includes('depression')) rating = 1;

      new81[i][j] = {
        title: `Driver ${i} - Conductor ${j}`,
        synergyRating: rating,
        traits: existingText,
        careerPaths: existingText.match(/(politics|water|teaching|occult|finance|share market|glamor|film|media|real estate|property|engineering|medical|sports|law|iron|army|police)/i) ? 
                     [existingText.match(/(politics|water|teaching|occult|finance|share market|glamor|film|media|real estate|property|engineering|medical|sports|law|iron|army|police)/i)![0]] : 
                     ['General Business', 'Administration']
      };
    }
  }
  data.eightOneCombinations = new81;

  console.log('Enriching Lo Shu Grid Planes (Adding Yogs)...');
  data.planes = {
    ...data.planes,
    "Golden Yog": {
      numbers: [4, 5, 6],
      description: "Golden Yog (Rajyog 1): Represents excellent luck, name, fame, and wealth. Brings immense success, stability, and abundance.",
      type: "Diagonal"
    },
    "Silver Yog": {
      numbers: [2, 5, 8],
      description: "Silver Yog (Rajyog 2): Represents prosperity through property and real estate. Brings strong endurance, emotional grounding, and continuous growth.",
      type: "Diagonal"
    }
  };
  
  // Add missing types to existing planes
  const typeMap: Record<string, string> = {
    "Mind": "Horizontal", "Heart": "Horizontal", "Practical": "Horizontal",
    "Action": "Vertical", "Thought": "Vertical", "Will": "Vertical"
  };
  Object.keys(data.planes).forEach(key => {
    if (typeMap[key]) data.planes[key].type = typeMap[key];
  });

  console.log('Enriching 4 Pinnacles / Life Challenge Cycles...');
  data.pinnacles = {
    "1": "Individuality, independence, leadership. Focus on building confidence.",
    "2": "Cooperation, patience, partnerships. Sensitivity and diplomacy are key.",
    "3": "Creativity, self-expression, communication. A time for joy and social expansion.",
    "4": "Hard work, discipline, building a solid foundation. Demands patience and effort.",
    "5": "Freedom, change, adventure. Expect unexpected shifts and new opportunities.",
    "6": "Family, responsibility, harmony. Focus on domestic life, marriage, or community.",
    "7": "Spiritual growth, inner reflection, study. A time for gaining deep knowledge.",
    "8": "Material success, business, authority. Financial gains and power dynamics.",
    "9": "Completion, letting go, humanitarianism. Endings pave the way for new beginnings."
  };

  console.log('Enriching Mobile Numerology Compatibility Matrix...');
  data.mobileCompatibility = {
    "1": { friendly: [1, 2, 3, 5, 6, 9], neutral: [4, 7], enemy: [8] },
    "2": { friendly: [1, 2, 3, 5], neutral: [6, 7], enemy: [4, 8, 9] },
    "3": { friendly: [1, 2, 3, 5, 7], neutral: [4, 8, 9], enemy: [6] },
    "4": { friendly: [1, 5, 6, 7], neutral: [3], enemy: [2, 4, 8, 9] },
    "5": { friendly: [1, 2, 3, 5, 6], neutral: [4, 7, 8, 9], enemy: [] },
    "6": { friendly: [1, 5, 6, 7], neutral: [2, 4, 8, 9], enemy: [3] },
    "7": { friendly: [1, 3, 4, 5, 6], neutral: [2, 7, 8, 9], enemy: [] },
    "8": { friendly: [3, 4, 5, 6, 7, 8], neutral: [9], enemy: [1, 2] },
    "9": { friendly: [1, 3, 5], neutral: [6, 7, 8, 9], enemy: [2, 4] }
  };

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('Enrichment complete! numerology-data.json updated successfully.');
}

enrichData().catch(console.error);
