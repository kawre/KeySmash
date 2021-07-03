import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeTheme?: Maybe<Theme>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationChangeThemeArgs = {
  name: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  randomQuote: Quote;
  themes: Array<Theme>;
  me?: Maybe<User>;
};

export type Quote = {
  __typename?: 'Quote';
  quote: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Theme = {
  __typename?: 'Theme';
  name: Scalars['String'];
  background: Scalars['String'];
  caret: Scalars['String'];
  main: Scalars['String'];
  sub: Scalars['String'];
  text: Scalars['String'];
  error: Scalars['String'];
  errorExtra: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  theme: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularThemeFragment = (
  { __typename?: 'Theme' }
  & Pick<Theme, 'name' | 'background' | 'caret' | 'main' | 'sub' | 'text' | 'error' | 'errorExtra'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'theme' | 'createdAt'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangeThemeMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type ChangeThemeMutation = (
  { __typename?: 'Mutation' }
  & { changeTheme?: Maybe<(
    { __typename?: 'Theme' }
    & RegularThemeFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type RandomQuoteQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomQuoteQuery = (
  { __typename?: 'Query' }
  & { randomQuote: (
    { __typename?: 'Quote' }
    & Pick<Quote, 'quote'>
  ) }
);

export type ThemesQueryVariables = Exact<{ [key: string]: never; }>;


export type ThemesQuery = (
  { __typename?: 'Query' }
  & { themes: Array<(
    { __typename?: 'Theme' }
    & RegularThemeFragment
  )> }
);

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
${RegularUserFragmentDoc}`;
export const ChangeThemeDocument = gql`
    mutation ChangeTheme($name: String!) {
  changeTheme(name: $name) {
    ...RegularTheme
  }
}
    ${RegularThemeFragmentDoc}`;

export function useChangeThemeMutation() {
  return Urql.useMutation<ChangeThemeMutation, ChangeThemeMutationVariables>(ChangeThemeDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const RandomQuoteDocument = gql`
    query RandomQuote {
  randomQuote {
    quote
  }
}
    `;

export function useRandomQuoteQuery(options: Omit<Urql.UseQueryArgs<RandomQuoteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RandomQuoteQuery>({ query: RandomQuoteDocument, ...options });
};
export const ThemesDocument = gql`
    query Themes {
  themes {
    ...RegularTheme
  }
}
    ${RegularThemeFragmentDoc}`;

export function useThemesQuery(options: Omit<Urql.UseQueryArgs<ThemesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ThemesQuery>({ query: ThemesDocument, ...options });
};