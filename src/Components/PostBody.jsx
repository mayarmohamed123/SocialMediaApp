import React from "react";
import { CardBody } from "@heroui/react";

export default function PostBody({ post }) {
  return (
    <CardBody className="px-4 py-3">
      <p className="text-sm text-[hsl(var(--foreground))]">{post.body}</p>
    </CardBody>
  );
}
