import React from "react";
import { CardFooter } from "@heroui/react";
import { HeartIcon, CommentIcon } from "../assets/Icons/icons";
import { Bookmark, Share2 } from "lucide-react";

export default function PostActions({ post, navigate }) {
  return (
    <CardFooter className="flex justify-between items-center px-4 py-2">
      <div className="flex items-center space-x-4">
        <button className="transition-all duration-200 hover:scale-110 text-[hsl(var(--muted-foreground))] hover:text-destructive">
          <HeartIcon />
        </button>
        <button
          onClick={() => navigate(`/post-details/${post._id}`)}
          className="transition-all duration-200 hover:scale-110 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          <CommentIcon />
        </button>
        <button className="transition-all duration-200 hover:scale-110 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          <Share2 size={20} />
        </button>
      </div>

      <button className="transition-all duration-200 hover:scale-110 text-[hsl(var(--muted-foreground))] hover:text-primary">
        <Bookmark size={20} />
      </button>
    </CardFooter>
  );
}
