import { Field, Form, Formik } from "formik";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import Button from "../Components/Button";
import TextField from "./TextField";

// Component ---------------------------------------------------------------------
const RegisterForm: React.FC = () => {
  const { user, signUp } = useAuth();

  if (user !== null) return <Redirect to="/" />;
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(data, { setSubmitting }) => {
          const createUser = async () => {
            setSubmitting(true);

            try {
              await signUp(data.email, data.password, data.username);
            } catch {
              console.log("error");
            }

            setSubmitting(false);
          };

          createUser();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              placeholder="username"
              name="username"
              type="username"
              as={TextField}
            />
            <Field
              placeholder="password"
              name="password"
              type="password"
              as={TextField}
            />
            <Field
              placeholder="email"
              name="email"
              type="email"
              as={TextField}
            />
            <Button type="submit" disabled={isSubmitting}>
              Sign In
            </Button>
            <small>
              Already have an account? <Link to="/login">Log In</Link>
            </small>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default RegisterForm;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;

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
    color: ${(props) => props.theme.text};
    padding-top: 20px;
    margin: auto;
    width: fit-content;

    a {
      color: ${(props) => props.theme.main};
    }
  }
`;
