import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";

// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
export const RegisterForm = () => {
  const { signup } = useAuth();
  return (
    <div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          const createUser = async () => {
            setSubmitting(true);

            try {
              await signup(data.email, data.password);
              resetForm();
            } catch {
              console.log("error");
            }

            setSubmitting(false);
          };

          createUser();
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {/* <Field name="username" as={TextField} /> */}
            <Field name="email" as={TextField} />
            <Field name="password" as={TextField} />
            <SubmitButton disabled={isSubmitting}>Sign Up</SubmitButton>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
