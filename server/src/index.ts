import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Result } from "./entities/Result";
import { QuoteResolver } from "./resolvers/quote";
import { ResultResolver } from "./resolvers/result";
import { StatsResolver } from "./resolvers/stats";
import { ThemeResolver } from "./resolvers/theme";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, PORT } from "./utils/constants";

const main = async () => {
  await (await createConnection()).runMigrations();
  // await Result.delete({});

  const app = express();

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
