import { ThresholdOperator } from "../types/alert-types";

export function isAlertTriggered(
  operator: ThresholdOperator,
  weatherValue: number,
  thresholdValue: number
): boolean {
  switch (operator) {
    case ThresholdOperator.GT:
      return weatherValue > thresholdValue;
    case ThresholdOperator.LT:
      return weatherValue < thresholdValue;
    case ThresholdOperator.EQ:
      return weatherValue === thresholdValue;
    case ThresholdOperator.GTE:
      return weatherValue >= thresholdValue;
    case ThresholdOperator.LTE:
      return weatherValue <= thresholdValue;
    default:
      console.warn(`Unknown operator: ${operator}`);
      return false;
  }
}
