import { PERSIAN_WEEKDAYS } from "../constants/date-constants";

const getTomorrowsDate = () => {
  const [todaysDate, tomorrowsDate] = [new Date(), new Date()];
  tomorrowsDate.setDate(todaysDate.getDate() + 1);
  return tomorrowsDate;
};
const getPersianDate = (date: Date) => {
  const [day, month, year] = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
    .format(date)
    .split(" ");
  const weekday = PERSIAN_WEEKDAYS[date.getDay() + 1];
  return { day: day.replace(/^۰/g, ""), weekday, month, year };
};

export const getNextDate = function (day: number) {
  const date = new Date();
  const now = date.getDay();
  let diff = day - now;
  diff = diff < 1 ? 7 + diff : diff;

  const nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff;

  return new Date(nextDayTimestamp);
};

export const getDateMessage = function (date: Date) {
  const { day, weekday, month } = getPersianDate(date);
  return `${weekday} ${day}ام ${month}`;
};
export { getTomorrowsDate, getPersianDate };
