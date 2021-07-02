type Field = "email" | "password" | "username" | "text";

export const fieldError = (field: Field, message: string) => {
  return {
    errors: [{ field, message }],
  };
};
