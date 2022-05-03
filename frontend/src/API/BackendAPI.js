import axios from "axios"
import apiHelpers from "./apiHelpers"

const backendAPI = {}
const BASE_URL = "http://localhost:8000"

// methods for Posts
backendAPI.postPost = async (postData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/posts/`, postData))
}

backendAPI.getAllPosts = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/posts/`))
}

backendAPI.getPostByID = async (postID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/posts/${postID}`))
}

//methods for Comments 
backendAPI.getCommentByID = async (commentID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/comments/${commentID}`))
}

backendAPI.postComment = async (commentData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/comments/`, commentData)
  )
}

export default backendAPI