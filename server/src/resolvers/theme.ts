import { Theme } from "../entities/Theme";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import { getConnection } from "typeorm";

@Resolver(Theme)
export class ThemeResolver {
  @Query(() => [Theme])
  themes() {
    return getConnection().query(`
    select * from theme
    order by background desc
    `);
  }

  @Mutation(() => Theme, { nullable: true })
  async changeTheme(@Arg("name") theme: string, @Ctx() { req }: MyContext) {
    const { userId } = req.session;

    if (!userId) return null;

    await User.update(userId, { theme });
    return Theme.findOne({ name: theme });
  }
}
