import React from "react";
import { Avatar, Input, Button } from "@heroui/react";

export default function PostCommentInput({
  post,
  inPostDetailsPage,
  userData,
  commentContent,
  setCommentContent,
  handleSubmitComment,
  isPending,
}) {
  if (!inPostDetailsPage) return null;

  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-muted/30">
      <Avatar
        src={userData?.photo}
        name={userData?.name}
        size="sm"
        className="ring-2 ring-primary/20"
      />

      <div className="flex-1 relative">
        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          variant="bordered"
          placeholder="Write your comment..."
          radius="lg"
          size="sm"
          className="w-full pr-12"
        />

        <Button
          isLoading={isPending}
          onPress={() =>
            handleSubmitComment({ commentContent, postId: post._id })
          }
          size="sm"
          radius="full"
          className="!absolute right-1 top-1/2 -translate-y-1/2 bg-[hsl(var(--primary))] text-white hover:opacity-90">
          Send
        </Button>
      </div>
    </div>
  );
}
