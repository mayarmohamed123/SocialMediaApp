import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 character long")
      .max(20, "Name must be at most 20 character long"),
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
    rePassword: zod.string().nonempty("RePassword is required"),
    dateOfBirth: zod.coerce.date().refine(
      (data) => {
        const birthYear = data.getFullYear();
        const now = new Date().getFullYear();
        const age = now - birthYear;
        return age >= 13;
      },
      { message: "Your age must be at least 13" }
    ),
    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Confirm your password with the same password not different",
    path: ["rePassword"],
  });
