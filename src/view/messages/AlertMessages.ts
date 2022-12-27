import cnst from "@src/lib/constants/bot";
import ButtonLabels from "@src/lib/constants/bot/button-labels";

const CHOOSE_FROM_BUTTONS = "لطفا یکی از دکمه های زیر را انتخاب کنید.";
const TIME_PERIOD_ERR = `لطفا ساعتی بین ${cnst.START_WORK_HOUR} و ${cnst.END_WORK_HOUR} انتخاب کنید .`;
const SELECT_DAY = "لطفا چند روز از هفته را انتخاب کنید.";
const LONG_ENTRY = "لطفا متنی کوتاه تر وارد کنید.";
const PHONE_LENGTH_ERR = "شماره تماس کوتاه و یا بلند است.";
const PHONE_INVALID = "شماره تماس صحیح نمی باشد.";
const ENTER_NUMBER = "لطفا یک عدد وارد کنید.";
const PAYMENT_REQ_FAILED = "پرداخت شما ناموفق بود 😢 لطفا دوباره امتحان کنید";
const TIME_INPUT_FORMAT_ERR = `فرمت ورودی صحیح نمی باشد ⚠`;
const NO_SUBMITTED_ORDER = "شما هیچ سفارش ثبت شده ای ندارید ❕";
const NO_DAILY_ORDER = "شما سفارش هفتگی ای ثبت نکرده اید";
const ORDER_HAS_BEEN_PURCHASED = "این سفارش قبلا پرداخت شده .";
const ORDERS_HAS_BEEN_PURCHASED = "این سفارش ها قبلا پرداخت شده اند .";
const NO_ENTRY = "هیچ ورودی ای یافت نشد .";
const NO_USER_ID_FOUND = "userId شما پیدا نشد .";
const SM_WENT_WRONG = "something went wrong";
const TOMORROW_ORDER_EXISTS = "از قبل سفارشی برای فردا دارید !";
const DAILY_ORDER_EXISTS = "از قبل سفارش هفتگی دارید .";
const NEW_ORDER_INFO = "با ثبت سفارش ، سفارش جدید جایگذین قبلی می شود";
class AlertMessages {
  readonly chooseFromButtons = CHOOSE_FROM_BUTTONS;
  readonly timePeriodErr = TIME_PERIOD_ERR;
  readonly noDaySelected = SELECT_DAY;
  readonly longEntry = LONG_ENTRY;
  readonly enterNumber = ENTER_NUMBER;
  readonly paymentReqErr = PAYMENT_REQ_FAILED;
  readonly timeFormatError = TIME_INPUT_FORMAT_ERR;
  readonly noSubmittedOrder = NO_SUBMITTED_ORDER;
  readonly noDailyOrder = NO_DAILY_ORDER;
  readonly noEntry = NO_ENTRY;
  readonly noUserIdFound = NO_USER_ID_FOUND;
  readonly somethingWentWrong = SM_WENT_WRONG;

  phoneErr(entry: string) {
    if (entry.startsWith("09")) return PHONE_INVALID;
    else return PHONE_LENGTH_ERR;
  }
  orderHasBeenPurchased = (weekly?: boolean) =>
    weekly ? ORDERS_HAS_BEEN_PURCHASED : ORDER_HAS_BEEN_PURCHASED;
  addStart = (text: string) => `${text}\n\n/start`;
  orderExists = (isTomorrow?: boolean) =>
    `${
      isTomorrow ? TOMORROW_ORDER_EXISTS : DAILY_ORDER_EXISTS
    } \n ${NEW_ORDER_INFO}`;
}

export default new AlertMessages();
