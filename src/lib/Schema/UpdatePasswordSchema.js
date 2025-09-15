import * as zod from "zod";

export const updatePasswordSchema = zod
  .object({
    password: zod
      .string()
      .nonempty("Old password is required")
      .regex(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
        "Old password is invalid"
      ),

    newPassword: zod
      .string()
      .nonempty("New password is required")
      .regex(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
        "New password is invalid"
      ),
  })
  // Ensure new password is not the same as old password
  .refine((data) => data.password !== data.newPassword, {
    message: "New password cannot be the same as the old password",
    path: ["newPassword"],
  });
