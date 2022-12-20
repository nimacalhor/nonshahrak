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
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import AlertMessages from "@src/view/messages/AlertMessages";
import User from "@src/model/User";
import { User as TUser } from "@t/user";
import Session from "@src/model/Session";

const profileConfirmController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(
    await Session.find().byCtx(ctx),
    await isOrderTypeTomorrow(getUserId(ctx))
  );
  if (
    !compareEnum(
      entry,
      ButtonLabels.CONTINUE_WITH_THIS_INFO,
      ButtonLabels.ENTER_PROFILE
    )
  )
    return getControllerResult(
      AlertMessages.chooseFromButtons,
      SessionStates.PROFILE_CONFIRMATION,
      buttons.profileConfirmButtons
    );
  const userId = getUserId(ctx);
  const user = (await User.find().byUserId(userId)) as TUser;

  if (compareEnum(entry, ButtonLabels.CONTINUE_WITH_THIS_INFO))
    return getControllerResult(
      messages.getOrderConfirmation(user),
      SessionStates.ORDER_CONFIRMATION,
      buttons.confirmOrderButtons
    );

  await setOrderSession(getUserId(ctx), "enteringProfile", true);

  return getControllerResult(
    messages.enterName(),
    SessionStates.ENTERING_NAME,
    buttons.enterNameButtons
  );
};

profileConfirmController.type = ControllerTypes.STATE;
profileConfirmController.occasion = SessionStates.PROFILE_CONFIRMATION;

export default profileConfirmController;
