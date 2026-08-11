export type Gender = 'Male' | 'Female';

export interface InputProfile {
  name: string;
  dob: Date; // e.g. 1996-12-31
  gender: Gender;
}

export interface NumberReport {
  psychic: number; // Mulank
  destiny: number; // Bhagyank
  kua: number;
}

export interface NameAnalysis {
  name: string;
  soulUrge: number; // Vowels
  personality: number; // Consonants
  destiny: number; // Full Name
}

export interface ChallengeCycle {
  firstCycle: number;
  secondCycle: number;
  thirdCycle: number;
  fourthCycle: number;
  firstCycleAgeUpto: number;
  secondCycleAgeUpto: number;
  thirdCycleAgeUpto: number;
  fourthCycleAgeFrom: number;
}

export interface ExpandedProfile extends NumberReport {
  masterNumbers: number[];
  karmicDebt: number;
  successNumber: number;
  personalYears: { year: number; personalYear: number }[];
  marriageYears: { year: number; personalYear: number }[];
  challengeCycles: ChallengeCycle;
  nameAnalysis: NameAnalysis[]; // Per word + full name
  missingNumbers: number[];
  repeatingNumbers: number[];
  planes: string[];
  missingPlanes: string[];
  luckyNumbers: number[];
  unluckyNumbers: number[];
  neutralNumbers: number[];
}
