import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { UserIcon, LockIcon, MailIcon } from "../assets/Icons/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../lib/Schema/RegisterSchema";
import { registerApi } from "../Services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function handleRegister(formData) {
    setIsLoading(true);
    const data = await registerApi(formData);
    setIsLoading(false);

    if (data.error) {
      setErrorMsg(data.error);
    } else {
      setSucessMsg(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    console.log(data);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-bounce">🌟</div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Join SocialSphere!
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Create your account and start sharing
        </p>
      </div>

      <div className="rounded-3xl shadow-pink-500/30 drop-shadow-xs max-w-lg m-auto">
        <form onSubmit={handleSubmit(handleRegister)} className="card-cute">
          <div className="flex flex-col gap-4">
            <Input
              isInvalid={Boolean(errors.name?.message)}
              errorMessage={errors.name?.message}
              label="Name"
              labelPlacement="outside"
              placeholder="Your name"
              startContent={
                <UserIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
              type="text"
              {...register("name")}
            />
            <Input
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={errors.email?.message}
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
              type="email"
              {...register("email")}
            />
            <Input
              isInvalid={Boolean(errors.password?.message)}
              errorMessage={errors.password?.message}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              startContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
              type="password"
              {...register("password")}
            />

            <Input
              isInvalid={Boolean(errors.rePassword?.message)}
              errorMessage={errors.rePassword?.message}
              label="Re-enter Password"
              labelPlacement="outside"
              placeholder="Re-enter your password"
              startContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
              type="password"
              {...register("rePassword")}
            />
            <Input
              isInvalid={Boolean(errors.dateOfBirth?.message)}
              errorMessage={errors.dateOfBirth?.message}
              label="Date of Birth"
              labelPlacement="outside"
              placeholder="Select your birth date"
              type="date"
              {...register("dateOfBirth")}
            />
            <Select
              isInvalid={Boolean(errors.gender?.message)}
              errorMessage={errors.gender?.message}
              label="Gender"
              labelPlacement="outside"
              placeholder="Select your gender"
              {...register("gender")}>
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>
            </Select>
            <div className="flex justify-center">
              <Button
                isLoading={isLoading}
                type="submit"
                className="btn-cute text-white w-full flex items-center justify-center space-x-2 ">
                <Heart size={18} />
                <span>Create Account</span>
              </Button>
              {errorMsg && (
                <p className="text-sm text-red-500 text-center mt-0">
                  {errorMsg}
                </p>
              )}
            </div>
            {sucessMsg && (
              <p className="text-sm text-center text-green-500 mt-0">
                {sucessMsg}
              </p>
            )}
            <div className="flex justify-center items-center space-x-4">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                OR
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-glow))] transition-colors duration-200 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
