import {useState, useEffect} from 'react'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import StrongestLinkApi from "../api/StrongestLinkApi"
import anon from '../assets/sl-user.png'
import thirdPartyAPI from '../api/ThirdPartyApi'
import EditProfileForm from '../components/EditProfileForm'
import Profile from '../components/Profile'
import UserProfilePage from './UserProfilePage'
import Friends from '../components/Friends'
import FriendRequests from '../components/FriendRequests'

function MyPostsPage(props) {

  const [userProfile, setUserProfile] = useState("")
  const [myUser, setMyUser] = useState("")
  const [myPosts, setMyPosts] = useState(null)
  const [imageSelected, setImageSelected] = useState("")
  const [wantToEdit, setWantToEdit] = useState(false)
  const [friends, setFriends] = useState("")
  const [friendRequests, setFriendRequests] = useState("")

  useEffect(() => {
    console.log("USER in my posts: ", props.user)
    console.log("MY USER: ", myUser)
    loadMyPosts()
    loadMyProfile()
    loadMyUser()
    loadFriends()
    loadFriendRequests()
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
      // console.log("profile response: ", response)
      setUserProfile(response)
      // console.log("profile dataaa: ", userProfile)
    }
  }

  const loadMyUser = async () => {
    if(props.user){
      const response = await StrongestLinkApi.getUserByID(props.user.pk)
      console.log(response)
      setMyUser(response)
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

  const handleEditProfile = async (event) => {
    event.preventDefault()
    const formData  = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset","sfsjb33d" )
    const uploadResponse = await thirdPartyAPI.uploadPhoto(formData)
    console.log(uploadResponse)
    if(uploadResponse){
      const userProfileData = {
        "about_me" : event.target.elements["aboutMe"].value,
        "profile_img" : uploadResponse.url,
        "weight" : event.target.elements["weight"].value,
        "gender" : event.target.elements["gender"].value,
      }
      const response = await StrongestLinkApi.editProfile(myUser.profile, userProfileData)
      console.log("response from edit profile call: ", response)
      loadMyProfile()
      setWantToEdit(false)
    }  
  }

  const loadFriends = async () => {
    if(userProfile){
      let newFriends = []
      if(userProfile.friends){
        for(const friendProfileID of userProfile.friends){
          newFriends.push(await StrongestLinkApi.getUserProfileByID(friendProfileID))
        }
      }
      setFriends(newFriends)
    }
  }

  const loadFriendRequests = async () => {
    if(props.user){
      let newFriendRequests = []
      if(props.user.requests_received){
        for(const requestID of props.user.requests_received){
          newFriendRequests.push(await StrongestLinkApi.getFriendRequestByID(requestID))
        }
      }
      console.log(newFriendRequests)
      setFriendRequests(newFriendRequests)
    }
  }

  // const handleRemoveFriend = async () => {
  //   const index = userProfile.friends.indexOf(myUser.profile)
  //   const tempUserProfileFriends = userProfile.friends
  //   tempUserProfileFriends.splice(index,1)
  //   const userProfileData = {
  //     friends : tempUserProfileFriends
  //   }
  //   const response = await StrongestLinkApi.deleteFriend(myUser.profile, userProfileData)
  //   loadMyProfile()
  // }

  const handleRejectRequest = async (requestID) => {
    const response = await StrongestLinkApi.deleteRequestByID(requestID)
    // loadUser()
  }

  const handleAcceptRequest = async (requestID) => {
    const friendRequestData = {
      accepted: true
    }
    const response = await StrongestLinkApi.acceptFriendRequest(requestID , friendRequestData)
    // loadUser()
  }



  return (
    <section className='my-profile-container'>
      <div className='profile-container'>
      <Profile setImageSelected={setImageSelected} userProfile={userProfile} />

      <button className="btn" onClick = {() => setWantToEdit(!wantToEdit)}>{wantToEdit ? "Cancel Edit" : "Edit Profile"} </button>

      {wantToEdit && <EditProfileForm setImageSelected = {setImageSelected} handleEditProfile = {handleEditProfile}/>}
      {friends && <Friends friends={friends} />}
      {friendRequests && <FriendRequests friendRequests={friendRequests} handleRejectRequest = {handleRejectRequest} handleAcceptRequest = {handleAcceptRequest}/>}
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
