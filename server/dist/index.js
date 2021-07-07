"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Quote_1 = require("./entities/Quote");
const quote_1 = require("./resolvers/quote");
const result_1 = require("./resolvers/result");
const stats_1 = require("./resolvers/stats");
const theme_1 = require("./resolvers/theme");
const user_1 = require("./resolvers/user");
const constants_1 = require("./utils/constants");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (yield typeorm_1.createConnection()).runMigrations();
    const app = express_1.default();
    yield Quote_1.Quote.insert({
        quote: `Wilkinson County was a recipient of one of the new "separate but equal" schools built throughout the South as a result of the 1954 Supreme Court decision. It had been under construction on a fifty-two-acre plot in Woodville for almost a year, when I graduated in 1959.`,
    });
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({ origin: "http://localhost:3000", credentials: true }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        },
        saveUninitialized: false,
        secret: "top_secret_kekw",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                user_1.UserResolver,
                theme_1.ThemeResolver,
                quote_1.QuoteResolver,
                result_1.ResultResolver,
                stats_1.StatsResolver,
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
    app.listen(constants_1.PORT, () => console.log(`server up and running on http://localhost:${constants_1.PORT}/graphql`));
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map