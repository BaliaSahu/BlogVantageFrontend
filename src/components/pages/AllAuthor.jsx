import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import { elements } from 'chart.js';
import { Link } from 'react-router-dom';

const AllAuthor = () => {
  const { mode, setMode } = useContext(Context);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // const { data } = await axios.get("http://localhost:4000/user/get/allauthor",
        const { data } = await axios.get("https://blogvantagebackend-2.onrender.com/user/get/allauthor",
          { withCredentials: true })
        console.log(data);
        setAuthors(data);

      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchAuthors()
  }, []);
  return (
    <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}>
      <h2>ALL AUTHORS</h2>
      <div className='container' id="cardCont">
        {
          authors && authors.length > 0 ? (authors.map(element => {
            return (
              <Link  to={`/profile/${element._id}`}>
                <div className="card" id="card" key={element._id}>
                  <img id="cimg" src={element.avatar.url} alt="author Avatar" />
                  <h3>{element.name}</h3>
                  <p>{element.role}</p>
                  
                </div>
              </Link>
            )
          })) : <BeatLoader size={50} color="gray" style={{ padding: "200px 0" }} />
        }
      </div>

    </article>
  )
}

export default AllAuthor