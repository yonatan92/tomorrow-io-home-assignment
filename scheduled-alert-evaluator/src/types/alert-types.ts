export enum ThresholdOperator {
  GT = "gt",
  LT = "lt",
  EQ = "eq",
  GTE = "gte",
  LTE = "lte",
}

export interface Threshold {
  operator: ThresholdOperator;
  value: number;
}