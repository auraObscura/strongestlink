import { useState, useEffect } from "react"
// import backendAPI from "../API/BackendAPI"
import backendAPI from '../api/ThirdPartyApi'
import thirdPartyAPI from '../api/ThirdPartyApi'
// import thirdPartyAPI from "../API/ThirdPartyAPI"
import PostForm from "../components/PostForm"
import PostList from "../components/PostList"

function AllPostsPage(){

  const [allPosts, setAllPosts] = useState(null)
  const [imageSelected, setImageSelected] = useState("")
  
  useEffect(() => {
    loadPosts()
  }, [imageSelected])

  const loadPosts = async () => {
    const response = await backendAPI.getAllPosts()
    setAllPosts(response ? response : [])
  }

  const handleSubmitPost = async (event) => {
    event.preventDefault()
    const formData  = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset","sfsjb33d" )
    const uploadResponse = await thirdPartyAPI.uploadPhoto(formData)
    console.log(uploadResponse)
    if(uploadResponse){
      const postData = {
        "caption" : event.target.elements["caption"].value,
        "image" : uploadResponse.url,
        "comments" : []
      }
      const backendResponse = await backendAPI.postPost(postData)
      console.log(backendResponse)
    }
    loadPosts()
    event.target.elements["caption"].value = ""
  }
  

  return (
      <div>
        <PostForm loadPosts = {loadPosts} handleSubmitPost = {handleSubmitPost} setImageSelected = {setImageSelected}/>
        <div>
          <h1>Newsfeed:</h1>  
        </div>
        <div>
          <PostList posts = {allPosts} />
        </div>
      </div>
  )
}

export default AllPostsPage