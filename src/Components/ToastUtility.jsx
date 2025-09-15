// src/components/ToastUtils.js
import { addToast } from "@heroui/react";

export function showToast({ title, description = "", type = "success" }) {
  const isSuccess = type === "success";

  addToast({
    title: title || (isSuccess ? "Success 🎉" : "Error ❌"),
    description,
    timeout: 3000,
    shouldShowTimeoutProgress: true,
    classNames: {
      base: isSuccess
        ? "bg-green-100 border border-green-400 text-green-800"
        : "bg-red-100 border border-red-400 text-red-800",
    },
  });
}
