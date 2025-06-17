import React from 'react'
import "./style.css"
import logo from "../../Assets/navbarlogo.png"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={"/"} className="logo-container">
          <img src={logo} alt='logo' />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
