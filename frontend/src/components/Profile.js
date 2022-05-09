import {useState} from 'react'
import EditProfileForm from "./EditProfileForm"

function Profile (props){


  return (
      <div className='profile-card'>
        <div className='profile-header'>
          {props.userProfile && <img className='profile-avatar' src={props.userProfile.profile_img} alt="profile avatar" /> }
          <div className='profile-subhead'>
            {props.userProfile &&
            <h1 className='profile-subhead-text'>
              {props.userProfile.user.username}
            </h1>
            }
          </div>
        </div>
        <div className='profile-body'>
          <div className='profile-text-container'>
            <p className='profile-text-title'>About Me</p>
            {props.userProfile 
              ? <p className="profile-text-content">{props.userProfile.about_me}</p>
              : <p className="profile-text-content">Add information</p>
            }
          </div>
          <div className='profile-text-container'>
            <p className="profile-text-title">Weight</p>
            {props.userProfile 
              ? <p className="profile-text-content">{props.userProfile.weight} lbs</p>
              : <p className="profile-text-content">Add information</p>
            }
          </div>
        </div>
        {/* {!props.wantToEdit && <button className='btn primary profile' onClick={props.handleEdit}>Edit Profile</button>}
        {props.wantToEdit && <EditProfileForm setImageSelected={props.setImageSelected} /> }
        {props.wantToEdit && <button className='btn primary profile' onClick={() => props.setWantToEdit(!props.wantToEdit)}>Cancel Edit</button>} */}

  
      </div>      
  )
}

export default Profile