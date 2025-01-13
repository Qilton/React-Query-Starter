import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/nav'
import Posts from './pages/Posts'
function App() {
return(
  <>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts" element={<Posts />} />
  </Routes>
  </>

)
}

export default App
