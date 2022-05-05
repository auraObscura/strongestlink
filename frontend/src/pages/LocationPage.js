import React from 'react'
import './Map/GymForm'

function LocationPage() {
  return (
    <>
    <div className="top-score">
      This is the [Gym Name Here] Top Althetes

    <ol><span className="top-header">Bench</span>
      <li><a href="#">Ivan</a>- 1000lbs</li>
      <li><a href="#">Andrew</a>- 900lbs</li>
      <li><a href="#">Dajin</a> - 100lbs</li>
    </ol>
    
    <ol> <span className="top-header">Squat</span>
      <li><a href="#">Andrew</a> - 1000lbs</li>
      <li><a href="#">Dajin</a> - 700lbs</li>
      <li><a href="#">Smith</a> - 200lbs</li>
    </ol>
    
    <ol> <span className="top-header">Deadlift</span>
      <li><a href="#">Kat</a> - 1000lbs</li>
      <li><a href="#">Andrew</a> - 999lbs </li>
      <li><a href="#">Tim</a> - 100lbs</li>
    </ol>

    <ol><span className="top-header">Top Runners</span>
      <li><a href="#">Kat</a> 32.3 miles</li>
      <li><a href="#">Andrew</a> 30.2 miles</li>
      <li><a href="#">Dajin</a> 2 miles</li>
      <li><a href="#">Ivan</a> 1 mile</li>
    </ol>
 </div>
    </>

  )
}

export default LocationPage