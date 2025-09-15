import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 shadow-sm flex items-start gap-3 mt-4">
      <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />

      <div className="flex-1">
        <h2 className="font-semibold text-lg">Oops! Something went wrong</h2>
        <p className="text-sm mt-1">
          {message || "An unexpected error occurred."}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition-colors duration-200">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
