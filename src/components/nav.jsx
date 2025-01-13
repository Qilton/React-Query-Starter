import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
const nav = () => {
  return (
    <div className='nav'>
      <Link to='/' className='links'>Home</Link>
        <Link to='/posts' className='links'>Posts</Link>
    </div>
  )
}

export default nav
