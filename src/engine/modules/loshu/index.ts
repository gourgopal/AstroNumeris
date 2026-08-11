import type { InputProfile, NumberReport } from '../../core/types';
import { reduceToSingleDigit } from '../../core/calculator';

export interface LoShuGridResult extends NumberReport {
  generatedNumbers: number[];
}

export function calculateLoShu(profile: InputProfile): LoShuGridResult {
  const { dob, gender } = profile;
  
  // 1. Psychic / Driver / Mulank
  // Sum of day digits
  const day = dob.getDate();
  const psychic = reduceToSingleDigit(day);

  // 2. Destiny / Conductor / Bhagyank
  // Sum of all digits in DOB
  const daySum = day.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  const monthSum = (dob.getMonth() + 1).toString().split('').reduce((a, b) => a + parseInt(b), 0);
  const yearSum = dob.getFullYear().toString().split('').reduce((a, b) => a + parseInt(b), 0);
  const destiny = reduceToSingleDigit(daySum + monthSum + yearSum);

  // 3. Kua Number
  const yearSumReduced = reduceToSingleDigit(yearSum);
  let kua = 0;
  if (gender === 'Male') {
    kua = reduceToSingleDigit(11 - yearSumReduced);
  } else {
    kua = reduceToSingleDigit(4 + yearSumReduced);
  }

  // 4. Grid Generation
  // Numbers from DOB, Mulank, Bhagyank, Kua (excluding century digits optionally)
  // Let's stick to standard practice: include all DOB digits
  const dobDigits = [
    ...day.toString().split(''),
    ...(dob.getMonth() + 1).toString().split(''),
    ...dob.getFullYear().toString().split('')
  ].map(d => parseInt(d)).filter(d => d !== 0);

  const generatedNumbers = [
    ...dobDigits,
    psychic,
    destiny,
    kua
  ];

  return {
    psychic,
    destiny,
    kua,
    generatedNumbers
  };
}
