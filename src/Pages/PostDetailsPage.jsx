import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePostApi } from "../Services/postServices";
import Post from "../Components/Post";
import SkeletonComponent from "../Components/SkeletonComponent";

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function getSinglePost() {
    const response = await getSinglePostApi(id);
    console.log(response);
    if (response.message === "success") {
      setPost(response.post);
    }
  }

  useEffect(() => {
    getSinglePost();
  }, []);
  return (
    <div className="min-h-screen mt-5">
      {post ? <Post post={post} postDetails={true} /> : <SkeletonComponent />}
    </div>
  );
}
