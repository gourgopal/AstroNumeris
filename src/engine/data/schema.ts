export interface NumerologyData {
  numbers: Record<string, NumberDetail>;
  compatibilityMatrix: Record<string, Compatibility>;
  personalYears: Record<string, PersonalYearDetail>;
  eightOneCombinations: Record<string, Record<string, string>>;
  missingNumbers: Record<string, string>;
  planes: Record<string, PlaneDetail>;
}

export interface NumberDetail {
  planet: string;
  traits: string;
  strengths: string;
  weaknesses: string;
}

export interface Compatibility {
  friends: number[];
  enemies: number[];
  neutrals: number[];
}

export interface PersonalYearDetail {
  keyword: string;
  positive: string;
  negative: string;
}

export interface PlaneDetail {
  numbers: number[];
  description: string;
}
