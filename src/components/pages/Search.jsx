import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';

const Search = () => {
      const { mode, setMode, isAuthenticated } = useContext(Context);
      const [searchText, setSearchText] = useState("");
      const [searchBlogs, setSearchBlogs] = useState([]);

      const searchHandler = async () => {
            try {
                  const { data } = await axios.get(`http://localhost:4000/user/search/${searchText}`, {
                  // const { data } = await axios.get(`https://blogvantagebackend-2.onrender.com/user/search/${searchText}`, {
                        withCredentials: true
                  })
                  console.log(data);

                  if (Array.isArray(data)) {
                        setSearchBlogs(data);
                  } else {
                        setSearchBlogs([]);
                  }
                  toast.success("Searching sucessfull");
            } catch (err) {
                  setSearchBlogs([]);
                  toast.error("error Searching Blogs");
                  console.log(err);
            }
      }

      if (!isAuthenticated) {
            return (
                  <Navigate to={"/"}></Navigate>
            )
      }
      return (
            // <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}>
            //       <h2>Search</h2>
            //       <input type="text" value={searchText} style={{ width: "60%", alignItems: "center", padding: "5px", borderRadius: "5px" }} onChange={(e) => setSearchText(e.target.value)} placeholder='Search By Blog Category Or Author Name' />
            //       <button id='btn-search' onClick={searchHandler}><FaSearch />Search</button>
            //       <div className='container'>
            //             <div><h4>Search Results Related To Author And it's Post</h4></div>
            //             <br />
            //             {
            //                   searchBlogs && searchBlogs.length > 0 ? searchBlogs.map(element => {
            //                         return (
            //                               <div className="author-blog-card" key={element._id}>
            //                               {element.photo1 && (<img src={element.photo1.url} alt="Main Image"></img>)}
            //                               {element.video1 && (<video src={element.video1.url} controls alt="Main video"></video>)}
            //                               <span className='category'>{element.category}</span>
            //                               <h4>{element.title1}</h4>
            //                               <div className="btn-wrapper">
            //                                     {
            //                                           element.photo1 && <Link to={`/blogs/${element.Id}`}>VIEW BLOG</Link>
            //                                     }
            //                                     {
            //                                           element.video1 && <Link to={`/videoblog/${element.Id}`}>VIEW BLOG</Link>
            //                                     }
            //                               </div>
            //                         </div>
            //                         )
            //                   })
            //                         : "No Result Found!"
            //             }
            //       </div>

            // </article>
            <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}>
                  <h2 style={{ textAlign: "center" }}>Search</h2>
                  <div style={{ display: "flex", textAlign: "center", marginBottom: "15px" }}>
                        <input
                              type="text"
                              value={searchText}
                              style={{
                                    width: "60%",
                                    padding: "8px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    outline: "none"
                              }}
                              onChange={(e) => setSearchText(e.target.value)}
                              placeholder="Search By Blog Category Or Author Name"
                        />
                        <button
                              id="btn-search"
                              onClick={searchHandler}
                              style={{
                                    marginLeft: "10px",
                                    padding: "8px 12px",
                                    border: "none",
                                    borderRadius: "5px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px"
                              }}
                        >
                              <FaSearch /> Search
                        </button>
                  </div>
                  <div className="container" style={{display:"flex",flexDirection:"column"}}>
                        <div><h4 style={{ textAlign: "center", marginBottom: "10px" }}>Search Results Related To Author And Their Posts</h4></div>
                        <div style={{display:"flex", flexWrap:"wrap",flexDirection:"row"}}>
                              {searchBlogs && searchBlogs.length > 0 ? (
                                    searchBlogs.map(element => (
                                          <div
                                                key={element._id}
                                                style={{
                                                      padding: "15px",
                                                      margin: "10px 0",
                                                      borderRadius: "10px",
                                                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                                      textAlign: "center"
                                                }}
                                          >
                                                {element.photo1 && (
                                                      <img
                                                            src={element.photo1.url}
                                                            alt="Main Image"
                                                            style={{ width: "90%", borderRadius: "5px", marginBottom: "10px" }}
                                                      />
                                                )}
                                                {element.video1 && (
                                                      <video
                                                            src={element.video1.url}
                                                            controls
                                                            style={{ height: "500px", width: "100%", borderRadius: "5px", marginBottom: "10px" }}
                                                      />
                                                )}
                                                <span
                                                      style={{
                                                            display: "block",
                                                            fontSize: "14px",
                                                            color: "#fff",
                                                            marginBottom: "5px",
                                                            fontWeight: "bold"
                                                      }}
                                                >
                                                      {element.category}
                                                </span>
                                                <h4>{element.title1}</h4>

                                                <div style={{ marginTop: "10px" }}>
                                                      {element.photo1 && (
                                                            <Link
                                                                  to={`/blogs/${element._id}`}
                                                                  style={{
                                                                        padding: "6px 12px",
                                                                        backgroundColor: "#28a745",
                                                                        color: "#fff",
                                                                        borderRadius: "5px",
                                                                        textDecoration: "none",
                                                                        marginRight: "10px"
                                                                  }}
                                                            >
                                                                  VIEW BLOG
                                                            </Link>
                                                      )}
                                                      {element.video1 && (
                                                            <Link
                                                                  to={`/videoblog/${element._id}`}
                                                                  style={{
                                                                        padding: "6px 12px",
                                                                        backgroundColor: "#dc3545",
                                                                        color: "#fff",
                                                                        borderRadius: "5px",
                                                                        textDecoration: "none"
                                                                  }}
                                                            >
                                                                  VIEW BLOG
                                                            </Link>
                                                      )}
                                                </div>
                                          </div>
                                    ))
                              ) : (
                                    <p style={{ textAlign: "center", color: "#888" }}>No Result Found!</p>
                              )}
                        </div>
                  </div>
            </article>

      )
}

export default Search