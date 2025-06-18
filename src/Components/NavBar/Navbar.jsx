
import "./style.css"
import logo from "../../Assets/navbarlogo.png"
import { Link } from 'react-router-dom'
import LoadingScreen from "../../utils/LoadingScreen/LoadingScreen"
import { Suspense } from "react"
const Navbar = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={"/"} className="logo-container">
          <img src={logo} alt='logo' />
        </Link>
      </div>
    </nav>
    </Suspense>
  )
}

export default Navbar
