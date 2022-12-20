import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
  compareEnum,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import AlertMessages from "@src/view/messages/AlertMessages";
import Session from "@src/model/Session";

const entranceController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  if (!isNumber(entry) && !compareEnum(entry, ButtonLabels.LONE_ENTRANCE))
    return getControllerResult(
      AlertMessages.chooseFromButtons,
      SessionStates.ENTERING_ENTRANCE,
      buttons.enterEntrance
    );
  await setOrderSession(getUserId(ctx), "entrance", entry);
  return getControllerResult(
    messages.getFloorLevel(),
    SessionStates.ENTERING_FLOOR_LEVEL,
    buttons.enterFloorButtons
  );
};

entranceController.type = ControllerTypes.STATE;
entranceController.occasion = SessionStates.ENTERING_ENTRANCE;

export default entranceController;
