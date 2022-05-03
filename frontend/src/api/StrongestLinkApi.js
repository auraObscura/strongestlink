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

StrongestLinkApi.refreshToken = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${TOKEN_BASE}/refresh/`)
  );
};