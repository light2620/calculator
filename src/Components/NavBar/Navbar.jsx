import React from 'react'
import "./style.css"
import logo from "../../Assets/navbarlogo.png"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt='logo' />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
