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


export { getTomorrowsDate, getPersianDate };
