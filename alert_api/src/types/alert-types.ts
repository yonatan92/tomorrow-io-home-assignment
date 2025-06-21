export type Threshold = {
  operator: "gt" | "lt" | "eq" | "gte" | "lte";
  value: number;
};

export type AlertStatus = "notTriggered" | "triggered";
