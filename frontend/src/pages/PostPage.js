import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import backendAPI from "../api/StrongestLinkApi"
import PostDetail from "../components/PostDetail"
import Comments from "../components/Comments"

function PostPage() {

  const postID = useParams()["postID"]
  const [post, setPost] = useState("")
  const [comments, setComments] = useState("")
  

  useEffect(() => {
    loadPost()
  }, [postID])

  useEffect(() => {
    loadComments()
  }, [post])

  const loadPost = async () => {
    const response = await backendAPI.getPostByID(postID)
    console.log(response)
    setPost(response)
  }

  const loadComments = async () => {
    if(post){
      let newComments = []
      if(post.comments){
        for(const commentID of post.comments){
          newComments.push(await backendAPI.getCommentByID(commentID))
        }
      }
      setComments(newComments)
    }
  }

  const handleSubmitComment = async (event) => {
    event.preventDefault()
    let commentData = {
      text: event.target.elements["text"].value,
      post: post.id
    }
    const response = await backendAPI.postComment(commentData)
    setComments( comments => [...comments,response])
    event.target.elements["text"].value = ""
  }


  return (
  <div>
    <PostDetail post = {post}/>
    <Comments comments = {comments} handleSubmitComment = {handleSubmitComment}/>
  </div>
  )
}

export default PostPage