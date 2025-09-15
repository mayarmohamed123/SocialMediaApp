import axios from "axios";
const baseUrl = "https://linked-posts.routemisr.com/";

export async function postsApi() {
    return axios.get(baseUrl + "posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
      params: {
        sort: "-createdAt",
      },
    });
}

export async function getSinglePostApi(postId) {
  try {
    const { data } = await axios.get(baseUrl + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function setPostApi(formData) {
  try {
    const { data } = await axios.post(baseUrl + "posts", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(baseUrl + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function updatePostApi(postId, formData) {
  try {
    const { data } = await axios.put(baseUrl + "posts/" + postId, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.message };
  }
}