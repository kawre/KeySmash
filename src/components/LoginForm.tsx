import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { colors } from "../Global";
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const LoginForm = () => {
  const { login } = useAuth();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(data, { setSubmitting }) => {
          const loginHandler = async () => {
            setSubmitting(true);

            try {
              await login(data.email, data.password);
            } catch {
              console.log("error something went wrong");
            }

            setSubmitting(false);
          };

          loginHandler();
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field
              placeholder="Email"
              name="email"
              type="email"
              as={TextField}
            />
            <Field
              placeholder="Password"
              name="password"
              type="password"
              as={TextField}
            />
            <SubmitButton disabled={isSubmitting}>Log In</SubmitButton>
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
  background: ${colors.body};
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
