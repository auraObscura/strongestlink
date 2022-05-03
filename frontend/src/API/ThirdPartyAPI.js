import axios from "axios"
import apiHelpers from "./apiHelpers"

const thirdPartyAPI = {}

thirdPartyAPI.uploadPhoto = async (formData) => {
  return await apiHelpers.tryCatchFetch(
    () =>   axios.post('https://api.cloudinary.com/v1_1/strongest-link/image/upload' , formData))
}

export default thirdPartyAPI