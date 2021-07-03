import { Theme } from "../entities/Theme";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";

@Resolver(Theme)
export class ThemeResolver {
  @Query(() => [Theme])
  themes() {
    return Theme.find();
  }

  @Mutation(() => Theme, { nullable: true })
  async changeTheme(@Arg("name") theme: string, @Ctx() { req }: MyContext) {
    const { userId } = req.session;

    if (!userId) return null;

    await User.update(userId, { theme });
    return Theme.findOne({ name: theme });
  }
}
