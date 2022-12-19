import { getPersianDate } from "@src/lib/helper/date-helper";
import { Order } from "@src/types/order";

export const dateString = {
  get: function (this: Order) {
    const { day, month, weekday } = getPersianDate(this.date);
    return `${weekday}، ${day.replace(/^0/, "")}ام ${month}`;
  },
};
