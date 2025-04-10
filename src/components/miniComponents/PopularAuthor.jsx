import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const PopularAuthor = () => {
  const [authors,setAuthors]=useState([])
  useEffect(()=>{
    const fetchUser=async()=>{
      const {data}=await axios.get("http://localhost:4000/user/get/allauthor",{withCredentials:true})
      // const {data}=await axios.get("https://blogvantagebackend-2.onrender.com/get/allauthor",{withCredentials:true})
      setAuthors(data);

      console.log(data);
      console.log(data.details)
      console.log(authors)
    }
    fetchUser()
  },[])
  return (
   <section className='popularAuthors'>
    <h3 >Authors</h3>
    <div className='container'>
      {
        authors && authors.length>0 ? (authors.slice(0,4).map(element=>{
          return(
            <div className="card" key={element._id}>
              <img src={element.avatar.url} alt="author" />
              <p>{element.name} </p>
              <p>{element.role}</p>
              <Link to={`profile/${element._id}`}>VIEW</Link>
            </div>
          )
        })) : <BeatLoader size={30} color="gray"></BeatLoader> 
      }
    </div>
   </section>
  )
}

export default PopularAuthor