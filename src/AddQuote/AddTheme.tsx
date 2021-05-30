import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import Button from "../Shared/Components/Button";
import TextField from "../Shared/Forms/TextField";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AddTheme: React.FC<Props> = () => {
  const { addTheme } = useData();
  return (
    <Wrapper>
      <Formik
        initialValues={{
          theme: "",
          background: "",
          main: "",
          caret: "",
          sub: "",
          text: "",
          error: "",
          errorExtra: "",
        }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await addTheme(data);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field placeholder="theme" name="theme" as={TextField} />
            <Field placeholder="background" name="background" as={TextField} />
            <Field placeholder="main" name="main" as={TextField} />
            <Field placeholder="caret" name="caret" as={TextField} />
            <Field placeholder="sub" name="sub" as={TextField} />
            <Field placeholder="text" name="text" as={TextField} />
            <Field placeholder="error" name="error" as={TextField} />
            <Field placeholder="errorExtra" name="errorExtra" as={TextField} />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default AddTheme;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 950px;
  margin: auto;
  padding-top: 200px;

  form {
    display: flex;
    flex-direction: column;
  }
`;
