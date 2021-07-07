import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  submitResult: Result;
  changeTheme?: Maybe<Theme>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
};

export type MutationSubmitResultArgs = {
  options: ScoreInput;
};

export type MutationChangeThemeArgs = {
  name: Scalars["String"];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: "Query";
  randomQuote: Quote;
  topResults: Array<Result>;
  testHistory: Array<Result>;
  stats: Stats;
  themes: Array<Theme>;
  me?: Maybe<User>;
};

export type QueryTestHistoryArgs = {
  cursor?: Maybe<Scalars["String"]>;
};

export type Quote = {
  __typename?: "Quote";
  id: Scalars["Float"];
  quote: Scalars["String"];
};

export type RegisterInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Result = {
  __typename?: "Result";
  id: Scalars["Float"];
  quote: Scalars["String"];
  wpm: Scalars["String"];
  accuracy: Scalars["String"];
  cpm: Scalars["String"];
  raw: Scalars["String"];
  correct: Scalars["Float"];
  incorrect: Scalars["Float"];
  extra: Scalars["Float"];
  missed: Scalars["Float"];
  characters: Scalars["Float"];
  errors: Scalars["Float"];
  time: Scalars["Float"];
  user: User;
  createdAt: Scalars["String"];
};

export type ScoreInput = {
  wpm: Scalars["String"];
  quote: Scalars["String"];
  accuracy: Scalars["String"];
  cpm: Scalars["String"];
  raw: Scalars["String"];
  correct: Scalars["Float"];
  incorrect: Scalars["Float"];
  extra: Scalars["Float"];
  missed: Scalars["Float"];
  characters: Scalars["Float"];
  errors: Scalars["Float"];
  time: Scalars["Float"];
};

export type Stats = {
  __typename?: "Stats";
  id: Scalars["Float"];
  timePlayed: Scalars["String"];
  testsCompleted: Scalars["Float"];
  highestWpm: Scalars["String"];
  averageWpm: Scalars["String"];
  last10AverageWpm: Scalars["String"];
  highestRaw: Scalars["String"];
  averageRaw: Scalars["String"];
  last10AverageRaw: Scalars["String"];
  averageAcc: Scalars["String"];
  last10AverageAcc: Scalars["String"];
  personalBests: Array<Result>;
  user: User;
};

export type Theme = {
  __typename?: "Theme";
  name: Scalars["String"];
  background: Scalars["String"];
  caret: Scalars["String"];
  main: Scalars["String"];
  sub: Scalars["String"];
  text: Scalars["String"];
  error: Scalars["String"];
  errorExtra: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  username: Scalars["String"];
  theme: Scalars["String"];
  email: Scalars["String"];
  results: Array<Result>;
  stats: Stats;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type RegularResultFragment = { __typename?: "Result" } & Pick<
  Result,
  | "wpm"
  | "raw"
  | "accuracy"
  | "time"
  | "cpm"
  | "correct"
  | "incorrect"
  | "extra"
  | "missed"
  | "characters"
  | "errors"
  | "createdAt"
>;

export type RegularThemeFragment = { __typename?: "Theme" } & Pick<
  Theme,
  | "name"
  | "background"
  | "caret"
  | "main"
  | "sub"
  | "text"
  | "error"
  | "errorExtra"
>;

export type RegularUserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email" | "theme" | "createdAt"
>;

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type ChangeThemeMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type ChangeThemeMutation = { __typename?: "Mutation" } & {
  changeTheme?: Maybe<{ __typename?: "Theme" } & RegularThemeFragment>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type SubmitResultMutationVariables = Exact<{
  options: ScoreInput;
}>;

export type SubmitResultMutation = { __typename?: "Mutation" } & {
  submitResult: { __typename?: "Result" } & Pick<
    Result,
    "quote" | "wpm" | "accuracy" | "cpm" | "raw" | "time"
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type RandomQuoteQueryVariables = Exact<{ [key: string]: never }>;

export type RandomQuoteQuery = { __typename?: "Query" } & {
  randomQuote: { __typename?: "Quote" } & Pick<Quote, "id" | "quote">;
};

export type StatsQueryVariables = Exact<{ [key: string]: never }>;

export type StatsQuery = { __typename?: "Query" } & {
  stats: { __typename?: "Stats" } & Pick<
    Stats,
    | "timePlayed"
    | "testsCompleted"
    | "highestWpm"
    | "averageWpm"
    | "last10AverageWpm"
    | "highestRaw"
    | "averageRaw"
    | "last10AverageRaw"
    | "averageAcc"
    | "last10AverageAcc"
  > & {
      personalBests: Array<{ __typename?: "Result" } & RegularResultFragment>;
    };
};

export type TestHistoryQueryVariables = Exact<{
  cursor?: Maybe<Scalars["String"]>;
}>;

export type TestHistoryQuery = { __typename?: "Query" } & {
  testHistory: Array<{ __typename?: "Result" } & RegularResultFragment>;
};

export type ThemesQueryVariables = Exact<{ [key: string]: never }>;

export type ThemesQuery = { __typename?: "Query" } & {
  themes: Array<{ __typename?: "Theme" } & RegularThemeFragment>;
};

export const RegularResultFragmentDoc = gql`
  fragment RegularResult on Result {
    wpm
    raw
    accuracy
    time
    cpm
    correct
    incorrect
    extra
    missed
    characters
    errors
    createdAt
  }
`;
export const RegularThemeFragmentDoc = gql`
  fragment RegularTheme on Theme {
    name
    background
    caret
    main
    sub
    text
    error
    errorExtra
  }
`;
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
    email
    theme
    createdAt
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const ChangeThemeDocument = gql`
  mutation ChangeTheme($name: String!) {
    changeTheme(name: $name) {
      ...RegularTheme
    }
  }
  ${RegularThemeFragmentDoc}
`;
export type ChangeThemeMutationFn = Apollo.MutationFunction<
  ChangeThemeMutation,
  ChangeThemeMutationVariables
>;

/**
 * __useChangeThemeMutation__
 *
 * To run a mutation, you first call `useChangeThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeThemeMutation, { data, loading, error }] = useChangeThemeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useChangeThemeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeThemeMutation,
    ChangeThemeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangeThemeMutation, ChangeThemeMutationVariables>(
    ChangeThemeDocument,
    options
  );
}
export type ChangeThemeMutationHookResult = ReturnType<
  typeof useChangeThemeMutation
>;
export type ChangeThemeMutationResult =
  Apollo.MutationResult<ChangeThemeMutation>;
export type ChangeThemeMutationOptions = Apollo.BaseMutationOptions<
  ChangeThemeMutation,
  ChangeThemeMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const SubmitResultDocument = gql`
  mutation SubmitResult($options: ScoreInput!) {
    submitResult(options: $options) {
      quote
      wpm
      accuracy
      cpm
      raw
      time
    }
  }
`;
export type SubmitResultMutationFn = Apollo.MutationFunction<
  SubmitResultMutation,
  SubmitResultMutationVariables
>;

/**
 * __useSubmitResultMutation__
 *
 * To run a mutation, you first call `useSubmitResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitResultMutation, { data, loading, error }] = useSubmitResultMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSubmitResultMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitResultMutation,
    SubmitResultMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SubmitResultMutation,
    SubmitResultMutationVariables
  >(SubmitResultDocument, options);
}
export type SubmitResultMutationHookResult = ReturnType<
  typeof useSubmitResultMutation
>;
export type SubmitResultMutationResult =
  Apollo.MutationResult<SubmitResultMutation>;
export type SubmitResultMutationOptions = Apollo.BaseMutationOptions<
  SubmitResultMutation,
  SubmitResultMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RandomQuoteDocument = gql`
  query RandomQuote {
    randomQuote {
      id
      quote
    }
  }
`;

/**
 * __useRandomQuoteQuery__
 *
 * To run a query within a React component, call `useRandomQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomQuoteQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomQuoteQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RandomQuoteQuery,
    RandomQuoteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RandomQuoteQuery, RandomQuoteQueryVariables>(
    RandomQuoteDocument,
    options
  );
}
export function useRandomQuoteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RandomQuoteQuery,
    RandomQuoteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RandomQuoteQuery, RandomQuoteQueryVariables>(
    RandomQuoteDocument,
    options
  );
}
export type RandomQuoteQueryHookResult = ReturnType<typeof useRandomQuoteQuery>;
export type RandomQuoteLazyQueryHookResult = ReturnType<
  typeof useRandomQuoteLazyQuery
>;
export type RandomQuoteQueryResult = Apollo.QueryResult<
  RandomQuoteQuery,
  RandomQuoteQueryVariables
>;
export const StatsDocument = gql`
  query Stats {
    stats {
      timePlayed
      testsCompleted
      highestWpm
      averageWpm
      last10AverageWpm
      highestRaw
      averageRaw
      last10AverageRaw
      averageAcc
      last10AverageAcc
      personalBests {
        ...RegularResult
      }
    }
  }
  ${RegularResultFragmentDoc}
`;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StatsQuery, StatsQueryVariables>(
    StatsDocument,
    options
  );
}
export function useStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(
    StatsDocument,
    options
  );
}
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsQueryResult = Apollo.QueryResult<
  StatsQuery,
  StatsQueryVariables
>;
export const TestHistoryDocument = gql`
  query TestHistory($cursor: String) {
    testHistory(cursor: $cursor) {
      ...RegularResult
    }
  }
  ${RegularResultFragmentDoc}
`;

/**
 * __useTestHistoryQuery__
 *
 * To run a query within a React component, call `useTestHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestHistoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useTestHistoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestHistoryQuery,
    TestHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TestHistoryQuery, TestHistoryQueryVariables>(
    TestHistoryDocument,
    options
  );
}
export function useTestHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestHistoryQuery,
    TestHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TestHistoryQuery, TestHistoryQueryVariables>(
    TestHistoryDocument,
    options
  );
}
export type TestHistoryQueryHookResult = ReturnType<typeof useTestHistoryQuery>;
export type TestHistoryLazyQueryHookResult = ReturnType<
  typeof useTestHistoryLazyQuery
>;
export type TestHistoryQueryResult = Apollo.QueryResult<
  TestHistoryQuery,
  TestHistoryQueryVariables
>;
export const ThemesDocument = gql`
  query Themes {
    themes {
      ...RegularTheme
    }
  }
  ${RegularThemeFragmentDoc}
`;

/**
 * __useThemesQuery__
 *
 * To run a query within a React component, call `useThemesQuery` and pass it any options that fit your needs.
 * When your component renders, `useThemesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThemesQuery({
 *   variables: {
 *   },
 * });
 */
export function useThemesQuery(
  baseOptions?: Apollo.QueryHookOptions<ThemesQuery, ThemesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ThemesQuery, ThemesQueryVariables>(
    ThemesDocument,
    options
  );
}
export function useThemesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ThemesQuery, ThemesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ThemesQuery, ThemesQueryVariables>(
    ThemesDocument,
    options
  );
}
export type ThemesQueryHookResult = ReturnType<typeof useThemesQuery>;
export type ThemesLazyQueryHookResult = ReturnType<typeof useThemesLazyQuery>;
export type ThemesQueryResult = Apollo.QueryResult<
  ThemesQuery,
  ThemesQueryVariables
>;
