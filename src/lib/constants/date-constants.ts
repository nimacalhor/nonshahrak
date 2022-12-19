export const PERSIAN_WEEKDAYS = [
  "_",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];
export const INDEXED_PERSIAN_WEEKDAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشبه",
  "پنجشنبه",
  "جمعه",
];
export const DELETE_PERSIAN_WEEKDAYS = PERSIAN_WEEKDAYS.filter(
  (d) => d !== "_"
).map((d) => `حذف ${d}`);
export const PERSIAN_WEEKDAYS_AS_CONST = [
  "_",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
] as const;
export const WEEKDAYS = [
  "_",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
