import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getUserPostsApi } from "../Services/authServices";
import SkeletonComponent from "./SkeletonComponent";
import ErrorMessage from "./ErrorMessage";
import Post from "./Post";
import { authContext } from "../Contexts/AuthContext";
import Loader from "./Loader";

export default function UserPosts() {
  const { userData } = useContext(authContext);
  console.log(userData);

  const { data, refetch, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["userPosts"],
    queryFn: () => getUserPostsApi(userData._id),
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
