import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { LockIcon } from "../assets/Icons/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "../lib/Schema/UpdatePasswordSchema";
import { updatePasswordApi } from "../Services/authServices";
import { Link } from "react-router-dom";
import { showToast } from "../Components/ToastUtility";

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  async function handleUpdatePassword(formData) {
    try {
      setIsLoading(true);
      const data = await updatePasswordApi(formData);
      setIsLoading(false);

      if (data.error) {
        showToast({
          title: "Update Failed",
          description: data.error,
          type: "error",
        });
      } else {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        showToast({
          title: "Password Updated ✅",
          description: "Your password was updated successfully.",
          type: "success",
        });
        reset();
      }
    } catch (error) {
      setIsLoading(false);
      showToast({
        title: "Unexpected Error",
        description: "Something went wrong, please try again.",
        type: "error",
      });
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto text-center min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
        Enter your current password and choose a new one.
      </p>

      <div className="rounded-3xl shadow-pink-500/30 drop-shadow-xs max-w-lg m-auto">
        <form
          onSubmit={handleSubmit(handleUpdatePassword)}
          className="flex flex-col gap-4 card-cute">
          {/* Old Password */}
          <Input
            isInvalid={Boolean(errors.password?.message)}
            errorMessage={errors.password?.message}
            label="Old Password"
            labelPlacement="outside"
            placeholder="Enter your old password"
            startContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            type="password"
            {...register("password")}
          />

          {/* New Password */}
          <Input
            isInvalid={Boolean(errors.newPassword?.message)}
            errorMessage={errors.newPassword?.message}
            label="New Password"
            labelPlacement="outside"
            placeholder="Enter your new password"
            startContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            type="password"
            {...register("newPassword")}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="btn-cute text-white w-full">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
