import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from 'react';
import { Context } from '../../main';
import { elements } from 'chart.js';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';


const TrendingBlog = () => {
  const { blogs } = useContext(Context)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1234 },
      items: 4,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: 1234, min: 1005 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div className='trending'>
      <h3>BLOGS</h3>
      <Carousel responsive={responsive}>
        {
          blogs && blogs.length > 0 ?
            (blogs.slice(0, 6)).map(element => {
              return (
                <Link to={`/blogs/${element._id}`} className='card' key={element._id}>
                  <img src={element.photo1.url} alt="blog" className='blogImg' />
                  <span className='category'>
                    {element.category}
                  </span>
                  <h4>{element.title}</h4>
                  <div className="writer_section">
                    <div className="author">
                      <img src={element.authorId.avatar.url} alt="authoravtar" />
                      <p>{element.authorName}</p>
                    </div>
                  </div>
                </Link>
              )
            }) : <BeatLoader size={30} color="gray"></BeatLoader>
        }
      </Carousel>
    </div>
  )



}

export default TrendingBlog