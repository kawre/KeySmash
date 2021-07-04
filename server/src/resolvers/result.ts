import { Result } from "../entities/Result";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { getConnection } from "typeorm";

@InputType()
class ScoreInput {
  @Field()
  wpm: number;

  @Field()
  accuracy: number;

  @Field()
  cpm: number;

  @Field()
  raw: number;

  @Field()
  time: number;
}

@Resolver(Result)
export class ResultResolver {
  @FieldResolver()
  user(@Root() result: Result) {
    return User.findOne(result.userId);
  }

  // query top results
  @Query(() => [Result])
  async topResults() {
    const results = await getConnection().query(`
      select * from result 
      order by wpm DESC
    `);

    return results;
  }

  // submit result
  @Mutation(() => Result)
  async submitResult(
    @Arg("options") options: ScoreInput,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    return Result.create({ ...options, userId }).save();
  }

  @Query(() => [Result])
  testHistory(
    @Arg("cursor", { nullable: true }) cursor: string,
    @Ctx() { req }: MyContext
  ) {
    const params: any[] = [req.session.userId];
    if (cursor) params.push(new Date(parseInt(cursor)));
    return getConnection().query(
      `
    select * from result
    where "userId" = $1
    ${cursor ? `and "createdAt" < $2` : ``}
    order by "createdAt" DESC
    limit 10
    `,
      params
    );
  }
}
