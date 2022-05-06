import {useState, useEffect} from 'react'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import StrongestLinkApi from "../api/StrongestLinkApi"
import anon from '../assets/sl-user.png'
import thirdPartyAPI from '../api/ThirdPartyApi'
import EditProfileForm from '../components/EditProfileForm'

function MyPostsPage(props) {

  const [profileData, setProfileData] = useState([])
  const [myPosts, setMyPosts] = useState(null)
  const [imageSelected, setImageSelected] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    console.log("USER in my posts: ", props.user)
    loadMyPosts()
    loadMyProfile()
  }, [])

  useEffect(() => {
    loadMyPosts()
}, [imageSelected])

  const loadMyPosts = async () => {
    const response = await StrongestLinkApi.getAllPosts()

    if (response) {
      const filteredData = response.filter(post => post.user.id == props.user.pk)
      setMyPosts(filteredData)
    }
  }

  const loadMyProfile = async () => {
    const response = await StrongestLinkApi.getUserProfileByID(props.user.pk)

    if (response) {
      console.log("profile response: ", response)
      setProfileData(response)
      console.log("profile dataaa: ", profileData)
    }
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
      const backendResponse = await StrongestLinkApi.postPost(postData)
      console.log(backendResponse)
    }
    loadMyPosts()
    event.target.elements["caption"].value = ""
  }

  const handleEdit = () => {
    // event.preventDefault()
    if (isEditing) {
      setIsEditing(false)
      console.log("is editing false? ", isEditing)

  } else {
    setIsEditing(true)
    console.log("is editing true? ", isEditing)
    }
  }

  return (
    <section className='my-profile-container'>
      <div className='profile-card'>
        <div className='profile-header'>
          {profileData.img ? <img className='profile-avatar' src={profileData.profile_img} alt="profile avatar" /> : <img className='profile-avatar' src={anon} alt="default avatar" /> }
          <div className='profile-subhead'>
            {profileData.user &&
            <h1 className='profile-subhead-text'>
              {profileData.user.username}
            </h1>
            }
          </div>
        </div>
        <div className='profile-body'>
          <div className='profile-text-container'>
            <p className='profile-text-title'>About Me</p>
            {profileData.about_me 
              ? <p className="profile-text-content">{profileData.about_me}</p>
              : <p className="profile-text-content">Add information</p>
            }
          </div>
          <div className='profile-text-container'>
            <p className="profile-text-title">Weight</p>
            {profileData.weight 
              ? <p className="profile-text-content">{profileData.weight} lbs</p>
              : <p className="profile-text-content">Add information</p>
            }
          </div>
        </div>
        {!isEditing && <button className='btn profile' onClick={handleEdit}>Edit Profile</button>}
        {isEditing && <EditProfileForm setImageSelected={setImageSelected} /> }
        {isEditing && <button className='btn profile' onClick={handleEdit}>Cancel Edit</button>}
                
      </div>
      <div className='my-posts-container'>
        <h1>New Post</h1>
        <PostForm loadPosts = {loadMyPosts} handleSubmitPost = {handleSubmitPost} setImageSelected = {setImageSelected}/>
        <h1>My Posts</h1>
        {myPosts && <PostList posts={myPosts} /> }
      </div>
    </section>
  )
}

export default MyPostsPage