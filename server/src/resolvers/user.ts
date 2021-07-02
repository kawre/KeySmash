import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput, RegisterInput, UserResponse } from "../utils/GraphqlTypes";
import { MyContext } from "src/types";
import argon2 from "argon2";
import { validateRegister } from "src/utils/validateRegister";
import { fieldError } from "src/utils/fieldError";
import { COOKIE_NAME } from "src/utils/constants";

@Resolver(User)
export class UserResolver {
  // get user
  @Query(() => User)
  async me(@Ctx() { req }: MyContext) {
    return User.findOne(req.session.userId);
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
