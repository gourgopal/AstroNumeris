import { reduceToSingleDigit } from './calculator';
import type { ExpandedProfile, NameAnalysis, ChallengeCycle, InputProfile } from './types';
import { numerologyData } from '../data';

// Letter maps based on legacy logic
const letterMap: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};

function isVowel(letter: string): boolean {
  return ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase());
}

function getSum(value: number): number {
  let sum = 0;
  let temp = value;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  return sum;
}

export function generateExpandedProfile(profile: InputProfile): ExpandedProfile {
  const dob = new Date(profile.dob);
  const date = dob.getDate();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();

  const psychic = reduceToSingleDigit(date);
  const destiny = reduceToSingleDigit(date + month + year);
  const yearReduced = reduceToSingleDigit(year);
  const kua = reduceToSingleDigit(profile.gender === 'Male' ? 11 - yearReduced : 4 + yearReduced);

  // Generate numbers for grid & missing
  const generatedNumbers: number[] = [];
  if (date !== 10 && date !== 20 && date !== 30 && date > 10) {
    generatedNumbers.push(date % 10);
    generatedNumbers.push(Math.floor(date / 10));
  }
  if (month <= 9) generatedNumbers.push(month);
  else if (month === 10) generatedNumbers.push(1);
  else if (month === 11) { generatedNumbers.push(1); generatedNumbers.push(1); }
  else if (month === 12) { generatedNumbers.push(1); generatedNumbers.push(2); }
  
  let tempYear = year;
  while (tempYear > 0) {
    generatedNumbers.push(tempYear % 10);
    tempYear = Math.floor(tempYear / 10);
  }
  generatedNumbers.push(psychic);
  generatedNumbers.push(destiny);
  generatedNumbers.push(kua);
  const finalGridNumbers = generatedNumbers.filter(n => n !== 0);

  // Missing numbers
  const missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !finalGridNumbers.includes(n));

  // Repeating
  const repeatingNumbers: number[] = [];
  for (let i = 1; i <= 9; ++i) {
    const count = finalGridNumbers.filter(n => n === i).length;
    if (count > 1) {
      let r = i;
      for (let j = 1; j < count; j++) r += i * Math.pow(10, j);
      repeatingNumbers.push(r);
    }
  }

  // Master numbers
  const masterNumbers: number[] = [];
  let dVal = date;
  if (dVal > 9) {
    if ([11, 22, 29].includes(dVal)) {
      masterNumbers.push(dVal === 29 ? 11 : dVal);
    }
    dVal = reduceToSingleDigit(dVal);
  }
  let mVal = month;
  if (mVal === 11) masterNumbers.push(mVal);
  else if (mVal > 9) mVal = getSum(mVal);

  const ySum = getSum(year);
  if ([11, 22, 33, 44, 55, 66].includes(ySum)) masterNumbers.push(ySum);
  let total = dVal + mVal + ySum;
  while (total > 9) {
    if ([11, 22, 33, 44, 55].includes(total)) masterNumbers.push(total);
    total = getSum(total);
  }

  // Karmic debt
  const karmicDebt = [10, 13, 14, 16, 19].includes(date) ? date : 0;

  // Challenge cycles
  const firstCycle = reduceToSingleDigit(date + month);
  const secondCycle = reduceToSingleDigit(date + year);
  const challengeCycles: ChallengeCycle = {
    firstCycle,
    secondCycle,
    thirdCycle: reduceToSingleDigit(firstCycle + secondCycle),
    fourthCycle: reduceToSingleDigit(year + month),
    firstCycleAgeUpto: 36 - destiny,
    secondCycleAgeUpto: (36 - destiny) + 9,
    thirdCycleAgeUpto: (36 - destiny) + 18,
    fourthCycleAgeFrom: (36 - destiny) + 18,
  };

  // Name Analysis
  const analyzeName = (n: string): NameAnalysis => {
    let soulUrgeRaw = 0, personalityRaw = 0, destinyRaw = 0;
    const lower = n.toLowerCase();
    for (let i = 0; i < lower.length; i++) {
      const char = lower[i];
      if (!letterMap[char]) continue;
      const val = letterMap[char];
      destinyRaw += val;
      if (isVowel(char)) {
        if (i === 0 && char === 'y') personalityRaw += val; 
        else soulUrgeRaw += val;
      } else {
        personalityRaw += val;
      }
    }
    return {
      name: n,
      soulUrge: reduceToSingleDigit(soulUrgeRaw) || 0,
      personality: reduceToSingleDigit(personalityRaw) || 0,
      destiny: reduceToSingleDigit(destinyRaw) || 0
    };
  };

  const nameParts = profile.name.split(' ').filter(p => p.length > 0);
  const nameAnalysis: NameAnalysis[] = [analyzeName(profile.name), ...nameParts.map(analyzeName)];

  // Success Number
  const successNumber = reduceToSingleDigit(date + month);

  // Marriage Years
  const marriageNumbers: Record<number, number[]> = {
    1: [1, 4, 5, 7, 9], 2: [1, 2, 5, 6, 8], 3: [3, 6, 7, 9],
    4: [1, 2, 4, 7, 8], 5: [2, 3, 5, 7, 9], 6: [1, 2, 3, 5, 6, 8],
    7: [1, 2, 4, 8], 8: [1, 2, 4, 6, 8], 9: [1, 2, 3, 6, 7]
  };
  const mNumbers = marriageNumbers[psychic] || [];
  const marriageYears = [];
  const currentYear = new Date().getFullYear();
  for (let y = year + 18; y <= Math.min(year + 120, currentYear + 20); y++) {
    const py = reduceToSingleDigit(date + month + y);
    if (mNumbers.includes(py)) marriageYears.push({ year: y, personalYear: py });
  }

  // Personal Years
  const personalYears = [];
  for (let y = year; y <= currentYear + 20; y++) {
    personalYears.push({ year: y, personalYear: reduceToSingleDigit(date + month + y) });
  }

  // Planes
  const planeDefs: Record<string, number[]> = {
    "Golden Yog": [4, 5, 6], "Silver Yog": [2, 5, 8], Mind: [4, 9, 2], Heart: [3, 5, 7],
    Practical: [8, 1, 6], Thought: [4, 3, 8], Will: [9, 5, 1], Action: [2, 7, 6]
  };
  const planes = Object.keys(planeDefs).filter(k => planeDefs[k].every(v => finalGridNumbers.includes(v)));
  const missingPlanes = Object.keys(planeDefs).filter(k => planeDefs[k].every(v => missingNumbers.includes(v)));

  // Relations
  const getFriends = (n: number) => numerologyData.compatibilityMatrix[n.toString() as any]?.friends || [];
  const getEnemies = (n: number) => numerologyData.compatibilityMatrix[n.toString() as any]?.enemies || [];
  const getNeutrals = (n: number) => numerologyData.compatibilityMatrix[n.toString() as any]?.neutrals || [];
  
  const psychicFriends = getFriends(psychic);
  const destinyFriends = getFriends(destiny);
  const luckyNumbers = psychicFriends.filter(x => destinyFriends.includes(x));
  const unluckyNumbers = getEnemies(psychic).filter(x => getEnemies(destiny).includes(x));
  const neutralNumbers = getNeutrals(psychic).filter(x => getNeutrals(destiny).includes(x));

  return {
    psychic, destiny, kua,
    masterNumbers: Array.from(new Set(masterNumbers)), karmicDebt, successNumber,
    challengeCycles, nameAnalysis,
    personalYears, marriageYears,
    missingNumbers, repeatingNumbers,
    planes, missingPlanes,
    luckyNumbers, unluckyNumbers, neutralNumbers
  };
}
