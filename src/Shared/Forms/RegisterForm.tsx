import { Field, Form, Formik } from "formik";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import Button from "../Components/Button";
import { colors } from "../Global/Colors";
import TextField from "./TextField";

// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
export const RegisterForm = () => {
  const { user, signUp } = useAuth();
  console.log(user);

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
              placeholder="Username"
              name="username"
              type="username"
              as={TextField}
            />
            <Field
              placeholder="Password"
              name="password"
              type="password"
              as={TextField}
            />
            <Field
              placeholder="Email"
              name="email"
              type="email"
              as={TextField}
            />
            <Button type="submit" disabled={isSubmitting} />
            <small>
              Already have an account? <Link to="/login">Log In</Link>
            </small>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

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
    color: ${colors.text};
    padding-top: 15px;
    margin: auto;
    width: fit-content;
    border-top: 1px solid ${colors.border};

    a {
      color: ${colors.secondary};
    }
  }
`;
