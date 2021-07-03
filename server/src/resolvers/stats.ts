import { Stats } from "../entities/Stats";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { Result } from "../entities/Result";
import { User } from "../entities/User";

@Resolver(Stats)
export class StatsResolver {
  @FieldResolver()
  user(@Root() stats: Stats) {
    return User.findOne(stats.userId);
  }

  @FieldResolver()
  async timePlayed(@Root() stats: Stats) {
    const results = await Result.find({ userId: stats.userId });
    let sum = 0;
    results.forEach((r) => {
      sum = sum + r.time;
    });
    console.log(sum);
    return sum;
  }
}
