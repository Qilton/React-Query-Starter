import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/nav'
import Posts from './pages/Posts'
import Pagination from './pages/Pagination'
import InfiniteQueries from './pages/InfiniteQueries'
import RQPosts from './pages/RQPosts'
function App() {
return(
  <>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts" element={<Posts />} />
    <Route path="/react-query-post" element={<RQPosts />} />
    <Route path="/pagination" element={<Pagination />} />
    <Route path="/infinite-queries" element={<InfiniteQueries />} />
    
  </Routes>
  </>

)
}

export default App
