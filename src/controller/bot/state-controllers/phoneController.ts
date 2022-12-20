import { getUserId, isPhone } from "./../../../lib/helper/bot/index";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";
import Session from "@src/model/Session";

const phoneController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  const phoneNumber = ctx.message?.contact?.phone_number;
  const finalResult = getControllerResult(
    messages.getBlock(),
    SessionStates.ENTERING_BLOCK,
    buttons.enterBlock
  );
  if (phoneNumber) {
    await setOrderSession(getUserId(ctx), "phone", phoneNumber);
    return finalResult;
  }
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_PHONE,
      buttons.enterPhoneButtons
    );
  if (!isPhone(entry))
    return getControllerResult(
      AlertMessages.phoneErr(entry),
      SessionStates.ENTERING_PHONE,
      buttons.enterPhoneButtons
    );
  await setOrderSession(getUserId(ctx), "phone", entry);
  return finalResult;
};

phoneController.type = ControllerTypes.STATE;
phoneController.occasion = SessionStates.ENTERING_PHONE;

export default phoneController;
