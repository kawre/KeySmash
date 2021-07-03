import { Field, Form, Formik } from "formik";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { MeDocument, useLoginMutation } from "../../generated/graphql";
import Button from "../Components/Button";
import TextField from "./TextField";
// Types -------------------------------------------------------------------------

// Component ---------------------------------------------------------------------
const LoginForm: React.FC = () => {
  const { user } = useAuth();
  const [login] = useLoginMutation();

  if (user) return <Redirect to="/" />;
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (input) =>
          await login({
            variables: { input },
            update: (cache, { data }) =>
              cache.writeQuery({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              }),
          })
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              placeholder="email"
              name="email"
              type="email"
              as={TextField}
            />
            <Field
              placeholder="password"
              name="password"
              type="password"
              as={TextField}
            />
            <Button disabled={isSubmitting} type="submit">
              Log In
            </Button>
            <small>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </small>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default LoginForm;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 500px;
    display: flex;
    flex-direction: column;
  }

  small {
    text-align: center;
    color: ${({ theme }) => theme.text};
    padding-top: 20px;
    margin: auto;
    width: fit-content;

    a {
      color: ${({ theme }) => theme.main};
    }
  }
`;
