import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"
import Profile from "../components/Profile"
import Friends from "../components/Friends"
import FriendRequests from "../components/FriendRequests"
import EditProfileForm from "../components/EditProfileForm"
import thirdPartyAPI from "../api/ThirdPartyApi"

function UserProfilePage (props){
  
  const userID = useParams()["userID"]
  const [user, setUser] = useState("")
  const [userProfile, setUserProfile] = useState("")
  const [myUser, setMyUser] = useState("")
  const [friends, setFriends] = useState("")
  const [friendRequests, setFriendRequests] = useState("")
  const [wantToEdit, setWantToEdit] = useState(false)
  const [imageSelected, setImageSelected] = useState("")

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
    console.log("MY USER: ", myUser)
  }, [user])

  const loadMyUser = async () => {
    if(props.user){
      const response = await StrongestLinkApi.getUserByID(props.user.pk)
      console.log(response)
      setMyUser(response)
    }
  }


  const loadUserProfile = async () => {
    if(user){
      const response = await StrongestLinkApi.getUserProfileByID(user.profile)
      console.log(response)
      setUserProfile(response)
    }
  }

  const loadUser = async () => {
    const response = await StrongestLinkApi.getUserByID(userID)
    console.log(response)
    setUser(response)
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
    console.log("USER IN load fr req: ", user)
    if(user){
      let newFriendRequests = []
      if(user.requests_received){
        for(const requestID of user.requests_received){
          newFriendRequests.push(await StrongestLinkApi.getFriendRequestByID(requestID))
        }
      }
      console.log(newFriendRequests)
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
       return <button className="btn" onClick = {handleAddFriend}>Add Friend</button>
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

  return (
    <section>
      <div className='profile-container'>
        {userProfile && <Profile userProfile={userProfile}/>}

        {props.user.username == user.username && <button className="btn" onClick = {() => setWantToEdit(!wantToEdit)}>{wantToEdit ? "Cancel Edit" : "Edit Profile"} </button>}

        {(wantToEdit && props.user.username == user.username )&& <EditProfileForm setImageSelected = {setImageSelected} handleEditProfile = {handleEditProfile}/>}
        {friends && <Friends friends={friends} />}
        {(friendRequests && props.user.username == user.username) && <FriendRequests friendRequests={friendRequests} handleRejectRequest = {handleRejectRequest} handleAcceptRequest = {handleAcceptRequest}/>}
        {renderAddFriendButton()}
      </div>

    </section>
  )
}


export default UserProfilePage
