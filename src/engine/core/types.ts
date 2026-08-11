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
