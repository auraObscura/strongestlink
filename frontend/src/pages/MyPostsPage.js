import {useState, useEffect} from 'react'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import StrongestLinkApi from "../api/StrongestLinkApi"
import anon from '../assets/sl-user.png'

function MyPostsPage(props) {

  const [profileData, setProfileData] = useState([])
  const [myPosts, setMyPosts] = useState(null)

  useEffect(() => {
    console.log("USER in my posts: ", props.user)
    loadMyPosts()
    loadMyProfile()
  }, [])

  const loadMyPosts = async () => {
    const response = await StrongestLinkApi.getAllPosts()
    // console.log("response: ", response)

    if (response) {
      const filteredData = response.filter(post => post.user.id == props.user.pk)
      // console.log("filtered data: ", filteredData)
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
              : <p className="profile-text-content">Edit your profile to add information</p>
            }
          </div>
          <div className='profile-text-container'>
            <p className="profile-text-title">Weight</p>
            {profileData.weight 
              ? <p className="profile-text-content">{profileData.weight} lbs</p>
              : <p className="profile-text-content">Edit your profile to add information</p>
            }
          </div>
        </div>
        <button className='btn'>Edit Profile</button>
      </div>

      <div className='my-posts-container'>
        <h1>My Posts</h1>
        {myPosts && <PostList posts={myPosts} /> }
      </div>
    </section>
  )
}

export default MyPostsPage