import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import Session from "@src/model/Session";

const myOrdersController: Controller = async function (ctx) {
  const session = await Session.find().byCtx(ctx);
  const userId = getUserId(ctx);
  const messages = new OrderMessages(
    session,
    await isOrderTypeTomorrow(userId)
  );
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

myOrdersController.type = ControllerTypes.RETURN;
myOrdersController.occasion = SessionStates.WATCHING_ORDERS;

export default myOrdersController;
