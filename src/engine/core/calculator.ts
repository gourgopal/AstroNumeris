/**
 * Reduces a number to a single digit by summing its digits.
 * Example: 1996 -> 1+9+9+6 = 25 -> 2+5 = 7
 */
export function reduceToSingleDigit(num: number): number {
  if (num < 10) return num;
  let sum = 0;
  let temp = num;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  return reduceToSingleDigit(sum);
}

/**
 * Reduces a number to a single digit, but preserves Master Numbers (11, 22, 33).
 */
export function reduceWithMasterNumbers(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  if (num < 10) return num;
  
  let sum = 0;
  let temp = num;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }

  if (sum === 11 || sum === 22 || sum === 33) return sum;
  return reduceWithMasterNumbers(sum);
}
