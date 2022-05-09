import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StrongestLinkApi from "../api/StrongestLinkApi";
import PostDetail from "../components/PostDetail";
import Comments from "../components/Comments";

function PostPage(props) {
  const postID = useParams()["postID"];
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [wantToEditCaption, setWantToEditCaption] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    loadPost();
  }, [postID]);

  useEffect(() => {
    loadComments();
  }, [post]);

  const loadPost = async () => {
    const response = await StrongestLinkApi.getPostByID(postID);
    console.log(response);
    setPost(response);
  };

  const loadComments = async () => {
    if (post) {
      let newComments = [];
      if (post.comments) {
        for (const commentID of post.comments) {
          newComments.push(await StrongestLinkApi.getCommentByID(commentID));
        }
      }
      setComments(newComments);
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    let commentData = {
      text: event.target.elements["text"].value,
      post: post.id,
    };
    const response = await StrongestLinkApi.postComment(commentData);
    setComments((comments) => [...comments, response]);
    event.target.elements["text"].value = "";
  };

  const handleDeletePost = async () => {
    if(post){
      const response = await StrongestLinkApi.deletePostByID(post.id)
      nav("/posts")
    }
  }

  const handleEditPost = async (event) => {
    event.preventDefault()
    let postData = {
      "caption" : event.target.elements["caption"].value,
    }
    const backendResponse = await StrongestLinkApi.editPostByID(post.id, postData)
    if(backendResponse){
      loadPost()
      setWantToEditCaption(false)
    }
  }

  return (
    <section>
      {post && <PostDetail post={post} user={props.user} handleDeletePost = {handleDeletePost} 
      wantToEditCaption = {wantToEditCaption} setWantToEditCaption = {setWantToEditCaption}
      handleEditPost = {handleEditPost}/>}
      <Comments comments={comments} handleSubmitComment={handleSubmitComment}  />
    </section>
  );
}

export default PostPage;
