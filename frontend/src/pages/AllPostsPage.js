import { useState, useEffect } from "react"
import StrongestLinkApi from "../api/StrongestLinkApi"
import thirdPartyAPI from "../api/ThirdPartyApi"
import PostForm from "../components/PostForm"
import PostList from "../components/PostList"

function AllPostsPage(){

  const [allPosts, setAllPosts] = useState(null)
  const [imageSelected, setImageSelected] = useState("")
  
  // useEffect(() => {
  //   loadPosts()
  // }, [imageSelected])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const response = await StrongestLinkApi.getAllPosts()
    setAllPosts(response ? response : [])
  }

  // const handleSubmitPost = async (event) => {
  //   event.preventDefault()
  //   const formData  = new FormData()
  //   formData.append("file", imageSelected)
  //   formData.append("upload_preset","sfsjb33d" )
  //   const uploadResponse = await thirdPartyAPI.uploadPhoto(formData)
  //   console.log(uploadResponse)
  //   if(uploadResponse){
  //     const postData = {
  //       "caption" : event.target.elements["caption"].value,
  //       "image" : uploadResponse.url,
  //       "comments" : []
  //     }
  //     const backendResponse = await StrongestLinkApi.postPost(postData)
  //     console.log(backendResponse)
  //   }
  //   loadPosts()
  //   event.target.elements["caption"].value = ""
  // }
  

  return (
      <section>
        {/* commenting out bc it's on the my profile pg but not deleting so can easily add back here if we want */}
        {/* <PostForm loadPosts = {loadPosts} handleSubmitPost = {handleSubmitPost} setImageSelected = {setImageSelected}/> */}
        <div className="container">
          <h1>Newsfeed</h1>  
        </div>
        <div className="container">
          {allPosts && <PostList posts = {allPosts} /> }
        </div>
      </section>
  )
}

export default AllPostsPage