import React from "react";
import { Button } from "@heroui/react";
import PostComment from "./Comment";

export default function PostComments({
  post,
  commentsLimit,
  visibleComments,
  loadMoreComments,
  isLoading,
}) {
  const comments =
    Array.isArray(post.comments) && post.comments.length > 0
      ? post.comments.filter((c) => c && c._id)
      : [];

  if (comments.length === 0) return null;

  return (
    <div className="px-4 pb-4">
      <div className="text-sm font-medium text-[hsl(var(--foreground))]">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </div>

      {comments.slice(0, commentsLimit ?? visibleComments).map((comment) => (
        <PostComment key={comment._id} comment={comment} />
      ))}

      {comments.length >= visibleComments && !commentsLimit && (
        <Button
          isLoading={isLoading}
          onPress={loadMoreComments}
          className="mt-3 mx-auto block"
          variant="flat"
          color="secondary"
          size="sm">
          Load more comments
        </Button>
      )}
    </div>
  );
}
