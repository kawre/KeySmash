import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  Operation,
} from "@urql/core";

const error = errorExchange({
  onError: (error: CombinedError, operation: Operation) => {
    console.log("An error!", error);
    // if (error.message.includes("user not authenticated"))
  },
});

// const cache = cacheExchange({});

export const client = createClient({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, error, fetchExchange],
});
