import { addToast } from "@heroui/react";

export function showToast({ title, description = "", type = "success" }) {
  const isSuccess = type === "success";

  addToast({
    title: title || (isSuccess ? "Success 🎉" : "Error ❌"),
    description,
    timeout: 3000,
    shouldShowTimeoutProgress: true,
    classNames: {
      base: `
        rounded-xl shadow-lg backdrop-blur-md px-4 py-3
        ${
          isSuccess
            ? "bg-green-700/80 text-green-50 border border-green-500 dark:bg-green-800/90 dark:border-green-400 dark:text-green-100"
            : "bg-red-700/80 text-red-50 border border-red-500 dark:bg-red-800/90 dark:border-red-400 dark:text-red-100"
        }
      `,
      title: "font-semibold text-lg",
      description: "text-sm opacity-90",
      closeButton: "hover:scale-110 transition-transform",
    },
  });
}
