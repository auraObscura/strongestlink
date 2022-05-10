import './Landing.css'
import bg from '../../assets/chain-bg-s.png'

function LandingLoggedOut() {
  return (
    <div className='landing-container'>
      <header style={{backgroundImage: `url(${bg})`, objectFit: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "80% -15%"}} >
        <h1 className='landing-heading'>A social media platform for connecting and motivating at the gym</h1>
      </header>
      <div className='landing-cards'>
        <div className='landing-card'>
          <h3>Connect</h3>
          <p>Make new friends at the gyms you go to</p>
        </div>
        <div className='landing-card'>
          <h3>Share</h3>
          <p>Post your workouts to motivate others</p>
        </div>
        <div className='landing-card'>
          <h3>Get inspired</h3>
          <p>Generate exercises to target muscle groups</p>
        </div>
      </div>


    </div>
  )
}

export default LandingLoggedOut