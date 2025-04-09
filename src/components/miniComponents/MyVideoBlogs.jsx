import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyVideoBlogs = () => {
      const [myBlogs, setMyBlogs] = useState([]);
      const deleteBlogHandler=async(id)=>{
            try {
                  // const { data } = await axios.delete(`http://localhost:4000/author/delete/video/blog/${id}`,
                  const { data } = await axios.delete(`https://blogvantagebackend-2.onrender.com/author/delete/video/blog/${id}`,
                    { withCredentials: true }
                  )
            
                  toast.success(data.message);
                  setMyBlogs((prevBlogs)=> prevBlogs.filter((blog)=> blog._id !==id));
                } catch (err) {
                  toast.error(err?.response?.data?.message);
                }
      }
      
      useEffect(() => {
            const fetchBlogs = async () => {
                  try {
                        // const { data } = await axios.get("http://localhost:4000/author/view/videoblog", { withCredentials: true })
                        const { data } = await axios.get("https://blogvantagebackend-2.onrender.com/author/view/videoblog", { withCredentials: true })
                        console.log(data);
                        setMyBlogs(data);
                        // toast.success("")
                  } catch (err) {
                        console.log(err);
                        toast.Error("No Blogs Found");
                  }
            }
            fetchBlogs();
      }, []);
      return (
            <section className='my-blogs'>
                  {
                        myBlogs && myBlogs.length > 0 ? myBlogs.map((element) => {
                              return (
                                    <div className='author-blog-card' key={element._id}>
                                          {element.video1 && (<video id="video1-blog-card" controls src={element.video1.url} alt="Main Image"></video>)}
                                          <span className='category'>{element.category}</span>
                                          <h4>{element.title1}</h4>
                                          <div className="btn-wrapper">
                                                <Link to={`/videoblog/${element._id}`}>VIEW</Link>
                                                <Link to={`/videoblog/update/${element._id}`} className='update-btn'>UPDATE</Link>
                                                <button onClick={() => deleteBlogHandler(element._id)}>DELETE</button>
                                          </div>
                                    </div>
                              )
                        }) : ""
                  }
            </section>
      )
}

export default MyVideoBlogs