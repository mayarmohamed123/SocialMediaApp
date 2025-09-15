import React, { useState, useContext } from "react";
import { Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { client } from "../App";
import { authContext } from "../Contexts/AuthContext";
import { showToast } from "./ToastUtility";
import { deletePostApi, updatePostApi } from "../Services/postServices";
import { addComment } from "../Services/commentsServices";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostBody from "./PostBody";
import PostEditModal from "./PostEditModel";
import PostActions from "./PostAction";
import PostCommentInput from "./PostCommentInput";
import PostComments from "./PostComments";

export default function Post({ post, commentsLimit, callBack, postDetails }) {
  const navigate = useNavigate();
  const { userData } = useContext(authContext);

  const [visibleComments, setVisibleComments] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState(post.body);
  const [editImage, setEditImage] = useState(null);

  const { mutate: handleSubmitComment, isPending } = useMutation({
    mutationFn: ({ commentContent, postId }) =>
      addComment(commentContent, postId),
    onSuccess: () => {
      setCommentContent("");
      window.location.reload();
    },
  });

  async function handleDeletePost() {
    const response = await deletePostApi(post._id);
    if (response.message == "success") {
      showToast({ type: "success", title: "Post deleted ✅" });
      callBack();
    } else {
      showToast({ type: "error", title: "Failed to delete ❌" });
    }
  }

  const { mutate: handleUpdatePost, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (editText) formData.append("body", editText);
      if (editImage) formData.append("image", editImage);
      return await updatePostApi(post._id, formData);
    },
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Post updated 🎉",
        description: "Your changes were saved successfully",
      });
      client.invalidateQueries(["posts"]);
      setIsEditOpen(false);
    },
    onError: () => {
      showToast({
        type: "error",
        title: "Update failed ❌",
        description: "Something went wrong. Try again!",
      });
    },
  });

  function loadMoreComments() {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleComments((prev) => prev * 2);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="w-full max-w-md sm:max-w-2xl mx-auto rounded-xl shadow-sm bg-white dark:bg-gray-900 mb-5">
      <PostHeader
        post={post}
        userData={userData}
        onDelete={handleDeletePost}
        onEdit={() => setIsEditOpen(true)}
      />

      {post.image && <PostImage image={post.image} />}

      <PostBody post={post} />

      <PostEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        editText={editText}
        setEditText={setEditText}
        editImage={editImage}
        setEditImage={setEditImage}
        isUpdating={isUpdating}
        handleUpdatePost={handleUpdatePost}
      />

      <PostActions post={post} navigate={navigate} />

      <PostCommentInput
        post={post}
        inPostDetailsPage={postDetails}
        userData={userData}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        handleSubmitComment={handleSubmitComment}
        isPending={isPending}
      />

      <PostComments
        post={post}
        commentsLimit={commentsLimit}
        visibleComments={visibleComments}
        loadMoreComments={loadMoreComments}
        isLoading={isLoading}
      />
    </Card>
  );
}
