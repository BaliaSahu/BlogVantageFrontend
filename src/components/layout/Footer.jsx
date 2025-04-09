import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../main'
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  // const isDashBoard = useLocation("http://localhost:5173")
  const isDashBoard = useLocation("https://blogvantagebackend-2.onrender.com")
  const { mode, setMode } = useContext(Context);

  return (
    <>
      <footer className={isDashBoard.pathname === "/dashboard"
        ? "hideFooter"
        : mode === "light"
          ? " light-footer"
          : " dark-footer"}>
        <div className="container">
          <div className='about'>
            <h3>About</h3>
            <p>Welcome to Blog Vantage, your go-to destination 
              for insightful content, expert tips, and engaging 
              discussions. Our blogging website is dedicated to bringing
               you high-quality articles on  e.g., technology, lifestyle, travel, 
               business, etc., helping you stay informed, inspired, and entertained.
              At Blog Vantage, we are a team of passionate writers, researchers, and 
              industry experts who believe in the power of knowledge-sharing.Our blog is designed to provide 
              valuable 
              content that resonates with our readers.</p>
            <p><span>Email: </span>balia@gmail.com</p>
            <p><span>Phone: </span>6372238671</p>
          </div>
          <div className='quick_links'>
            <h3>Quick Links</h3>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/blogs"}>Blogs</Link>
              <Link to={"/about"}>ABout</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </ul>
          </div>
          <div className='categories'>
            <h3>Categories</h3>
            <ul>
              <li>LifeStyle</li>
              <li>Technology</li>
              <li>Sports</li>
              <li>Travels</li>
              <li>Business</li>
              <li>Economy</li>
            </ul>
          </div>
          {/* <div className="news_letter">
            <div>
              <h3>Weekly NewsLetter</h3>
              <p>Get Blog articles</p>
            </div>
            <div>
              <input type="text" placeholder='Your Email' />
              <button>Subscribe</button>
            </div>
          </div> */}
        </div>
        <div className='container'>
          <div className="logo">Blog <span>Vantage</span></div>
          <div className="links">
            <Link to={"/"} target='_blank'><AiFillInstagram /></Link>
            <Link to={"/"} target='_blank'><AiFillYoutube /></Link>
            <Link to={"/"} target='_blank'><AiFillGithub /></Link>
            <Link to={"/"} target='_blank'><AiFillLinkedin /></Link>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer