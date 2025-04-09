import React, { useContext } from 'react'
import { Context } from '../../main'
import HeroSection from '../minicomponents/HeroSection'
import TrendingBlog from '../minicomponents/TrendingBlog'
import LatestBlog from '../minicomponents/LatestBlog'
import PopularAuthor from '../minicomponents/PopularAuthor'

const Home = () => {
  const { mode, setMode, blogs } = useContext(Context)
  const filterBlogs = blogs.slice(blogs.length-6, blogs.length);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="home-body">
        <div className="intro">
          <h2 id="intro-h2">Welcome to Our Blogging Platform</h2>
          <p>Discover, learn, and share your thoughts with the world. Our platform empowers individuals to express their ideas,
            document experiences, and connect with like-minded people.</p>
        </div>

        <div className="use-cases">
          <h3 id="use-casesh3">Why Use Our Blogging Platform?</h3>
          <div className="use-case-grid">
            <div className="use-case">
              <h4>Share Your Knowledge</h4>
              <p>Write articles on topics you are passionate about and help others learn.</p>
            </div>
            <div className="use-case">
              <h4>Build Your Online Presence</h4>
              <p>Establish yourself as a thought leader by sharing valuable insights.</p>
            </div>
            <div className="use-case">
              <h4>Improve Writing Skills</h4>
              <p>Regularly writing blogs helps enhance your communication and writing abilities.</p>
            </div>
          </div>
        </div>

        <div className="learning-benefits" style={{marginTop:"40px"}}>
          <h3>How Blogging Enhances Learning?</h3>
          <p>Blogging encourages research, critical thinking, and structured content creation.
            It allows individuals to explore new topics, articulate ideas clearly, and develop analytical skills.</p>
          <ul>
            <li>Encourages self-learning and exploration.</li>
            <li>Enhances creativity and problem-solving skills.</li>
            <li>Helps in networking with professionals in various fields.</li>
            <li>Boosts confidence in writing and public communication.</li>
          </ul>
        </div>

        <div className="cta-section">
          <h3>Start Your Blogging Journey Today!</h3>
          <p id='ptag'>Sign up now and begin sharing your knowledge with the world.</p>
          <a href="/register" className="btn">Get Started</a>
        </div>
      </section>

      <HeroSection></HeroSection>
      <TrendingBlog></TrendingBlog>
      <LatestBlog blogs={filterBlogs} heading={"latestBlogs"}  ></LatestBlog>
      <PopularAuthor></PopularAuthor>
    </article>
  )
}

export default Home