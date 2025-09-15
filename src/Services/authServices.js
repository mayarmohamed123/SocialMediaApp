import axios from "axios";
const baseUrl = "https://linked-posts.routemisr.com/";

export async function registerApi(formData) {
  try {
    const { data } = await axios.post(baseUrl + "users/signup", formData);
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function loginApi(formData) {
  try {
    const { data } = await axios.post(baseUrl + "users/signin", formData);
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function getUserDataApi() {
  try {
    const { data } = await axios.get(baseUrl + "users/profile-data", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function updatePasswordApi(formData) {
  try {
    const { data } = await axios.patch(
      baseUrl + "users/change-password",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function updatePhotoApi(formData) {
  try {
    const { data } = await axios.put(baseUrl + "users/upload-photo", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
export async function getUserPostsApi(userId) {
  return await axios.get(baseUrl + "users/" + userId + "/posts", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}