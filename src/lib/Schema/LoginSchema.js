import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid"
    ),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      "Password is invalid"
    ),
});
