import {useState, useEffect} from 'react'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import StrongestLinkApi from "../api/StrongestLinkApi"
import thirdPartyAPI from '../api/ThirdPartyApi'
import EditProfileForm from '../components/EditProfileForm'
import Profile from '../components/Profile'
import UserProfilePage from './UserProfilePage'
import Friends from '../components/Friends'
import FriendRequests from '../components/FriendRequests'

function MyPostsPage(props) {

  const userID = props.user.pk
  const [user, setUser] = useState(props.user)
  const [userProfile, setUserProfile] = useState("")
  const [myUser, setMyUser] = useState("")
  const [friends, setFriends] = useState("")
  const [friendRequests, setFriendRequests] = useState("")
  const [wantToEdit, setWantToEdit] = useState(false)
  const [imageSelected, setImageSelected] = useState("")
  const [myPosts, setMyPosts] = useState(null)

  useEffect(() => {
    loadUserProfile()
  }, [user])

  useEffect(() => {
    loadUser()
  }, [userID])

  useEffect(() => {
    loadFriends()
  }, [userProfile])

  useEffect(() => {
    loadFriendRequests()
  }, [user])

  useEffect(() => {
    loadMyUser()
    // console.log("MY USER: ", myUser)
  }, [user])

  useEffect(() => {
    loadMyPosts()
  }, [user])

  const loadMyUser = async () => {
    if(props.user){
      const response = await StrongestLinkApi.getUserByID(props.user.pk)
      console.log("resp in loadMyUser: ", response)
      setMyUser(response)
    }
  }


  const loadUserProfile = async () => {
    if(user.profile){
      const response = await StrongestLinkApi.getUserProfileByID(user.profile)
      console.log("response in loadUserProfile", response)
      setUserProfile(response)
    }
  }

  const loadUser = async () => {
    if(userID){
      const response = await StrongestLinkApi.getUserByID(userID)
      console.log("response in loadUser: ", response)
      setUser(response)
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
    if(user){
      let newFriendRequests = []
      if(user.requests_received){
        for(const requestID of user.requests_received){
          newFriendRequests.push(await StrongestLinkApi.getFriendRequestByID(requestID))
        }
      }
      setFriendRequests(newFriendRequests)
    }
  }

  const handleAddFriend = async () => {
    const friendRequestData = {
      sender : myUser.id,
      receiver : user.id,
      accepted : false,
    }
    const response = await StrongestLinkApi.createFriendRequest(friendRequestData)
    if(response){
      alert("Friend Request Sent")
    }
    else{
      alert("Error on Request/Already Sent Friend Request")
    }
    loadFriendRequests()
  }

  const handleRemoveFriend = async () => {
    const index = userProfile.friends.indexOf(myUser.profile)
    const tempUserProfileFriends = userProfile.friends
    tempUserProfileFriends.splice(index,1)
    const userProfileData = {
      friends : tempUserProfileFriends
    }
    const response = await StrongestLinkApi.deleteFriend(myUser.profile, userProfileData)
    loadUserProfile()
  }

  const handleRejectRequest = async (requestID) => {
    const response = await StrongestLinkApi.deleteRequestByID(requestID)
    loadUser()
  }

  const handleAcceptRequest = async (requestID) => {
    const friendRequestData = {
      accepted: true
    }
    const response = await StrongestLinkApi.acceptFriendRequest(requestID , friendRequestData)
    loadUser()
  }

  const renderAddFriendButton = () => {
    if(userProfile && myUser){
      if(props.user.username !== user.username &&!userProfile.friends.includes(myUser.profile)){
       return <button className="btn primary" onClick = {handleAddFriend}>Add Friend</button>
      }
      else if(props.user.username !== user.username &&userProfile.friends.includes(myUser.profile)){
        return <button className="btn secondary" onClick = {handleRemoveFriend}>Remove Friend</button>
      }
    }
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
      loadUserProfile()
      setWantToEdit(false)
    }  
  }

  const loadMyPosts = async () => {
    const response = await StrongestLinkApi.getAllPosts()
  
    if (response) {
      console.log("USER IN LOAD POSTS: ", user)
      const filteredData = response.filter(post => post.user.id == props.user.pk)
      setMyPosts(filteredData)
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
      if(event.target.elements["workout"].value == "Bike" || event.target.elements["workout"].value == "Run" ){
        const cardioData = {
          "type" : event.target.elements["workout"].value,
          "miles" : event.target.elements["number"].value,
        }
        const cardioResponse = await StrongestLinkApi.postCardio(cardioData)
      }
      else if(event.target.elements["workout"].value == "Squat" || event.target.elements["workout"].value == "Deadlift" || event.target.elements["workout"].value == "Bench" ){
        const liftData = {
          "type" : event.target.elements["workout"].value,
          "weight" : event.target.elements["number"].value,
        }
        const liftResponse = await StrongestLinkApi.postLift(liftData)
      }
      const backendResponse = await StrongestLinkApi.postPost(postData)
      console.log(backendResponse)
    }
    loadMyPosts()
    event.target.elements["caption"].value = ""
    event.target.elements["number"].value = ""
    event.target.elements["workout"].value = "none"
    event.target.elements["image"].value = ""
  }
  

  return (
    <section className='my-profile-container'>
      <div className='profile-container'>
        {userProfile && <Profile userProfile={userProfile}/>}

        <button className="btn primary" onClick = {() => setWantToEdit(!wantToEdit)}>{wantToEdit ? "Cancel Edit" : "Edit Profile"} </button>

        {(wantToEdit && props.user.username == user.username )&& <EditProfileForm setImageSelected = {setImageSelected} handleEditProfile = {handleEditProfile}/>}
        {friends && <Friends friends={friends} />}
        {(friendRequests && props.user.username == user.username) && <FriendRequests friendRequests={friendRequests} handleRejectRequest = {handleRejectRequest} handleAcceptRequest = {handleAcceptRequest}/>}
        {renderAddFriendButton()}
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
