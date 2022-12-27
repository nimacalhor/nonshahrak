import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";

import Keywords from "@src/lib/constants/bot/keywords";
import DailyOrder from "@src/model/DailyOrder";
import AlertMessages from "@src/view/messages/AlertMessages";

const myDailyOrdersController: Controller = async function (ctx) {
  ctx.reply("⏳ ...");
  const userId = ctx.userId;
  const messages = new OrderMessages(null);

  const dailyOrder = await DailyOrder.find().byUserId(userId);
  if (!dailyOrder)
    return getControllerResult(
      AlertMessages.noDailyOrder,
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );
  const dates = dailyOrder.getDates();
  return getControllerResult(
    messages.getOrderString(dailyOrder),
    SessionStates.UNDEFINED,
    buttons.dailyOrderButtons(dates)
  );
};

myDailyOrdersController.type = ControllerTypes.KEYWORD;
myDailyOrdersController.occasion = Keywords.MY_DAILY_ORDERS;

export default myDailyOrdersController;
