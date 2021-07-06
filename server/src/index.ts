import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Result } from "./entities/Result";
import { Stats } from "./entities/Stats";
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

  // await Stats.delete({});
  // await Result.delete({});
  // await User.delete({});

  // await Theme.create({
  //   name: "strawberry",
  //   background: "#f37f83",
  //   caret: "#fcfcf8",
  //   main: "#fcfcf8",
  //   sub: "#e53c58",
  //   text: "#fcfcf8",
  //   error: "#fcd23f",
  //   errorExtra: "#d7ae1e",
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
