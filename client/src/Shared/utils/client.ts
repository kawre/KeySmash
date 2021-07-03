import { ApolloClient, InMemoryCache } from "@apollo/client";
import { cacheExchange } from "@urql/exchange-graphcache";
import { CombinedError, errorExchange, Operation } from "urql";

const error = errorExchange({
  onError: (error: CombinedError, operation: Operation) => {
    console.log("An error!", error);
    // if (error.message.includes("user not authenticated"))
  },
});

const cache = cacheExchange({
  keys: {
    Theme: () => null,
    Quote: () => null,
  },
  updates: {
    Mutation: {
      changeTheme: (result, _args, _cache, _info) => {
        const theme = result.changeTheme;
        localStorage.setItem("theme", JSON.stringify(theme));
      },
    },
  },
});

// export const client = createClient({
//   url: "http://localhost:5000/graphql",
//   fetchOptions: {
//     credentials: "include",
//   },
//   exchanges: [dedupExchange, cache, error, fetchExchange],
// });

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});
