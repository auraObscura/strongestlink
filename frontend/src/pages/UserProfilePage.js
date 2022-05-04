import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"
import Profile from "../components/Profile"

function UserProfilePage (){
  
  const userID = useParams()["userID"]
  const [userProfile, setUserProfile] = useState("")

  useEffect(() => {
    loadUserProfile()
  }, [userID])

  const loadUserProfile = async () => {
    const response = await StrongestLinkApi.getUserProfileByUserID(userID)
    console.log(response)
    setUserProfile(response)
  }

  // need implementing still
  const handleAddFriend = async () => {
    return
  }

  return (
    <div>
      {userProfile && <Profile userProfile={userProfile}/>}
      <button onClick = {handleAddFriend}>Add Friend</button>
    </div>
  )
}


export default UserProfilePage