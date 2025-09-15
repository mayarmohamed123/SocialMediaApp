import React from "react";

export default function PostImage({ image }) {
  return (
    <div className="relative w-full px-4">
      <img
        src={image}
        alt="Post content"
        className="
          w-full
          h-auto
          max-h-[600px]         
          object-contain
          rounded-lg
        "
        loading="lazy"
      />
    </div>
  );
}
