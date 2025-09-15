import { Card, Skeleton, Avatar } from "@heroui/react";
import React from "react";

export default function SkeletonComponent() {
  return (
    <Card className="w-full max-w-md sm:max-w-2xl mx-auto rounded-xl shadow-sm bg-white dark:bg-gray-800 mb-5 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="rounded-full">
            <Avatar className="w-8 h-8" />
          </Skeleton>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-16 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Post image */}
      <Skeleton className="rounded-lg">
        <div className="aspect-square w-full bg-default-300 rounded-lg" />
      </Skeleton>

      {/* Body text */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Comments count */}
      <Skeleton className="h-3 w-20 rounded-lg" />

      {/* Comment input */}
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full">
          <Avatar className="w-8 h-8" />
        </Skeleton>
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </Card>
  );
}
