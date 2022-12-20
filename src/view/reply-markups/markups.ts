import { TContext } from "@t/general-types";
import buttonLabels from "@src/lib/constants/bot/button-labels";
import { PERSIAN_WEEKDAYS } from "@constants/date-constants";
import {
  KeyboardButton,
  ReplyKeyboardMarkup,
} from "telegraf/typings/telegram-types";
import { ReplyMarkup } from "@src/types/controller";

export const mainButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [
    [
      {
        text: buttonLabels.MY_ORDERS,
      },
      {
        text: buttonLabels.ORDER_BREAD,
      },
    ],
  ],
};

export const returnButton: KeyboardButton = {
  text: buttonLabels.RETURN,
};

const getButtonWeekdayText = (num: number, days: string[]) =>
  `${days.includes(PERSIAN_WEEKDAYS[num]) ? "حذف" : ""} ${
    PERSIAN_WEEKDAYS[num]
  }`;

export const chooseWeekdaysButtons = (days: string[]): ReplyMarkup => ({
  resize_keyboard: true,
  selective: true,
  keyboard: [
    [
      { text: getButtonWeekdayText(2, days) },
      { text: getButtonWeekdayText(1, days) },
      { text: getButtonWeekdayText(7, days) },
    ],
    [
      { text: getButtonWeekdayText(5, days) },
      { text: getButtonWeekdayText(4, days) },
      { text: getButtonWeekdayText(3, days) },
    ],
    [{ text: getButtonWeekdayText(6, days) }],
    [returnButton, { text: buttonLabels.CONFIRM }],
  ],
});

export const orderTypeButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [
    [
      {
        text: buttonLabels.ORDER_TYPE_DAILY,
      },
      {
        text: buttonLabels.ORDER_TYPE_TOMORROW,
      },
    ],
    [returnButton],
  ],
};

export const breadTypeButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [
    [
      {
        text: buttonLabels.BARBARI,
      },
      {
        text: buttonLabels.SANAQAK,
      },
    ],
    [returnButton],
  ],
};

export const onlyReturnButton: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [[returnButton]],
};

export const profileConfirmButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [
    [
      {
        text: buttonLabels.CONTINUE_WITH_THIS_INFO,
      },
      {
        text: buttonLabels.ENTER_PROFILE,
      },
    ],
    [returnButton],
  ],
};

export const breadAmountButtons = onlyReturnButton;
export const enterTimeButtons = onlyReturnButton;
export const enterNameButtons = onlyReturnButton;

export const enterPhoneButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [
    [{ text: buttonLabels.MY_NUMBER, request_contact: true }],
    [returnButton],
  ],
};

export const enterBlock = onlyReturnButton;
export const enterEntrance: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [[{ text: buttonLabels.LONE_ENTRANCE }], [returnButton]],
};
export const enterPlaqueButtons = onlyReturnButton;
export const enterFloorButtons = onlyReturnButton;
export const enterUnitButtons = onlyReturnButton;

export const confirmOrderButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [
    [{ text: buttonLabels.CANCEL_ORDER }, { text: buttonLabels.CONFIRM }],
    [returnButton],
  ],
};

export const paymentLink = (url: string): ReplyMarkup => ({
  resize_keyboard: true,
  inline_keyboard: [
    [
      {
        text: buttonLabels.PAY,
        url,
      },
    ],
  ],
});
export const paymentButtons: ReplyMarkup = {
  resize_keyboard: true,
  keyboard: [[{ text: buttonLabels.DONE }]],
};
