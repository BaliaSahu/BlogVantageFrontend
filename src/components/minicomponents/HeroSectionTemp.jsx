import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
const HeroSection = () => {
  const [ran1,setRan1]=useState(0);
  const {blogs}=useContext(Context);
  useEffect(()=>{
    let r=Math.floor(Math.random()*blogs.length);
    console.log(r);
    if(r<=2){
      r=2;
    }
    setRan1(r);
  },[blogs]);
  return (
    <>
        <section className='hero'>
    {
      blogs && blogs.length >0 ? (
        blogs.slice(ran1-2,ran1).map(element=>{
          return (
            <Link to={`/blogs/${element._id}`} className='card' key={element._id}>
              <img src={element.photo1.url} alt="blog" className='blogImg' />
              <h1>{element.title}</h1>
              <div className='writer_section'>
                <div className="author">
                  <img src={element.authorId.avatar.url} alt="authorAvatar" />
                  <p>{element.authorName}</p>
                </div>
              </div>
            </Link>
          )
        })
      ):<BeatLoader size={30} color='gray'></BeatLoader>
    }
        </section>
    </>
  )
}

export default HeroSection