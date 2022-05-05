import apiHelpers from './apiHelpers';
import axios from 'axios'

const StrongestLinkApi = {}

const TOKEN_BASE = "http://localhost:8000/dj-rest-auth";
const BASE_URL = "http://localhost:8000/api";

// auth calls
StrongestLinkApi.register = async (registerData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${TOKEN_BASE}/registration/`, registerData)
  );
};

StrongestLinkApi.login = async (loginData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${TOKEN_BASE}/login/`, loginData)
  );
};

StrongestLinkApi.logout = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${TOKEN_BASE}/logout/`)
  );
};

StrongestLinkApi.refreshToken = async (refreshToken) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${TOKEN_BASE}/token/refresh/`, sessionStorage.getItem("refresh_token"))
  );
};

// internal model calls
// methods for Posts
StrongestLinkApi.postPost = async (postData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/posts/`, postData, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }}))
}

StrongestLinkApi.getAllPosts = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/posts/` , { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
    }})
  )
}

StrongestLinkApi.getPostByID = async (postID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/posts/${postID}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }}))
}

//methods for Comments 
StrongestLinkApi.getCommentByID = async (commentID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/comments/${commentID}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }}))
}

StrongestLinkApi.postComment = async (commentData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/comments/`, commentData, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }})
  )
}



// Google Map Api Pin Creation
StrongestLinkApi.postPin = async (pinData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/locations/`, pinData, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }})
  )
}

StrongestLinkApi.getPins = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/locations/` , { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }})
  )
}


StrongestLinkApi.deletePin = async (locationId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/locations/${locationId}` , { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }})
  )
}



export default StrongestLinkApi;