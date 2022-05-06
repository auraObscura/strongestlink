import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChain, faDumbbell } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer>
      <span>© 2022</span>
      <FontAwesomeIcon className="dumbbell-icon" icon={faDumbbell} />
      Dajin Chung
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      Shun Ganas
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      Timothy Longmore
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      Andrew Simpson
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      Ivan Trejo
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      Katarzyna Wegrzynowicz</footer>
  )
}

export default Footer