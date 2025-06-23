import { PhoneNumber } from "./../../node_modules/twilio/lib/interfaces.d";
import { IAlert } from "../models/alert";
import { sendSmsOnAlert } from "../providers/notification-sms-provider";

export const sendNotification = (alert: IAlert) => {
  const { parameter, threshold, location, phoneNumber } = alert;
  const { operator, value } = threshold;
  const { name } = location;
  const message = createAlertMessage(parameter, name, operator, value);
  if (phoneNumber) sendSmsOnAlert(message, phoneNumber);
};

export const createAlertMessage = (
  parameter: string,
  city: string,
  operator: string,
  threshold: string | number
): string => {
  return `Alert - the ${parameter} in ${city} is ${operator} ${threshold}`;
};
