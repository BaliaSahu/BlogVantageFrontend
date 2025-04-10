import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import{Context}from '../../main'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';

import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [show,setSHow]=useState(false)
  const handleNavbar=()=>{
    setSHow(!show);
  }
  const handleLogout=async(e)=>{
    e.preventDefault();
    try{
      const{data}=axios.get("http://localhost:4000/user/logout",{
      // const{data}=axios.get("https://blogvantagebackend-2.onrender.com/user/logout",{
        withCredentials:true
      })
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/")
    }catch(err){
      toast.error(err.response.data.message);
      console.log(err);
    }
  }
  const isDashBoard=useLocation("http://localhost:5173")
  const {isAuthenticated,setIsAuthenticated,user,setUser,
    blogs,setBlogs,mode,setMode}=useContext(Context);

    const navigateTo=useNavigate()
  return (
    <>
      <section className={isDashBoard.pathname=== "/dashboard"
       ? "hideNavbar"
        : mode === "light"
         ? "header light-navbar" 
        :"header dark-navbar"}>

          <nav>
            <div className='logo'>
              Blog <span>Vantage</span>
            </div>
            <div className={show ? "links show" : "links"}>
              <ul>
                <li id="search-li">
                  <Link id="search-li" to={"/search"} onClick={()=> handleNavbar()}><FaSearch /></Link>
                </li>
                <li>
                  <Link to={"/"} style={{fontSize:"15px"}} onClick={()=> handleNavbar()}>HOME</Link>
                </li>
                <li>
                  <Link to={"/blogs"}style={{fontSize:"15px"}} onClick={()=> handleNavbar()}>BLOGS</Link>
                </li>
                <li>
                  <Link to={"/videoblogs"}style={{fontSize:"15px"}} onClick={()=> handleNavbar()}>VIDEO BLOGS</Link>
                </li>
                <li>
                  <Link to={"/authors"}style={{fontSize:"15px"}} onClick={()=> handleNavbar()}>ALL AUTHORS</Link>
                </li>
                <li>
                  <Link to={"/about"}style={{fontSize:"15px"}} onClick={()=> handleNavbar()}>ABOUT</Link>
                </li>
              </ul>
              <div className='btns'>
                <button onClick={()=> mode==="light" ? setMode("dark"): setMode("light")}
                  className={mode=="light" ? "mode-btn light-mode" :"mode-btn dark-mode"}
                  >
                    {
                      mode==="light" ? 
                      (<CiLight className="light-icon"/>)
                      : (<MdDarkMode className="dark-icon"/>)
                    }
                </button>
                {

                  isAuthenticated && user.role==="author"?( 
                    <Link to={"/dashboard"} onClick={handleNavbar} className='dashboard-btn'>
                      DASHBOARD
                    </Link>
                  ): ""
                }
                {
                  !isAuthenticated ? (<Link to={"/login"} onClick={handleNavbar} className='login-btn'>LOGIN</Link>):
                  (<button onClick={handleLogout} className='logout-btn'>
                    LOGOUT
                  </button>
                  )
                }
              </div>
            </div>
              <RxHamburgerMenu className='hamburger' onClick={handleNavbar}></RxHamburgerMenu>
          </nav>
      </section>
    </>
  )
}

export default Navbar