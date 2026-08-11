export const ChaldeanMap: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

export interface NameAnalysis {
  expression: number;
  soulUrge: number;
  personality: number;
  breakdown: Array<{ char: string, value: number }>;
}

export function analyzeChaldeanName(name: string): NameAnalysis {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
  
  let expression = 0;
  let soulUrge = 0;
  let personality = 0;
  const breakdown: Array<{ char: string, value: number }> = [];

  for (const char of normalized) {
    const val = ChaldeanMap[char] || 0;
    breakdown.push({ char, value: val });
    
    expression += val;
    if (vowels.has(char)) {
      soulUrge += val;
    } else {
      personality += val;
    }
  }

  return { expression, soulUrge, personality, breakdown };
}

export function calculateChaldeanValue(name: string): number {
  return analyzeChaldeanName(name).expression;
}
