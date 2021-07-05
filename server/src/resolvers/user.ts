import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { LoginInput, RegisterInput, UserResponse } from "../utils/GraphqlTypes";
import { MyContext } from "src/types";
import argon2 from "argon2";
import { validateRegister } from "../utils/validateRegister";
import { fieldError } from "../utils/fieldError";
import { COOKIE_NAME } from "../utils/constants";
import { Result } from "../entities/Result";
import { Stats } from "../entities/Stats";

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  stats(@Root() user: User) {
    return Stats.findOne({ userId: user.id });
  }

  @FieldResolver()
  results(@Root() user: User) {
    return Result.find({ userId: user.id });
  }

  // get user
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    const { userId } = req.session;

    if (!userId) return null;

    return User.findOne(userId);
  }

  // register
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { username, email } = input;

    // validate input
    const error = validateRegister(input);
    if (error) return error;

    // hash password
    const password = await argon2.hash(input.password);

    // create user
    let user;
    try {
      user = await User.create({ username, email, password }).save();
      await Stats.create({ userId: user.id }).save();
      req.session.userId = user.id;
    } catch (err) {
      if (err.code === "23505")
        return fieldError("username", "username already taken");
    }

    return { user };
  }

  // login
  @Mutation(() => UserResponse)
  async login(@Arg("input") input: LoginInput, @Ctx() { req }: MyContext) {
    const { email, password } = input;

    const user = await User.findOne({ email });

    if (!user) return fieldError("email", "Incorrect email or password");

    const valid = await argon2.verify(user.password, password);
    if (!valid) return fieldError("email", "Incorrect email or password");

    req.session.userId = user.id;

    return { user };
  }

  // logout
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);

        if (err) resolve(false);
        else resolve(true);
      });
    });
  }
}
