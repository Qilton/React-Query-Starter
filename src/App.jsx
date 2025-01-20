import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/nav'
import Posts from './pages/Posts'
import Pagination from './pages/Pagination'
import Pagination2 from './pages/Pagination2'
import InfiniteQueries3 from './pages/InfiniteQueries3'
import RQPosts from './pages/ReactQueryPosts'
import PostDetails from './pages/PostDetails'
function App() {
return(
  <>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts" element={<Posts />} />
    <Route path="/react-query-post" element={<RQPosts />} />
    <Route path="/react-query-post/:postId" element={<PostDetails />} />
    <Route path="/pagination" element={<Pagination />} />
    <Route path="/pagination2" element={<Pagination2 />} />
    <Route path="/infinite-queries" element={<InfiniteQueries3 />} />
    
  </Routes>
  </>

)
}

export default App
