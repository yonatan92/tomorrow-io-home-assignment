import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const client = twilio(accountSid, authToken);

export const sendSmsOnAlert = async (
  alertMessage: string,
  toPhoneNumber: string
) => {
  try {
    console.log({ alertMessage, toPhoneNumber });
    const message = await client.messages.create({
      body: alertMessage,
      from: "+14789996081",
      to: toPhoneNumber,
    });
    console.log("SMS sent:", message.sid);
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
};
