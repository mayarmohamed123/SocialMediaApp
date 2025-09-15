import React, { useContext, useState } from "react";
import { Input, Button, Avatar } from "@heroui/react";
import { useForm } from "react-hook-form";
import { getUserDataApi, updatePhotoApi } from "../Services/authServices";
import { addToast } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

export default function ChangePhotoPage() {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useContext(authContext);
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm();

  async function handleUpdatePhoto(formData) {
    try {
      setIsLoading(true);
      const photoData = new FormData();
      photoData.append("photo", formData.photo[0]);

      const data = await updatePhotoApi(photoData);
      setIsLoading(false);

      if (data.error) {
        addToast({
          title: "❌ Failed to update photo",
          description: data.error,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      } else {
        addToast({
          title: "✅ Photo updated successfully",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        reset();
        setPreview(null);

        const response = await getUserDataApi();
        setUserData(response.user);
        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      addToast({
        title: "❌ Something went wrong",
        description: "Please try again later.",
        timeout: 3000,
      });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="w-full max-w-md mx-auto text-center min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Change Profile Photo</h1>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
        Upload a new profile picture and save your changes.
      </p>

      <div className="card-cute p-6">
        <form
          onSubmit={handleSubmit(handleUpdatePhoto)}
          className="flex flex-col gap-6 items-center">
          {/* Preview Avatar */}
          <Avatar
            src={preview}
            className="h-24 w-24 ring-4 ring-primary/30 shadow-glow">
            {!preview && (
              <span className="bg-gradient-soft text-[hsl(var(--primary-foreground))] text-xl font-bold">
                ?
              </span>
            )}
          </Avatar>

          {/* File Input */}
          <Input
            type="file"
            accept="image/*"
            {...register("photo")}
            onChange={handleFileChange}
            className="input-cute"
          />

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="btn-cute text-white w-full">
            Upload Photo
          </Button>
        </form>
      </div>
    </div>
  );
}
