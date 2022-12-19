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
const ORDER_EXISTS = `شما از قبل سفارش TYPE دارید.
سفارش جدید جایگزین سفارش قبلی شما میشود.
از بخش ${ButtonLabels.MY_ORDERS} میتوانید سفارشات خود را مشاهده کنید.`;
const TIME_INPUT_FORMAT_ERR = `فرمت ورودی صحیح نمی باشد ⚠`;

class AlertMessages {
  readonly chooseFromButtons = CHOOSE_FROM_BUTTONS;
  readonly timePeriodErr = TIME_PERIOD_ERR;
  readonly noDaySelected = SELECT_DAY;
  readonly longEntry = LONG_ENTRY;
  readonly enterNumber = ENTER_NUMBER;
  phoneErr(entry: string) {
    if (entry.startsWith("09")) return PHONE_INVALID;
    else return PHONE_LENGTH_ERR;
  }
  readonly paymentReqErr = PAYMENT_REQ_FAILED;
  orderExists(
    type: ButtonLabels.ORDER_TYPE_DAILY | ButtonLabels.ORDER_TYPE_TOMORROW
  ) {
    return ORDER_EXISTS.replace("TYPE", type);
  }
  readonly timeFormatError = TIME_INPUT_FORMAT_ERR;
}

export default new AlertMessages();
