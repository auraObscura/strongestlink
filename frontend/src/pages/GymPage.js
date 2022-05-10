import React from 'react'
import StrongestLinkApi from "../api/StrongestLinkApi"
import {useState, useEffect} from 'react'


function GymPage(props) {
  const [gyms, setGyms] = useState([])

  const getLocationData = async () => {
    const data = await StrongestLinkApi.getLocations()
    const userGyms = data.filter(data => data.attendees.includes(props.user.pk))
    setGyms(userGyms)
  }

  useEffect(() => {
    getLocationData() 
  }, [])

  useEffect(() => {
    rendergmys()
  }, [gyms])

  const rendergmys= () => {
    const gymlists = []
    gyms.forEach(id => {gymlists.push(id)})
    return gymlists.map((gym) => {return <li className='body-list-items'>
      <a className="gymLink" href={`#/map/location/${gym.id}`}>{gym.name}
        </a>
    </li>})
  }

  return (
    <section className="gym-page">
      <h1>{props.user.username}'s Gyms</h1>
      <ol>
      {rendergmys()}
      </ol>
    </section>
  )

}

export default GymPage