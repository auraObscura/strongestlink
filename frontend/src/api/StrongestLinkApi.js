import apiHelpers from './apiHelpers';
import axios from 'axios'

const StrongestLinkApi = {}

const TOKEN_BASE = "http://localhost:8000/dj-rest-auth";
const BASE_URL = "http://localhost:8000/api";
const HEADERS = { headers: {Authorization: `Bearer ${sessionStorage.getItem("access_token")}`}}

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
    () => axios.post(`${BASE_URL}/posts/`, postData, HEADERS ))
}

StrongestLinkApi.getAllPosts = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/posts/` , HEADERS)
  )
}

StrongestLinkApi.getPostByID = async (postID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/posts/${postID}`, HEADERS))
}

//methods for Comments 
StrongestLinkApi.getCommentByID = async (commentID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/comments/${commentID}`, HEADERS))
}

StrongestLinkApi.postComment = async (commentData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/comments/`, commentData, HEADERS)
  )
}

//methods for User Profile
StrongestLinkApi.getUserProfileByUserID = async (userID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/profiles/${userID}`, HEADERS))
}

//methods for Friend Requests
StrongestLinkApi.createFriendRequest = async (friendRequestData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/friend-requests/`, friendRequestData, HEADERS))
}

export default StrongestLinkApi;