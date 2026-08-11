import rawData from './numerology-data.json';
import { NumerologyData } from './schema';

export const numerologyData: NumerologyData = rawData as NumerologyData;

/**
 * Helper function to safely get number details
 */
export const getNumberDetail = (num: number) => numerologyData.numbers[num.toString()];

/**
 * Helper function to safely get missing number interpretations
 */
export const getMissingNumberInterpretation = (num: number) => numerologyData.missingNumbers[num.toString()];
