import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import { checkTextLength } from "@src/lib/helper";
import { MAX_NAME_LENGTH } from "@src/lib/constants/bot/general";
import AlertMessages from "@src/view/messages/AlertMessages";

const nameController: Controller = function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  if (!checkTextLength(entry, MAX_NAME_LENGTH))
    return getControllerResult(
      AlertMessages.longEntry,
      SessionStates.ENTERING_NAME,
      buttons.enterNameButtons
    );
  setOrderSession(ctx, "name", entry.trim());
  return getControllerResult(
    messages.enterPhone(),
    SessionStates.ENTERING_PHONE,
    buttons.enterPhoneButtons
  );
};

nameController.type = ControllerTypes.STATE;
nameController.occasion = SessionStates.ENTERING_NAME;

export default nameController;
