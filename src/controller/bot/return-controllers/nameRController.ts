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
import Session from "@src/model/Session";
import { SessionDoc } from "@src/types/session";
import User from "@src/model/User";

const nameRController: Controller = async function (ctx) {
  const messages = new OrderMessages(
    await Session.find().byCtx(ctx),
    await isOrderTypeTomorrow(getUserId(ctx))
  );
  const session = (await Session.find().byCtx(ctx)) as SessionDoc;
  const user = await User.find().byUserId(session.userId);
  //
  if (session.enteringProfile && user) {
    //
    await setOrderSession(getUserId(ctx), "enteringProfile", false);

    const session = await setOrderSession(getUserId(ctx), "name", undefined);
    const messages = new OrderMessages(
      session,
      await isOrderTypeTomorrow(getUserId(ctx))
    );

    return getControllerResult(
      messages.getProfileConfirmation(user),
      SessionStates.PROFILE_CONFIRMATION,
      buttons.profileConfirmButtons
    );
  }
  await setOrderSession(getUserId(ctx), ["name", "time"], undefined);
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

nameRController.type = ControllerTypes.RETURN;
nameRController.occasion = SessionStates.ENTERING_NAME;

export default nameRController;
