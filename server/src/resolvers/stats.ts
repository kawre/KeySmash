import { Stats } from "../entities/Stats";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { Result } from "../entities/Result";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import moment from "moment";

@Resolver(Stats)
export class StatsResolver {
  @FieldResolver()
  user(@Root() stats: Stats) {
    return User.findOne(stats.userId);
  }

  @FieldResolver()
  async timePlayed(@Root() stats: Stats) {
    const results = await Result.find({ userId: stats.userId });
    if (results.length === 0) return 0;

    let sum = 0;
    results.forEach((r) => {
      sum = sum + r.time;
    });

    const elo = moment(sum);
    console.log(elo);

    return sum;
  }

  @FieldResolver()
  async testsCompleted(@Root() stats: Stats) {
    const results = await Result.find({ userId: stats.userId });
    return results.length;
  }

  @FieldResolver()
  async highestWpm(@Root() stats: Stats) {
    const res: any[] = await getConnection().query(
      `
			select * from result
			where "userId" = $1 and
			wpm = (select max(wpm) from result)
			limit 1
			`,
      [stats.userId]
    );

    return res ? res.pop().wpm : 0;
  }

  @FieldResolver()
  async averageWpm(@Root() stats: Stats) {
    const results = await Result.find({ userId: stats.userId });

    const avr: number[] = [];
    let sum = 0;
    results.forEach((r) => {
      avr.push(r.wpm);
      sum = sum + r.wpm;
    });

    return Math.floor(sum / avr.length);
  }
}
