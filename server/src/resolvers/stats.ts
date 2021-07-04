import { MyContext } from "../types";
import { fix } from "../utils/fix";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { Stats } from "../entities/Stats";
import { User } from "../entities/User";

@Resolver(Stats)
export class StatsResolver {
  @Query(() => Stats)
  stats(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    return Stats.findOne({ userId });
  }

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

    return fix(res.pop().count);
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

    return fix(res.pop().max);
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

    return fix(res.pop().avg);
  }

  @FieldResolver()
  async last10AverageWpm(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select avg(wpm)
      from (
        select wpm from result 
        where "userId" = $1
        order by "createdAt" DESC
        limit 10
      ) x
      `,

      [stats.userId]
    );

    return fix(res.pop().avg);
  }

  @FieldResolver()
  async highestRaw(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
    	select max(raw) from result
    	where "userId" = $1
    	limit 1
    	`,
      [stats.userId]
    );

    return fix(res.pop().max);
  }

  @FieldResolver()
  async averageRaw(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
    	select avg(raw) from result
    	where "userId" = $1
    	`,
      [stats.userId]
    );

    return fix(res.pop().avg);
  }

  @FieldResolver()
  async last10AverageRaw(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select avg(raw)
      from (
        select raw from result 
        where "userId" = $1
        order by "createdAt" DESC
        limit 10
      ) x
      `,

      [stats.userId]
    );

    return fix(res.pop().avg);
  }

  // accuracy
  @FieldResolver()
  async averageAcc(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
    	select avg(accuracy) from result
    	where "userId" = $1
    	`,
      [stats.userId]
    );

    return fix(res.pop().avg);
  }

  @FieldResolver()
  async last10AverageAcc(@Root() stats: Stats) {
    const res = await getConnection().query(
      `
      select avg(accuracy)
      from (
        select accuracy from result 
        where "userId" = $1
        order by "createdAt" DESC
        limit 10
      ) x
      `,

      [stats.userId]
    );

    return fix(res.pop().avg);
  }
}
