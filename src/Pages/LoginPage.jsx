import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import { LockIcon, MailIcon } from "../assets/Icons/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../Services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../lib/Schema/LoginSchema";
import { authContext } from "../Contexts/AuthContext";
import { Heart } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function handleRegister(formData) {
    setIsLoading(true);
    const data = await loginApi(formData);
    setIsLoading(false);

    if (data.error) {
      setErrorMsg(data.error);
    } else {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      queryClient.removeQueries(["posts"]);
      console.log("login", isLoggedIn);
      const pathName = location.pathname;
      navigate(pathName == "/login" ? "/" : pathName);
    }
    console.log(data);
    console.log("login", isLoggedIn);
  }
  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen">
      {/* Cute Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-float">🤳</div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Welcome Back!
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Sign in to your SocialSphere account
        </p>
      </div>

      <div className="rounded-3xl shadow-pink-500/30 drop-shadow-xs max-w-lg m-auto">
        <form onSubmit={handleSubmit(handleRegister)} className="card-cute">
          <div className="flex flex-col gap-4">
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
            <div className="flex justify-center">
              <Button
                isLoading={isLoading}
                type="submit"
                className="btn-cute text-white w-full flex items-center justify-center space-x-2">
                <Heart size={18} />
                <span>Sign In</span>
              </Button>
            </div>
            {errorMsg && (
              <p className="text-sm text-red-500 text-center mt-0">
                {errorMsg}
              </p>
            )}
            <div className="flex justify-center items-center space-x-4">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                OR
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                New to SocialSphere?{" "}
                <Link
                  to="/register"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-glow))] transition-colors duration-200 font-medium hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
