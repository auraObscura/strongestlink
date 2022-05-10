import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const RegisterForm = () => {
  const nav = useNavigate();
  const [signupError, setSignupError] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    let registrationData = {
      username: evt.target.elements["username"].value,
      password1: evt.target.elements["password1"].value,
      password2: evt.target.elements["password2"].value,
    }
    const data = await StrongestLinkApi.register(registrationData);
    if (data) {
      setSignupError(false)
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      const userProfileData = {
        user : data.user.pk
      }
      const userProfileResponse = await StrongestLinkApi.createUserProfile(userProfileData)
      console.log(userProfileResponse)
      nav("/login");
    }
    setSignupError(true)
  }

  return (
    <section className='form-container'>
      <form onSubmit={handleSubmit} method="POST">
        <input id="username" name="username" type="text" placeholder="Username" required />
        <input id="password1" name="password" type="password" placeholder="Password" required minLength="8"/>
        <input id="password2" name="password" type="password" placeholder="Password (Again)" required minLength="8"/>
        <button className="btn primary" type="submit">Register</button>
        {signupError && 
          <div className='error-msg'>
            <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
            <p>Error! Please try again.</p>
          </div>
          }

      </form>
    </section>
  )
}


export default RegisterForm;