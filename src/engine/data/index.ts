import numerologyJson from './numerology-data.json';
import type { NumerologyData } from './schema';

export const numerologyData: NumerologyData = numerologyJson as unknown as NumerologyData;

/**
 * Helper function to safely get number details
 */
export function getNumberDetail(num: number) {
  if (num < 1 || num > 9) return null;
  return numerologyData.numbers[num.toString() as keyof typeof numerologyData.numbers];
}
