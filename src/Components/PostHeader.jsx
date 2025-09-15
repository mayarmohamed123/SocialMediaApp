import React from "react";
import {
  CardHeader,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostHeader({ post, userData, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <CardHeader className="flex items-center justify-between p-4 pb-2">
      <div
        onClick={() => navigate(`/post-details/${post._id}`)}
        className="flex items-center space-x-3 cursor-pointer">
        <Avatar
          src={post.user.photo}
          name={post.user.name}
          size="sm"
          className="ring-2 ring-primary/20"
        />
        <div>
          <p className="font-semibold text-[hsl(var(--foreground))]">
            @{post.user.name}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {userData?._id === post.user._id && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light" radius="full">
              <EllipsisVertical size={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="edit" onPress={onEdit}>
              ✏ Edit Post
            </DropdownItem>
            <DropdownItem
              key="delete"
              onPress={onDelete}
              className="text-destructive">
              🗑 Delete Post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </CardHeader>
  );
}
