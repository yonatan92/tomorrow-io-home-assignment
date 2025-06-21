import type { StatusOption } from "../../types/types";

export const WEATHER_LABELS: Record<string, string> = {
  temperature: "Temperature",
  condition: "Condition",
  humidity: "Humidity",
  precipitationProbability: "Precipitation Probability",
  uvIndex: "UV Index",
  weatherCode: "Weather Code",
  windSpeed: "Wind Speed",
  location: "Location",
};

export const PAGE_TITLES = {
  home: "Weather",
  alerts: "Alerts",
};

export const OPERATOR_LABELS: Record<string, string> = {
  gt: ">",
  lt: "<",
  gte: "≥",
  lte: "≤",
  eq: "=",
  neq: "≠",
};

export const STATUS_LABELS: Record<StatusOption["value"], string> = {
  active: "Active",
  not_active: "Not Active",
  all: "All",
};

export const STATUS_OPTIONS: StatusOption[] = [
  { value: "all", label: STATUS_LABELS.all },
  { value: "active", label: STATUS_LABELS.active },
  { value: "not_active", label: STATUS_LABELS.not_active },
];

export const PARAMETERS = [
  { value: "temperature", label: "Temperature" },
  { value: "precipitationProbability", label: "Precipitation Probability" },
  { value: "windSpeed", label: "Wind Speed" },
  { value: "weatherCode", label: "Weather Code" },
  { value: "uvIndex", label: "UV Index" },
  { value: "humidity", label: "Humidity" },
];

export const OPERATORS = [
  { value: "gt", label: "Greater than" },
  { value: "lt", label: "Less than" },
  { value: "gte", label: "Greater than or equal" },
  { value: "lte", label: "Less than or equal" },
  { value: "eq", label: "Equal" },
  { value: "neq", label: "Not equal" },
];

export const CREATE_ALERT_LABELS = {
  title: "Create Alert",
  description: "Description:",
  city: "City:",
  parameter: "Parameter:",
  operator: "Operator:",
  threshold: "Threshold:",
  create: "Create",
  cancel: "Cancel",
  selectCity: "Select a city",
  success: "Alert created successfully!",
  close: "Close",
  errorPrefix: "Error:",
  pleaseSelectCity: "Please select a valid city.",
};
