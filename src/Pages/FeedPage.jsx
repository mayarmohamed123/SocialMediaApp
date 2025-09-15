// import React, { useEffect, useState } from "react";
import { postsApi } from "../Services/postServices";
import Post from "../Components/Post";
import SkeletonComponent from "../Components/SkeletonComponent";
import CreatePost from "../Components/CreatePost";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import ErrorMessage from "../Components/ErrorMessage";

export default function FeedPage() {
  const { data, refetch, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: postsApi,
    enabled: !!localStorage.getItem("token"),
  });

  return (
    <div className="p-4">
      {isFetching && !isLoading && <Loader />}
      {isLoading ? (
        <SkeletonComponent />
      ) : isError && !isFetching ? (
        <ErrorMessage message={error.message} onRetry={refetch} />
      ) : (
        data?.data.posts.map((post) => (
          <Post
            className="mb-4"
            callBack={refetch}
            key={post._id}
            post={post}
            commentsLimit={1}
            postDetails={false}
          />
        ))
      )}
    </div>
  );
}
