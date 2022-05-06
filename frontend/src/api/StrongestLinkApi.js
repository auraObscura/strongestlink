import apiHelpers from "./apiHelpers";
import axios from "axios";

const StrongestLinkApi = {};

const TOKEN_BASE = "http://localhost:8000/dj-rest-auth";
const BASE_URL = "http://localhost:8000/api";
const HEADERS = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  },
};

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
    axios.post(
      `${TOKEN_BASE}/token/refresh/`,
      sessionStorage.getItem("refresh_token")
    )
  );
};

// internal model calls
// methods for Posts
StrongestLinkApi.postPost = async (postData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/posts/`, postData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.getAllPosts = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/posts/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.getPostByID = async (postID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/posts/${postID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

//methods for Comments
StrongestLinkApi.getCommentByID = async (commentID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/comments/${commentID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.postComment = async (commentData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/comments/`, commentData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

// Google Map Api Pin Creation
StrongestLinkApi.postPin = async (pinData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/locations/`, pinData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.getPins = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/locations/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.getUserByID = async (userID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.deletePin = async (locationId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(`${BASE_URL}/locations/${locationId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

//Location API requests
StrongestLinkApi.getLocationByID = async (locationID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/locations/${locationID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.addAttendee = async (locationID, newAttendee) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(`${BASE_URL}/locations/${locationID}/`, newAttendee, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

//methods for User Profile
StrongestLinkApi.getUserProfileByID = async (userProfileID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/profiles/${userProfileID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.createUserProfile = async (userProfileData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/profiles/`, userProfileData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.deleteFriend = async (userProfileID, userProfileData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(`${BASE_URL}/profiles/${userProfileID}/`, userProfileData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.editProfile = async (userProfileID, userProfileData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(`${BASE_URL}/profiles/${userProfileID}/`, userProfileData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.getAllUserProfiles = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/profiles/`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    }}))
}

//methods for Friend Requests
StrongestLinkApi.createFriendRequest = async (friendRequestData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/friend-requests/`, friendRequestData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.getFriendRequestByID = async (requestID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/friend-requests/${requestID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.deleteRequestByID = async (requestID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(`${BASE_URL}/friend-requests/${requestID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

StrongestLinkApi.acceptFriendRequest = async (requestID, friendRequestData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(
      `${BASE_URL}/friend-requests/${requestID}/`,
      friendRequestData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      }
    )
  );
};

//methods for User
StrongestLinkApi.getUserByID = async (userID) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
  );
};

//method for lifts
StrongestLinkApi.getLifts = async () => {
  const allExercises = await axios.get(`${BASE_URL}/lifts/`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

  return allExercises.data;
};

StrongestLinkApi.getCardio = async () => {
  const allCardio = await axios.get(`${BASE_URL}/cardio/`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

  return allCardio.data;
};
export default StrongestLinkApi;
