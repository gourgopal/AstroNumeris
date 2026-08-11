import { reduceToSingleDigit } from '../../core/calculator';
import { numerologyData } from '../../data';

export interface MobileNumerologyResult {
  mobileNumber: string;
  totalSum: number;
  reducedTotal: number;
  zeroCount: number;
  synergyStatus: 'Highly Favorable' | 'Neutral' | 'Unfavorable';
  compatibilityScore: number;
  recommendations: string[];
}

export function analyzeMobileNumber(mobileNumber: string, mulank: number, bhagyank: number): MobileNumerologyResult {
  // Extract only digits
  const digits = mobileNumber.replace(/\D/g, '').split('').map(d => parseInt(d, 10));
  
  const totalSum = digits.reduce((sum, val) => sum + val, 0);
  const reducedTotal = reduceToSingleDigit(totalSum);
  const zeroCount = digits.filter(d => d === 0).length;

  const matrix = (numerologyData as any).mobileCompatibility?.[reducedTotal.toString()];
  
  let synergyStatus: 'Highly Favorable' | 'Neutral' | 'Unfavorable' = 'Neutral';
  let compatibilityScore = 50;
  const recommendations: string[] = [];

  if (matrix) {
    const isFriendlyMulank = matrix.friendly.includes(mulank);
    const isFriendlyBhagyank = matrix.friendly.includes(bhagyank);
    const isEnemyMulank = matrix.enemy.includes(mulank);
    const isEnemyBhagyank = matrix.enemy.includes(bhagyank);

    if (isFriendlyMulank && isFriendlyBhagyank) {
      synergyStatus = 'Highly Favorable';
      compatibilityScore = 95;
    } else if (isEnemyMulank || isEnemyBhagyank) {
      synergyStatus = 'Unfavorable';
      compatibilityScore = 20;
    } else if (isFriendlyMulank || isFriendlyBhagyank) {
      synergyStatus = 'Highly Favorable';
      compatibilityScore = 75;
    } else {
      synergyStatus = 'Neutral';
      compatibilityScore = 50;
    }
  }

  // Zero impact
  if (zeroCount > 1) {
    compatibilityScore -= 10;
    recommendations.push(`This number contains ${zeroCount} zeros. Too many zeros can create unexpected delays or void the energy of surrounding digits.`);
  }

  if (synergyStatus === 'Highly Favorable') {
    recommendations.push(`This number resonates strongly with your core energies (Mulank ${mulank}, Bhagyank ${bhagyank}).`);
    recommendations.push('Excellent for business growth, communication, and overall luck.');
  } else if (synergyStatus === 'Unfavorable') {
    recommendations.push(`The total of ${reducedTotal} clashes with your core numbers.`);
    recommendations.push('Consider using a different number for primary business or significant personal use.');
  } else {
    recommendations.push(`The energy of ${reducedTotal} is neutral for you. It offers balanced, average results.`);
  }

  return {
    mobileNumber,
    totalSum,
    reducedTotal,
    zeroCount,
    synergyStatus,
    compatibilityScore: Math.max(0, Math.min(100, compatibilityScore)),
    recommendations
  };
}
