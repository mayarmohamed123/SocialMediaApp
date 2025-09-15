import React, { useState, useRef } from "react";
import { setPostApi } from "../Services/postServices";
import { Button } from "@heroui/react";
import { Camera, ImageIcon, Upload, X, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showToast } from "./ToastUtility";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function handlePost() {
    if (!text && !image) {
      showToast({
        type: "error",
        title: "⚠️ Warning",
        description: "You must add text or an image!",
      });
      return;
    }

    setIsPosting(true);
    const formData = new FormData();
    if (text) formData.append("body", text);
    if (image) formData.append("image", image);

    try {
      await setPostApi(formData);

      // ✅ use showToast for success
      showToast({
        type: "success",
        title: "✅ Post added successfully",
        description: "Your post has been shared with your friends!",
      });

      handleCancel();
    } catch (error) {
      console.error("Error posting:", error);

      // ✅ use showToast for error
      showToast({
        type: "error",
        title: "❌ Failed to share",
        description: "Something went wrong. Please try again!",
      });
    } finally {
      setIsPosting(false);
    }
  }

  const handleCancel = () => {
    setText("");
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>

          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Create Post
          </h1>

          <div className="w-20"></div>
        </div>

        {/* Image Upload */}
        <div className="card-cute space-y-4">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 rounded-full">
                <X size={16} />
              </Button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center cursor-pointer hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/20 transition-all duration-300 animate-fade-in">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-[hsl(var(--primary))]/10">
                    <Upload size={32} className="text-[hsl(var(--primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                    Add a photo
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    Share your cutest fluffy moments!
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <Camera size={16} />
                      <span>Camera</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <ImageIcon size={16} />
                      <span>Gallery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {!preview && (
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="btn-soft w-full flex items-center justify-center space-x-2">
              <Camera size={18} />
              <span>Select Photo</span>
            </Button>
          )}
        </div>

        {/* Caption */}
        <div className="card-cute space-y-3 mt-6">
          <textarea
            placeholder="Write something fluffy... 🐾"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-cute min-h-[120px] resize-none w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={2200}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Share your story, add hashtags, mention friends!
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              {text.length}/2200
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="sticky bottom-4 mt-6">
          <Button
            onClick={handlePost}
            disabled={isPosting || (!preview && !text.trim())}
            className="btn-cute w-full flex items-center justify-center space-x-2 shadow-lg">
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
                <span>Sharing...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Share Post</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
