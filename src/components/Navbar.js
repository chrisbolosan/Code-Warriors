import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/IDE">IDE</Link>
      </div>
    </nav>
  )
}

export default Navbar
