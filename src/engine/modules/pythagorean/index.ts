import { reduceWithMasterNumbers } from '../../core/calculator';

export const PythagoreanMap: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

export interface NameAnalysis {
  expression: number;
  soulUrge: number;
  personality: number;
  breakdown: Array<{ char: string, value: number }>;
}

export function analyzePythagoreanName(name: string): NameAnalysis {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
  
  let expressionSum = 0;
  let soulUrgeSum = 0;
  let personalitySum = 0;
  const breakdown: Array<{ char: string, value: number }> = [];

  for (const char of normalized) {
    const val = PythagoreanMap[char] || 0;
    breakdown.push({ char, value: val });
    
    expressionSum += val;
    if (vowels.has(char)) {
      soulUrgeSum += val;
    } else {
      personalitySum += val;
    }
  }

  return {
    expression: reduceWithMasterNumbers(expressionSum),
    soulUrge: reduceWithMasterNumbers(soulUrgeSum),
    personality: reduceWithMasterNumbers(personalitySum),
    breakdown
  };
}

export function calculatePythagoreanValue(name: string): number {
  return analyzePythagoreanName(name).expression;
}
