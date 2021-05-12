import { Field, Form, Formik } from "formik";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { colors } from "../Global";
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";

// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
export const RegisterForm = () => {
  const { signup } = useAuth();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(data, { setSubmitting }) => {
          const createUser = async () => {
            setSubmitting(true);

            try {
              await signup(data.email, data.password, data.username);
            } catch {
              console.log("error");
            }

            setSubmitting(false);
          };

          return createUser();
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field placeholder="Username" name="username" as={TextField} />
            <Field placeholder="Email" name="email" as={TextField} />
            <Field placeholder="Password" name="password" as={TextField} />
            <SubmitButton disabled={isSubmitting}>Sign Up</SubmitButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

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
`;
