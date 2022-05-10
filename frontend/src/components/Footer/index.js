import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChain, faDumbbell } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer>
      <span>© 2022</span>
      <FontAwesomeIcon className="dumbbell-icon" icon={faDumbbell} />
      <a className="footer-link" href="https://www.linkedin.com/in/dajin-chung-506671163/">Dajin Chung</a>
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      <a className="footer-link" href="https://www.linkedin.com/in/shun-ganas/">Shun Ganas</a>
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      <a className="footer-link" href="https://www.linkedin.com/in/timothy-longmore-bb5647220/">Timothy Longmore</a>
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      <a className="footer-link" href="https://www.linkedin.com/in/auraobscura/">Andrew Simpson</a>
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      <a className="footer-link" href="www.linkedin.com/in/ivan-trejo-dev"> Ivan Trejo</a>
      <FontAwesomeIcon className="chain-icon" icon={faChain} />
      <a className="footer-link" href="https://www.linkedin.com/in/katarzyna-kw/">Katarzyna Wegrzynowicz</a>
      </footer>
  )
}

export default Footer