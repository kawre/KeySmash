import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";

export const hasResults: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  const user = await User.findOne(req.session.userId);

  if (!user?.results) return null;

  return next();
};
