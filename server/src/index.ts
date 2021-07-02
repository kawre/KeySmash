import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import { COOKIE_NAME, PORT } from "./utils/constants";
import { Theme } from "./entities/Theme";

const main = async () => {
  await createConnection();

  // await Theme.delete({});

  const app = express();

  const themes = await Theme.find();
  console.log(themes);

  // await Theme.insert({
  //   background: "#2d394d",
  //   caret: "#ff7a90",
  //   error: "#ee2a3a",
  //   errorExtra: "#f04040",
  //   main: "#ff7a90",
  //   name: "bento",
  //   sub: "#4a768d",
  //   text: "#fffaf8",
  // });

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
      resolvers: [UserResolver],
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
