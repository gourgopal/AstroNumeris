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

export function calculatePythagoreanValue(name: string): number {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of normalized) {
    sum += PythagoreanMap[char] || 0;
  }
  return sum;
}
