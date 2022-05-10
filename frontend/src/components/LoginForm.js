import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const LoginForm = (props) => {
  const nav = useNavigate();
  const [loginError, setLoginError] = useState(false);
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    let loginData = {
      username: evt.target.elements["username"].value,
      password: evt.target.elements["password"].value,
    }
    const data = await StrongestLinkApi.login(loginData);
    if (data) {
      props.setIsLoggedIn(true)
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      const foundUser = JSON.parse(sessionStorage.getItem("user"));
      if (foundUser) {
        setLoginError(false)
        console.log("founduser username: ", foundUser.username)
        const username = foundUser.username
        props.setUser(foundUser)
        nav("/");
      }
      else setLoginError(true)
    } else {
      setLoginError(true)
    }
  }

  return (
    <section className='form-container'>
      <form onSubmit={handleSubmit} method="POST">
        <div className="input-container">
          <input id="username" name="username" type="text" placeholder="Username" />
          <input id="password" name="password" type="password" placeholder="Password" />
        </div>
        <button className="btn primary" type="submit">Login</button>
        {loginError && 
          <div className='error-msg'>
            <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
            <p>The username and password do not match.</p>
          </div>
          }
      </form>
    </section>
  )
}

export default LoginForm;