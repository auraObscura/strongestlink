import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"
import Profile from "../components/Profile"
import Friends from "../components/Friends"
import FriendRequests from "../components/FriendRequests"
import EditProfileForm from "../components/EditProfileForm"

function UserProfilePage (props){
  
  const userID = useParams()["userID"]
  const [user, setUser] = useState("")
  const [userProfile, setUserProfile] = useState("")
  const [myUser, setMyUser] = useState("")
  const [friends, setFriends] = useState("")
  const [friendRequests, setFriendRequests] = useState("")
  const [wantToEdit, setWantToEdit] = useState(false)

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
    if(userProfile){
      if(props.user.username !== user.username &&!userProfile.friends.includes(myUser.profile)){
       return <button onClick = {handleAddFriend}>Add Friend</button>
      }
      else if(props.user.username !== user.username &&userProfile.friends.includes(myUser.profile)){
        return <button onClick = {handleRemoveFriend}>Remove Friend</button>
      }
    }
  }

  return (
    <div>
      {userProfile && <Profile userProfile={userProfile}/>}
      <button onClick = {() => setWantToEdit(!wantToEdit)}>Edit Form</button>
      {wantToEdit && <EditProfileForm/>}
      {friends && <Friends friends={friends}/>}
      {(friendRequests && props.user.username == user.username) && <FriendRequests friendRequests={friendRequests} handleRejectRequest = {handleRejectRequest} handleAcceptRequest = {handleAcceptRequest}/>}
      {renderAddFriendButton()}
    </div>
  )
}


export default UserProfilePage