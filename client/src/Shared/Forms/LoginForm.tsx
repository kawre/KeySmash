import { Field, Form, Formik } from "formik";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { useData } from "../../Contexts/DataContext";
import Button from "../Components/Button";
import TextField from "./TextField";
// Types -------------------------------------------------------------------------

// Component ---------------------------------------------------------------------
const LoginForm: React.FC = () => {
  const { user, logIn } = useAuth();

  if (user !== null) return <Redirect to="/" />;
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(data, { setSubmitting }) => {
          const loginHandler = async () => {
            setSubmitting(true);

            try {
              await logIn(data.email, data.password);
            } catch {
              console.log("Invalid data");
            }

            setSubmitting(false);
          };

          loginHandler();
        }}
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
