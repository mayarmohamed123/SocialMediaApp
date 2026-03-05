import axios from "axios";
const baseUrl = "https://route-posts.routemisr.com/";

export async function addComment(commentContent, postId) {
 return axios.post(
   baseUrl + "comments",
   {
     content: commentContent,
     post: postId,
   },
   {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
     },
   }
 );
}
export async function deleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(baseUrl + "comments/" + commentId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function updateCommentApi(commentId, newCommeentContent) {
  try {
    const { data } = await axios.put(
      baseUrl + "comments/" + commentId,
      {
        content: newCommeentContent,
      },
      {
        headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.message };
  }
}