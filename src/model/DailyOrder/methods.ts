import { PERSIAN_WEEKDAYS } from "@src/lib/constants/date-constants";
import { getNextDate } from "@src/lib/helper/date-helper";
import { DailyOrderDoc } from "@src/types/dailyOrder";

export const getDates = function (this: DailyOrderDoc) {
  const dates = [...this.days].map(getNextDate);
  return dates;
};
