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
import { checkTextLength } from "@src/lib/helper";
import { MAX_NAME_LENGTH } from "@src/lib/constants/bot/general";
import AlertMessages from "@src/view/messages/AlertMessages";
import Session from "@src/model/Session";

const nameController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  if (!checkTextLength(entry, MAX_NAME_LENGTH))
    return getControllerResult(
      AlertMessages.longEntry,
      SessionStates.ENTERING_NAME,
      buttons.enterNameButtons
    );
  await setOrderSession(getUserId(ctx), "name", entry.trim());
  return getControllerResult(
    messages.enterPhone(),
    SessionStates.ENTERING_PHONE,
    buttons.enterPhoneButtons
  );
};

nameController.type = ControllerTypes.STATE;
nameController.occasion = SessionStates.ENTERING_NAME;

export default nameController;
