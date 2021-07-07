import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Quote } from "./entities/Quote";
import { Result } from "./entities/Result";
import { Stats } from "./entities/Stats";
import { Theme } from "./entities/Theme";
import { User } from "./entities/User";
import { QuoteResolver } from "./resolvers/quote";
import { ResultResolver } from "./resolvers/result";
import { StatsResolver } from "./resolvers/stats";
import { ThemeResolver } from "./resolvers/theme";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, PORT } from "./utils/constants";

const main = async () => {
  await (await createConnection()).runMigrations();

  const app = express();

  // await Quote.delete({});
  // await Quote.insert({
  //   quote: `Wilkinson County was a recipient of one of the new "separate but equal" schools built throughout the South as a result of the 1954 Supreme Court decision. It had been under construction on a fifty-two-acre plot in Woodville for almost a year, when I graduated in 1959.`,
  // });
  // await Stats.delete({});
  // await Result.delete({});
  // await User.delete({});

  // await Theme.create({
  //   name: "modern dolch",
  //   background: "#2d2e30",
  //   caret: "#7eddd3",
  //   main: "#7eddd3",
  //   sub: "#54585c",
  //   text: "#e3e6eb",
  //   error: "#d36a7b",
  //   errorExtra: "#994154",
  // }).save();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
      saveUninitialized: false,
      secret: "top_secret_kekw",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ThemeResolver,
        QuoteResolver,
        ResultResolver,
        StatsResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () =>
    console.log(`server up and running on http://localhost:${PORT}/graphql`)
  );
};

main().catch((err) => console.log(err));
