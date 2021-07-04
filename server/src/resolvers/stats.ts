import { FieldResolver, Resolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { Stats } from "../entities/Stats";
import { User } from "../entities/User";

@Resolver(Stats)
export class StatsResolver {
  @FieldResolver()
  user(@Root() stats: Stats) {
    return User.findOne(stats.userId);
  }

  @FieldResolver()
  async timePlayed(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select SUM(time) from result
      where "userId" = $1
      `,
      [stats.userId]
    );

    const sum = res.pop().sum;
    return sum ? new Date(sum * 1000).toISOString().substr(11, 8) : "00:00:00";
  }

  @FieldResolver()
  async testsCompleted(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select count(*) from result
      where "userId" = $1
      `,
      [stats.userId]
    );

    const count = res.pop().count;
    return count ? count : 0;
  }

  @FieldResolver()
  async highestWpm(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
    	select max(wpm) from result
    	where "userId" = $1
    	limit 1
    	`,
      [stats.userId]
    );

    const max = res.pop().max;
    return max ? max : 0;
  }

  @FieldResolver()
  async averageWpm(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select AVG(wpm) from result
      where "userId" = $1
      `,
      [stats.userId]
    );

    const avg = res.pop().avg;
    return avg ? avg : 0;
  }

  @FieldResolver()
  async last10AverageWpm(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select AVG(wpm)
      from (
        select wpm from result 
        where "userId" = $1
        order by "createdAt" DESC
        limit $2
      ) x
      `,
      [stats.userId, 10]
    );

    const avg = res.pop().avg;
    return avg ? avg : 0;
  }
}
