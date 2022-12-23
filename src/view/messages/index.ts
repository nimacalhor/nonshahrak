import buttonLabels from "@src/lib/constants/bot/button-labels";
import { TContext } from "@t/general-types";
import { getPersianDate, getTomorrowsDate } from "@helper/date-helper";
import { END_WORK_HOUR, START_WORK_HOUR } from "@src/lib/constants/bot/general";
import { User, UserDoc } from "@src/types/user";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import { BreadPrices } from "@src/lib/constants/general";
import { SessionDoc } from "@src/types/session";
import { OrderDoc } from "@src/types/order";
import { DailyOrderDoc } from "@src/types/dailyOrder";

const BOT_PROCESS_MESSAGE = "روند کاری بات";
const ORDER_BREAD = "سفارش نون 🍞";
const CHOOSE_ORDER_TYPE = "لطفا نوع سفارش را انتخاب کنید.";
const WEEKLY_ORDER_FOR = "سفارش هفتگی نون برای : \n";
const CHOOSE_BREAD_TYPE = "لطفا نون مورد نظر را انتخاب کنید.";
const ENTER_BREAD_AMOUNT = "لطفا تعداد نون را وارد کنید.";
const CHOOSE_WEEK_DAYS = `لطفا روز های هفته را انتخاب کنید.
نون شهرک هر هفته در روز های انتخاب شده نون را به شما میرساند.

از قسمت ${buttonLabels.MY_ORDERS} میتوانید سفارش هفتگی را تغییر دهید.`;
const ENTER_TIME = `لطفا تایم حدودی دریافت نون را وارد کنید.
( ساعت بین ${START_WORK_HOUR} تا ${END_WORK_HOUR} شب) 
ما سعی می‌کنیم راس تایم وارد شده سفارش شمارا انجام دهیم.

 مثال ورودی :
8
13:30
18:40
20`;
const ENTER_NAME = "لطفا نام خود را وارد کنید.";
const ENTER_PHONE = "لطفا شماره تماس خود را وارد کنید.";
const PROFILE_INFO = "مشخصات سفارش دهنده : \n \n";
const ADDRESS = "آدرس : \n \n";
const ENTER_BLOCK = "لطفا شماره بلوک خود را وارد کنید .";
const ENTER_ENTRANCE = "لطفا شماره ورودی بلوک را وارد کنید.";
const ENTER_FLOOR_LEVEL = "لطفا شماره طبقه خود را وارد کنید.";
const ENTER_UNIT = "لطفا شماره واحد خود را وارد کنید.";
const SELECTED = "انتخاب شد ✅ \n";
const DELETED = "حذف شد 🗑 \n";
const SELECTED_DAYS = "روز های انتخاب شده : \n";
const ENTER_NUMBER = "لطفا یک عدد انتخاب کنید.";
const ORDER_SUBMITTED = "سفارش شما ثبت شد ✅ \n";
const CLICK_FOR_PAYMENT = "برای پرداخت گزینه زیر را انتخاب کنید .";
const CHECK_MY_ORDERS_FOR_MORE = `شما می تواید از بخش ${buttonLabels.MY_ORDERS} سفارش های خود را مدیریت و پرداخت کنید .`;
const PURCHASE_SUCCESS = "پرداخت موفقیت آمیز بود .";
const PURCHASE_FAILED = "پرداخت ناموفق بود .";

class OrderMessages {
  private tomorrow: boolean = false;
  private month: string | undefined = undefined;
  private weekday: string | undefined = undefined;
  private day: string | undefined = undefined;
  private weekdays: string[] | undefined = undefined;

  get botProcessMessage() {
    return this.addBreak(BOT_PROCESS_MESSAGE);
  }
  get orderBread() {
    return this.addBreak(ORDER_BREAD + "\n\n" + CHOOSE_ORDER_TYPE);
  }

  constructor(
    private session: SessionDoc | null | undefined,
    tomorrow: boolean = false
  ) {
    this.tomorrow = tomorrow;

    if (!tomorrow && session?.order?.days) this.weekdays = session.order.days;

    if (!tomorrow) return;
    const { day, month, year, weekday } = getPersianDate(getTomorrowsDate());
    this.month = month;
    this.weekday = weekday;
    this.day = day;
  }

  private tomorrowBaseMessage() {
    return `سفارش نون برای فردا ${this.weekday}، ${this.day} ${this.month} ...\n\n`;
  }

  private weekdaysListMessage() {
    return `${this.weekdays ? this.weekdays.join(" - ") + "\n\n" : ""}`;
  }

  private addBreak(text: string) {
    return text + "\n\n";
  }

  private getOrderMessage(endText: string) {
    let result;
    if (this.tomorrow) {
      result = `${this.tomorrowBaseMessage()}${endText}`;
    } else {
      result = `${WEEKLY_ORDER_FOR}${this.weekdaysListMessage()}${endText}`;
    }
    return this.addBreak(result);
  }

  private getProfileMessage(endText: string) {
    return this.addBreak(`${PROFILE_INFO}${endText}`);
  }

  private getAddressMessage(endText: string) {
    return this.addBreak(`${ADDRESS}${endText}`);
  }

  chooseWeekdays() {
    return this.addBreak(CHOOSE_WEEK_DAYS);
  }

  daySelected() {
    return this.addBreak(
      `${SELECTED}${SELECTED_DAYS}${this.weekdaysListMessage()}`
    );
  }

  dayDeleted() {
    return this.addBreak(
      `${DELETED}${SELECTED_DAYS}${this.weekdaysListMessage()}`
    );
  }

  chooseBreadType() {
    return this.getOrderMessage(CHOOSE_BREAD_TYPE);
  }

  enterBreadAmount() {
    return this.getOrderMessage(ENTER_BREAD_AMOUNT);
  }

  enterNumber() {
    return this.addBreak(`${ENTER_NUMBER}`);
  }

  enterTime() {
    return this.getOrderMessage(ENTER_TIME);
  }

  enterName() {
    return this.getProfileMessage(ENTER_NAME);
  }

  enterPhone() {
    return this.getProfileMessage(ENTER_PHONE);
  }

  getBlock() {
    return this.getAddressMessage(ENTER_BLOCK);
  }

  getEntrance() {
    return this.getAddressMessage(ENTER_ENTRANCE);
  }

  getFloorLevel() {
    return this.getAddressMessage(ENTER_FLOOR_LEVEL);
  }

  getUnit() {
    return this.getAddressMessage(ENTER_UNIT);
  }

  orderSubmitted() {
    return this.getOrderMessage(
      `${ORDER_SUBMITTED}${
        this.tomorrow
          ? `\n ${CLICK_FOR_PAYMENT}`
          : `${CHECK_MY_ORDERS_FOR_MORE}`
      }`
    );
  }

  purchaseResult(success: boolean) {
    if (success) return `${PURCHASE_SUCCESS}`;
    else return `${PURCHASE_FAILED}`;
  }

  getProfileConfirmation(profileData: User) {
    const {
      name = "نا مشخص",
      phone = "نا مشخص",
      block = "نا مشخص",
      entrance = "نا مشخص",
      floor = "نا مشخض",
      unit = "نا مشخص",
    } = profileData;

    return this.addBreak(
      `تایید اطلاعات :
          
    نام : ${name}
    شماره تماس : ${phone} 
    
    بلوک : ${block}
    ورودی : ${entrance}
    طبقه : ${floor}
    واحد : ${unit}
    
    `
    );
  }

  getOrderConfirmation(userData?: User) {
    const defaultOrder = {
      type: "نا مشخص",
      breadType: "نا مشخص",
      amount: 1,
      time: "نا مشخص",
      name: "نا مشخص",
      phone: "نا مشخص",
      block: "نا مشخص",
      entrance: "نا مشخص",
      floor: "نا مشخض",
      unit: "نا مشخص",
    };
    const {
      type = "نا مشخص",
      breadType = "نا مشخص",
      amount = 1,
      time = "نا مشخص",
      name = "نا مشخص",
      phone = "نا مشخص",
      block = "نا مشخص",
      entrance = "نا مشخص",
      floor = "نا مشخض",
      unit = "نا مشخص",
    } = this.session?.order || defaultOrder;
    const data = {
      type,
      breadType,
      amount,
      time,
      name: userData ? userData.name : name,
      phone: userData ? userData.phone : phone,
      block: userData ? userData.block : block,
      entrance: userData ? userData.entrance : entrance,
      floor: userData ? userData.floor : floor,
      unit: userData ? userData.unit : unit,
      price: [ButtonLabels.BARBARI as string].includes(breadType)
        ? amount * BreadPrices.BARBARI
        : amount * BreadPrices.SANQAK,
    };

    return this.addBreak(
      `سفارش شما : 

    نوع سفارش : ${data.type}
    نوع نوع : ${data.breadType}
    تعداد نون : ${data.amount}
    زمان دریافت : ${data.time}
    قیمت : ${data.price}
    
    نام : ${data.name}
    شماره تماس : ${data.phone} 
    
    بلوک : ${data.block}
    ورودی : ${data.entrance}
    طبقه : ${data.floor}
    واحد : ${data.unit}
    
    `
    );
  }

  getOrderString(order: OrderDoc | DailyOrderDoc) {
    const { amount, breadType, dateString, time } = order;
    return `${amount} نون ${breadType} برای ${dateString}، ساعت ${time}.`;
  }
}

export default OrderMessages;
