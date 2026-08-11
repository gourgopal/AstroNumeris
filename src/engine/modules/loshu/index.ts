import { InputProfile, NumberReport, Gender } from '../../core/types';
import { reduceToSingleDigit } from '../../core/calculator';

export interface LoShuGridResult extends NumberReport {
  generatedNumbers: number[];
}

export function calculateLoShu(profile: InputProfile): LoShuGridResult {
  const { dob, gender } = profile;
  
  const day = dob.getDate();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();

  // Psychic / Mulank: sum of day digits
  const psychic = reduceToSingleDigit(day);

  // Destiny / Bhagyank: sum of day + month + year
  const destiny = reduceToSingleDigit(day + month + year);

  // Kua Number
  // Male: 11 - (sum of year digits) -> wait, actually sum of year digits until single digit, then subtract from 11
  // Female: 4 + (sum of year digits)
  const yearSum = reduceToSingleDigit(year);
  let kua = 0;
  if (gender === Gender.Male) {
    kua = reduceToSingleDigit(11 - yearSum);
  } else {
    kua = reduceToSingleDigit(4 + yearSum);
  }

  // All numbers present in dob, psychic, destiny, and kua
  const digits = `${day}${month}${year}`.split('').map(Number);
  const generatedNumbers = [...digits, psychic, destiny, kua];

  return {
    psychic,
    destiny,
    kua,
    generatedNumbers,
  };
}
