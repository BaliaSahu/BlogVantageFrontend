import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom';

const VideoBlogs = () => {
      const { mode, videoBlogs } = useContext(Context);
      return (
            <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
                  <div className="container" id="cont">
                        {
                              videoBlogs && videoBlogs.map(element => {
                                    return (
                                          <Link  to={`/videoblog/${element._id}`} key={element._id} className='card' id="cd">
                                                <video id="video1-blog-card" src={element.video1.url} alt="main video" />
                                                <span id="vc">{element.category}</span>
                                                <h4>{element.title1}</h4>
                                                <div className="writer_section" id="ws"> 
                                                      <div className="author">
                                                            <img src={element.authorId.avatar.url} alt="authoravtar" />
                                                            <p id="wsap" style={{color:"green",textDecoration:"none"}}>{element.authorName}</p>
                                                      </div>
                                                </div>
                                          </Link>
                                    )
                              })
                        }
                  </div>
            </article>
      )
}

export default VideoBlogs