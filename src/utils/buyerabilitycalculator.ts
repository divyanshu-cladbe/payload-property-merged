/**
 * Buyer Ability Calculator
 * Implements the loan affordability formula based on financial parameters
 */

export interface CalculatorInputs {
  monthlyIncome: number;
  currentAge: number;
  existingEMI?: number;
  downPayment?: number;
}

export interface LoanParameters {
  loanRate: number;
  maxAge: number;
  maxTenure: number;
  customerMarginRate: number;
  foir?: number;
}

export interface CalculationResult {
  maxAffordableEMI: number;
  principalAmount: number;
  estimatedTargetRange: number;
  optionOne: number;
  optionTwo: number;
  selectedOption: number;
  yearsRemainingToMaxAge: number;
  maxTenureMonths: number;
  effectiveInterestRate: number;
  isEligible: boolean;
  details: string;
}

/**
 * Calculate buyer ability based on financial parameters
 *
 * Formula breakdown:
 * 1. Max Affordable EMI = (Income × FOIR) - Existing EMI
 *    (Default FOIR = 50% if not provided)
 *
 * 2. Loan Calculation (P):
 *    P = EMI × [(1+r)^n - 1] / [r × (1+r)^n]
 *    where r = monthly interest rate, n = loan tenure in months
 *
 * 3. Option 1: P + Down Payment
 * 4. Option 2: P / (1 - Customer Margin Rate)
 * 5. Selected Option: Maximum of Option 1 and Option 2
 */
export function calculateBuyerAbility(
  inputs: CalculatorInputs,
  params: LoanParameters
): CalculationResult {
  const {
    monthlyIncome,
    currentAge,
    existingEMI = 0,
    downPayment = 0,
  } = inputs;
  const {
    loanRate,
    maxAge,
    maxTenure,
    customerMarginRate,
    foir = 70, // Default FOIR to 70% if not provided
  } = params;

  try {
    // Step 1: Calculate max affordable monthly EMI
    const maxAffordableEMI = (monthlyIncome * foir) / 100 - existingEMI;

    // Step 2: Calculate years remaining to max age
    const yearsRemainingToMaxAge = Math.max(maxAge - currentAge, 1);

    // Step 3: Calculate max tenure in months (cannot exceed remaining years)
    const maxTenureMonths = Math.min(
      maxTenure * 12,
      yearsRemainingToMaxAge * 12
    );

    // Step 4: Calculate effective interest rate (loan rate is already the base rate)
    const effectiveInterestRate = loanRate;

    // Step 5: Calculate principal amount using EMI formula
    // P = EMI × [(1+r)^n - 1] / [r × (1+r)^n]
    const monthlyRate = loanRate / 100 / 12;
    let principalAmount = 0;

    if (monthlyRate > 0) {
      const powerTerm = Math.pow(1 + monthlyRate, maxTenureMonths);
      const numerator = maxAffordableEMI * (powerTerm - 1);
      const denominator = monthlyRate * powerTerm;
      principalAmount = numerator / denominator;
    } else if (maxAffordableEMI > 0) {
      // If rate is 0, simple division
      principalAmount = maxAffordableEMI * maxTenureMonths;
    }

    // Ensure principal amount is not negative
    principalAmount = Math.max(principalAmount, 0);

    // Step 6: Calculate two options
    const optionOne = principalAmount + downPayment;
    // Convert customer margin rate from percentage to decimal
    const marginRateDecimal = customerMarginRate / 100;
    const optionTwo =
      marginRateDecimal < 1
        ? principalAmount / (1 - marginRateDecimal)
        : principalAmount;

    // Step 7: Select the maximum option
    const estimatedTargetRange = Math.max(optionOne, optionTwo);

    // Step 8: Determine eligibility
    const isEligible = maxAffordableEMI > 0 && estimatedTargetRange > 0;

    // Create detailed explanation
    const details = `
Loan Calculation Details:

Parameters:
- FOIR: ${foir}%
- Loan Rate: ${loanRate}%
- Customer Margin Rate: ${customerMarginRate.toFixed(2)}%
- Max Age: ${maxAge} years
- Max Tenure: ${maxTenure} years
- Current Age: ${currentAge} years

Inputs:
- Monthly Income: ₹${monthlyIncome.toLocaleString("en-IN")}
- Existing EMI: ₹${existingEMI.toLocaleString("en-IN")}
- Down Payment: ₹${downPayment.toLocaleString("en-IN")}

Calculations:
- Max Affordable EMI = (Income × FOIR) - Existing EMI
  = (₹${monthlyIncome.toLocaleString(
    "en-IN"
  )} × ${foir}%) - ₹${existingEMI.toLocaleString("en-IN")}
  = ₹${maxAffordableEMI.toLocaleString("en-IN")}

- Monthly Interest Rate (r) = ${loanRate}% / 12 = ${(monthlyRate * 100).toFixed(
      4
    )}%
- Loan Tenure (n) = ${maxTenureMonths} months
- Years Remaining: ${yearsRemainingToMaxAge} years

- Principal Amount (P) = EMI × [(1+r)^n - 1] / [r × (1+r)^n]
  = ₹${Math.round(principalAmount).toLocaleString("en-IN")}

Option Calculations:
- Option 1: P + Down Payment = ₹${Math.round(optionOne).toLocaleString("en-IN")}
- Option 2: P / (1 - Margin Rate) = ₹${Math.round(optionTwo).toLocaleString(
      "en-IN"
    )}

Result:
- Estimated Target Range (Max): ₹${Math.round(
      estimatedTargetRange
    ).toLocaleString("en-IN")}
- Eligibility: ${isEligible ? "✓ ELIGIBLE" : "✗ NOT ELIGIBLE"}
    `.trim();

    return {
      maxAffordableEMI: Math.round(maxAffordableEMI * 100) / 100,
      principalAmount: Math.round(principalAmount),
      estimatedTargetRange: Math.round(estimatedTargetRange),
      optionOne: Math.round(optionOne),
      optionTwo: Math.round(optionTwo),
      selectedOption: Math.round(estimatedTargetRange),
      yearsRemainingToMaxAge,
      maxTenureMonths,
      effectiveInterestRate,
      isEligible,
      details,
    };
  } catch (error) {
    console.error("Error calculating buyer ability:", error);
    return {
      maxAffordableEMI: 0,
      principalAmount: 0,
      estimatedTargetRange: 0,
      optionOne: 0,
      optionTwo: 0,
      selectedOption: 0,
      yearsRemainingToMaxAge: 0,
      maxTenureMonths: 0,
      effectiveInterestRate: 0,
      isEligible: false,
      details: "Error in calculation. Please check inputs.",
    };
  }
}

/**
 * Calculate estimated monthly EMI for a requested loan amount
 */
export function calculateEMI(
  principalAmount: number,
  annualInterestRate: number,
  tenureMonths: number
): number {
  if (principalAmount <= 0 || tenureMonths <= 0) {
    return 0;
  }

  const monthlyRate = annualInterestRate / 100 / 12;

  if (monthlyRate === 0) {
    return Math.round((principalAmount / tenureMonths) * 100) / 100;
  }

  const powerTerm = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principalAmount * monthlyRate * powerTerm) / (powerTerm - 1);

  return Math.round(emi * 100) / 100;
}

/**
 * Validate calculator inputs
 */
export function validateInputs(
  inputs: CalculatorInputs,
  maxAge?: number
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push("Monthly income must be greater than 0");
  }

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push("Current age must be between 18 and 80");
  }

  // Check if age exceeds max age
  if (maxAge && inputs.currentAge >= maxAge) {
    errors.push(
      `The age exceeds the max age! Maximum age allowed is ${maxAge} years.`
    );
  }

  if (inputs.existingEMI && inputs.existingEMI < 0) {
    errors.push("Existing EMI cannot be negative");
  }

  if (inputs.downPayment && inputs.downPayment < 0) {
    errors.push("Down payment cannot be negative");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
