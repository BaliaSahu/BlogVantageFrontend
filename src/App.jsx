import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Blogs from './components/pages/Blogs'
import SingleBlog from './components/pages/SingleBlog'
import About from './components/pages/About'
import AllAuthor from './components/pages/AllAuthor'
import UpdateBlog from './components/pages/UpdateBlog'
import DashBoard from './components/pages/DashBoard'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Context } from './main'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import Search from './components/pages/Search'
import VideoBlogs from './components/pages/VideoBlogs'
import SingleVideoBlog from './components/pages/SingleVideoBlog'
import UpdateVideoBlog from './components/pages/UpdateVideoBlog'
import ViewProfile from './components/pages/ViewProfile'
import UpdateProfile from './components/pages/UpdateProfile'

const App = () => {
  const {setUser, isAuthenticated,setIsAuthenticated,user,setBlogs,videoBlogs,setVideoBlogs}=useContext(Context)
  useEffect(()=>{

    const fetchVideoBlogs=async()=>{
      try{
        // const {data}=await axios.get("http://localhost:4000/user/allvideoblogs",{
        const {data}=await axios.get("https://blogvantagebackend-2.onrender.com/user/allvideoblogs",{

          withCredentials:true
        })
        setVideoBlogs(data.allBlogs);
        console.log(data)
      }catch(err){
        setVideoBlogs([]);
      }
    }
    const fetchBlogs=async()=>{
      try{
        // const {data}=await axios.get("http://localhost:4000/user/allblogs",{
        const {data}=await axios.get("https://blogvantagebackend-2.onrender.com/user/allblogs",{
          withCredentials:true
        })
        setBlogs(data.allBlogs);
        console.log(data)
      }catch(err){
        setBlogs([]);
      }
    }
    fetchBlogs();
    fetchVideoBlogs();
  },[isAuthenticated,user])
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path='/videoblogs' element={<VideoBlogs></VideoBlogs>}></Route>
        <Route path="/blogs/:id" element={<SingleBlog></SingleBlog>}></Route>
        <Route path="/videoblog/:id"element={<SingleVideoBlog></SingleVideoBlog>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/authors" element={<AllAuthor />}></Route>
        <Route path="/profile/:id" element={<ViewProfile></ViewProfile>}></Route>
        <Route path='/profile/update' element={<UpdateProfile></UpdateProfile>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/blog/update/:id" element={<UpdateBlog></UpdateBlog>}></Route>
        <Route path="/videoblog/update/:id" element={<UpdateVideoBlog></UpdateVideoBlog>}></Route>
      </Routes>
      <Footer></Footer>
      <Toaster></Toaster>
    </Router>
  )
}

export default App
