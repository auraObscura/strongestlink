const apiHelpers = {}

apiHelpers.tryCatchFetch = async (axiosCall) => {
  try {
    const response = await axiosCall()
    return response.data ? response.data : { message: "success" } 
  }
  catch (e) {
    console.error("error", e.response ? e.response.data : e)
    return null
  }
}

export default apiHelpers