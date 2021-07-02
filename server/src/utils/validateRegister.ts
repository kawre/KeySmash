import { RegisterInput } from "../utils/GraphqlTypes";
import { fieldError } from "./fieldError";

export const validateRegister = (options: RegisterInput) => {
  const { username, email, password } = options;

  // email
  if (!email.includes("@")) return fieldError("email", "invalid email");

  // password
  if (password.length <= 2) return fieldError("password", "password to short");
  if (username.length > 64) return fieldError("username", "password to long");

  // username
  if (username.length <= 2) return fieldError("username", "username to short");
  if (username.length > 10) return fieldError("username", "username to long");

  return null;
};
