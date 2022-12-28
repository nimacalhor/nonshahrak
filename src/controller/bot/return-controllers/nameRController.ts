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

import { SessionDoc } from "@src/types/session";
import User from "@src/model/User";

const nameRController: Controller = async function (ctx) {
const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  const session = (ctx.session) as SessionDoc;
  const user = await User.find().byUserId(session.userId);
  //
  if (session.enteringProfile && user) {
    //
    await setOrderSession(ctx, ctx.userId, "enteringProfile", false);

    const session = await setOrderSession(ctx, ctx.userId, "name", undefined);
    const messages = new OrderMessages(
      session,
      ctx.isTomorrow
    );

    return getControllerResult(
      messages.getProfileConfirmation(user),
      SessionStates.PROFILE_CONFIRMATION,
      buttons.profileConfirmButtons
    );
  }
  await setOrderSession(ctx, ctx.userId, ["name", "time"], undefined);
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

nameRController.type = ControllerTypes.RETURN;
nameRController.occasion = SessionStates.ENTERING_NAME;

export default nameRController;
