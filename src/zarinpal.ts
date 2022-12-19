import ZarinPal from "zarinpal-checkout";
import Order from "./model/Order";

const cardNumber = process.env.CARD_NUMBER as string;
const sandBox = process.env.NODE_ENV === "development";
const callbackUrl = sandBox
  ? (process.env.CALLBACK_URL_DEV as string)
  : (process.env.CALLBACK_URL_PRO as string);
const email = process.env.EMAIL as string;
const mobile = process.env.MOBILE as string;

const payment = ZarinPal.create(cardNumber, sandBox);

export const paymentRequest = async function (price: number) {
  try {
    const response = await payment.PaymentRequest({
      Amount: price,
      CallbackURL: callbackUrl,
      Description: "پرداخت سفارش از نونشهرک",
      Email: email,
      Mobile: mobile,
    });
    if (response.status === 100) return response;
    console.log({ response });
    return false;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const verifyPayment = async function (
  Amount: number,
  Authority: string
) {
  try {
    const { RefID, status } = await payment.PaymentVerification({
      Amount,
      Authority,
    });
    if (status === -21) return false;
    return parseInt(RefID + "");
  } catch (error) {
    return false;
  }
};
