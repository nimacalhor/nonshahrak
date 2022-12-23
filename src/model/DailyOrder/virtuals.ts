import {
  INDEXED_PERSIAN_WEEKDAYS,
  PERSIAN_WEEKDAYS,
} from "@src/lib/constants/date-constants";
import { DailyOrderDoc } from "@src/types/dailyOrder";

export const dateStringVirtual = {
  get: function (this: DailyOrderDoc) {
    const daysString = this.days.map(
      (d) => PERSIAN_WEEKDAYS.filter((d) => d !== "_")[d]
    );
    return daysString.join(" ، ").replace(/،$/gm, "و") + " ها";
  },
};
