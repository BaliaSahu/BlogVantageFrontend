import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const UpdateVideoBlog = () => {
      const [category, setCategory] = useState("");
      const [video1, setVideo1] = useState("");
      const [video1Preview, setVideo1Preview] = useState("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg")
      const [title1, setTitle1] = useState("");
      const [desc1, setDesc1] = useState("");
      const [video2, setVideo2] = useState("");
      const [video2Preview, setVideo2Preview] = useState("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg")
      const [title2, setTitle2] = useState("");
      const [desc2, setDesc2] = useState("");
      const [secure_url, setSecureUrl] = useState("");
      const [public_id, setPublicId] = useState("");
      const [secure_url2, setSecureUrl2] = useState("");
      const [public_id2, setPublicId2] = useState("");


      const { id } = useParams();
      const { mode, isAuthenticated } = useContext(Context);
      useEffect(() => {
            const fetchBlog = async (e) => {
                  e?.preventDefault();
                  try {
                        // const { data } = await axios.get(`http://localhost:4000/user/videoblog/${id}`,
                        const { data } = await axios.get(`https://blogvantagebackend-2.onrender.com/user/videoblog/${id}`,
                              { withCredentials: true }
                        )
                        console.log(data);
                        setTitle1(data.blog.title1);
                        setDesc1(data.blog.desc1);
                        setCategory(data.blog.category);
                        console.log(data.blog.video1.url)
                        setVideo1(data.blog.video1.url);

                        setSecureUrl(data.blog.video1.url);
                        setPublicId(data.blog.video1.public_id);

                        setSecureUrl2(data.blog.video2.url);
                        setPublicId2(data.blog.video2.public_id);

                        setVideo1Preview(data.blog.video1.url)
                        data.blog.video2 && setVideo2(data.blog.video2.url);
                        data.blog.title2 && setTitle2(data.blog.title2);
                        data.blog.desc2 && setDesc2(data.blog.desc2);
                        data.blog.video2 && setVideo2Preview(data.blog.video2.url)

                  } catch (err) {
                        console.log(err);
                        toast.error(err?.response?.data?.message);
                  }
            }
            fetchBlog();
      }, [id]);
      const handleUpdate = async (e) => {
            e?.preventDefault();
            try {
                  const updatedData = new FormData();
                  updatedData.append("title1", title1);
                  updatedData.append("category", category);
                  updatedData.append("desc1", desc1);
                  updatedData.append("title2", title2);
                  updatedData.append("desc2", desc2);
                  updatedData.append("secure_url", secure_url);
                  updatedData.append("public_id", public_id);
                  console.log(secure_url, public_id);
                  console.log(secure_url2, public_id2);
                  updatedData.append("secure_url2", secure_url2);
                  updatedData.append("public_id2", public_id2);

                  // const { data } = await axios.patch(`http://localhost:4000/author/update/video/blogs/${id}`, updatedData,
                  const { data } = await axios.patch(`https://blogvantagebackend-2.onrender.com/author/update/video/blogs/${id}`, updatedData,
                        {
                              withCredentials: true,
                              headers: { "Content-Type": "multipart/form-data" }
                        }
                  )
                  console.log(data);
                  toast.success("Blog Updated Successfully");
            } catch (err) {
                  console.log(err);
                  toast.error(err?.response?.data?.message || "Failed to update blog.");
            }

      }
      const mainVideoHandler = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setVideo1(file);
                  setVideo1Preview(URL.createObjectURL(file));
            }
      }
      const paraVideoHandler = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setVideo2(file);
                  setVideo2Preview(URL.createObjectURL(file));
            }

      }
      const mainVideoUpload = async (e) => {
            e?.preventDefault();
            if (!video1) return toast.error("Please select a video first.");
            const fd = new FormData();
            fd.append("file", video1);
            fd.append("upload_preset", "videos");
            try {
                  let api = "https://api.cloudinary.com/v1_1/dgpfa1vxf/video/upload";
                  const res = await axios.post(api, fd);
                  setSecureUrl(res.data.secure_url);
                  setPublicId(res.data.public_id);
                  toast.success("Video Uploaded");
                  console.log("HHHHIHI")
            } catch (err) {
                  console.log(err);
                  toast.error("Video Not Uploaded!");
            }
      }
      const paraVideoUpload = async (e) => {
            e?.preventDefault();
            if (!video2) return toast.error("Please select a video first.");
            const fd = new FormData();
            fd.append("file", video2);
            fd.append("upload_preset", "videos");

            try {
                  let api = "https://api.cloudinary.com/v1_1/dgpfa1vxf/video/upload";
                  const res = await axios.post(api, fd);
                  setSecureUrl2(res.data.secure_url)
                  setPublicId2(res.data.public_id);
                  toast.success("Video Uploaded");
            } catch (err) {
                  console.log(err);
                  toast.error("Video Not Uploaded!");
            }
      }
      if (!isAuthenticated) {
            return (
                  <Navigate to="/"></Navigate>
            )
      }

      return (
            <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
                  <section className="update-blog">
                        <h3>UPDATE VIDEO BLOG</h3>
                        <form >
                              <div className="category-box">
                                    <label>Category</label>
                                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                              </div>
                              <input type="text" placeholder='Blog Main Title' value={title1} onChange={(e) => setTitle1(e.target.value)} />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label >Blog Main Video</label>
                                    <video src={video1Preview ? `${video1Preview}` : `${secure_url}`} alt="video" controls />
                              </div>
                              <div style={{ display: "flex", flexDirection: "column" }}><input type="file" onChange={mainVideoHandler} style={{ border: "none" }} />
                                    <button className='update-btn' onClick={mainVideoUpload}>UPLOAD</button>
                              </div>
                              <br />
                              <br />
                              <label>{desc1.length}(Max:1050,min:100)</label>
                              <textarea rows={30} className='intro' value={desc1} placeholder='Blog Description' onChange={(e) => setDesc1(e.target.value)}></textarea>
                              <div className="sub-para">
                                    <input type="text" placeholder='Paragraph One Title' value={title2} onChange={(e) => setTitle2(e.target.value)} />
                                    <video src={video2Preview ? `${video2Preview}` : `${secure_url2}`} controls alt="video" />
                              </div>
                              <div style={{display:"flex",flexDirection:"column"}}>
                                    <input type="file"
                                          onChange={paraVideoHandler}
                                          style={{ border: "none" }}
                                    />
                                    <button onClick={paraVideoUpload} className='update-btn'>UPLOAD</button>

                              </div>
                              <br />
                              <br />
                              <label>{desc2.length}(Max:1050,min:100)</label>
                              <textarea rows={30} className='intro' placeholder='Blog Description' value={desc2} onChange={(e) => setDesc2(e.target.value)}></textarea>

                              <button type="submit" onClick={handleUpdate} className='update-btn'>
                                    UPDATE BLOG
                              </button>
                        </form>
                  </section>
            </article>
      )
}

export default UpdateVideoBlog