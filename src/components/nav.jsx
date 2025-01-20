import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
const nav = () => {
  return (
    <div className='nav'>
      <Link to='/' className='links'>Home</Link>
        <Link to='/posts' className='links'>Posts</Link>
        <Link to='/react-query-post' className='links'>RQPosts</Link>
        <Link to='/pagination' className='links'>Pagination</Link>
        <Link to='/pagination2' className='links'>Pagination2</Link>
        <Link to='/infinite-queries' className='links'>Infinite Queries</Link>
        
    </div>
  )
}

export default nav
