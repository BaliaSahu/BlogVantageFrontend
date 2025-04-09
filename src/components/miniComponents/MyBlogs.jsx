import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ImGift } from 'react-icons/im';
import { Link } from 'react-router-dom';

const MyBlogs = () => {
  const [myBLogs, setMyBlogs] = useState([]);
  useEffect(() => {
    const fetchMyBlogs = async () => {
      console.log("fetchMyBlogs");
      try {
        // const { data } = await axios.get("http://localhost:4000/author/view/blogs", { withCredentials: true });
        const { data } = await axios.get("https://blogvantagebackend-2.onrender.com/author/view/blogs", { withCredentials: true });
        setMyBlogs(data)
        console.log(data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
    fetchMyBlogs();
  }, [])
  const deleteBlogHandler = async (id) => {
    try {
      // const { data } = await axios.delete(`http://localhost:4000/author/delete/blog/${id}`,
      const { data } = await axios.delete(`https://blogvantagebackend-2.onrender.com/author/delete/blog/${id}`,
        { withCredentials: true }
      )

      toast.success(data.message);
      setMyBlogs((prevBlogs)=> prevBlogs.filter((blog)=> blog._id !==id));
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
  return (
    <section className="my-blogs">
      {
        myBLogs && myBLogs.length > 0 ? myBLogs.map(element => {
          return (
            <div className="author-blog-card" key={element._id}>
              {element.photo1 && (<img src={element.photo1.url} alt="Main Image"></img>)}
              <br />
              <br />
              <br />
              <span className='category'>{element.category}</span>
              <h4>{element.title1}</h4>
              <div className="btn-wrapper">
                <Link to={`/blog/update/${element._id}`} className='update-btn'>UPDATE</Link>
                <button onClick={()=>deleteBlogHandler(element._id)}>DELETE</button>
                <Link to={`/blogs/${element._id}`}>VIEW</Link>
              </div>
            </div>
          )
        }): "You have'nt posted any Blog"
      }
    </section>
  )
}

export default MyBlogs