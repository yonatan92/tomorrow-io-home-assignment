export class ErrorCodes {
  static get INVALID_INPUT(): string {
    return "INVALID_INPUT";
  }
  static get WEATHER_API_ERROR_GET_WEATHER_DATA(): string {
    return "WEATHER_API_ERROR_GET_WEATHER_DATA";
  }
  static get ALERT_NOT_FOUND(): string {
    return "ALERT_NOT_FOUND";
  }
  static get ALERT_CREATE_FAILED(): string {
    return "ALERT_CREATE_FAILED";
  }
  static get ALERT_UPDATE_FAILED(): string {
    return "ALERT_UPDATE_FAILED";
  }
  static get ALERT_DELETE_FAILED(): string {
    return "ALERT_DELETE_FAILED";
  }
  static get ALERT_RETRIEVE_FAILED(): string {
    return "ALERT_RETRIEVE_FAILED";
  }
}