import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const CreateVideoBlog = () => {
      const [category, setCategory] = useState("");
      const [title1, setTitle1] = useState("");
      const [title2, setTitle2] = useState("");
      const [video1, setVideo1] = useState(null);
      const [video2, setVideo2] = useState(null);
      const [video1Preview, setVideo1Preview] = useState("");
      const [video2Preview, setVideo2Preview] = useState("");
      const [desc1, setDesc1] = useState("");
      const [desc2, setDesc2] = useState("");

      const handleBlog = async (e) => {
            e.preventDefault();

            try {
                  const formData = new FormData();
                  formData.append("category", category);
                  formData.append("title1", title1);
                  formData.append("title2", title2);
                  formData.append("desc1", desc1);
                  formData.append("desc2", desc2);


                  formData.append("file", video1);
                  const allowedVideoFormats = ['video/mp4', 'video/webm', 'video/ogg']
                  if (!allowedVideoFormats.includes(video1.type) ) {
                        console.log(video1)
                        throw new Error("Invalid Video Format");
                  }
                  formData.append("upload_preset", "videos");

                  let api = "https://api.cloudinary.com/v1_1/dgpfa1vxf/video/upload";
                  const res = await axios.post(api, formData);
                  let secure_url2;
                  let public_id2;

                  console.log("Uploaded Video URL:", res.data.secure_url);
                  console.log("Uploaded Video Public_id", res.data.public_id);
                  formData.append("secure_url", res.data.secure_url)
                  formData.append("public_id", res.data.public_id)

                  if (video2) {
                        if (!allowedVideoFormats.includes(video2.type)) {
                              // console.log(video2.mimetype)
                              throw new Error("Invalid Video Format");
                        }
                        const fd2 = new FormData();
                        let api2 = "https://api.cloudinary.com/v1_1/dgpfa1vxf/video/upload";
                        fd2.append("file", video2);
                        fd2.append("upload_preset", "videos");
                        const res2 = await axios.post(api2, fd2);
                        console.log("Uploaded Video URL:", res2.data.secure_url);
                        console.log("Uploaded Video Public_id", res2.data.public_id);
                        secure_url2 = res2.data.secure_url;
                        public_id2 = res2.data.public_id;
                  }

                  formData.append("secure_url2", secure_url2);
                  formData.append("public_id2", public_id2);

                  const {data}=await axios.post("http://localhost:4000/author/create/videoblog",formData,
                  // const {data}=await axios.post("https://blogvantagebackend-2.onrender.com/author/create/videoblog",formData,
                        {
                              withCredentials:true
                        }
                  )
                  // console.log(data);
                  toast.success("Video Blog Uploaded Sucessfull!");
            }
            catch (err) {
                  console.log(err);
                  toast.error("Video Blog Uploads Unsucessfull !!");
            }
      }
      const mainVideoHandler = async (e) => {
            const file = e.target.files[0];
            if (file) {
                  setVideo1(file);
                  setVideo1Preview(URL.createObjectURL(file));
            }
      }
      const paraVideoHandler = async (e) => {
            const file = e.target.files[0];
            if (file) {
                  setVideo2(file);
                  setVideo2Preview(URL.createObjectURL(file));
            }
      }
      return (
            <section className='create-blog'>
                  <h3>Create Video Blog</h3>
                  <div className="container">
                        <form onSubmit={handleBlog}>
                              <div className="category-box">
                                    <label>Category</label>
                                    <input placeholder='required' required type="text" onChange={(e) => setCategory(e.target.value)} />
                              </div>

                              <input type="text" required placeholder='Blog Main Title Required' value={title1} onChange={(e) => setTitle1(e.target.value)} />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label htmlFor="">Blog Main Video-Required</label>
                                    <video src={video1Preview ? `${video1Preview}` : "//"} controls alt="video1" />
                              </div>
                              <input type="file" required onChange={mainVideoHandler} style={{ border: "none" }} />
                              <label htmlFor="">{desc1.length}(Max Length-1050)</label>
                              <textarea rows={30} required className='intro' placeholder='Blog Description min-100,max-500,required' onChange={(e) => setDesc1(e.target.value)}></textarea>
                              <input type="text" placeholder='Blog para Title' value={title2} onChange={(e) => setTitle2(e.target.value)} />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label htmlFor="">Blog Secondary Video</label>
                                    <video src={video2Preview ? `${video2Preview}` : "//"} controls alt="video2" />
                              </div>
                              <input type="file" onChange={paraVideoHandler} style={{ border: "none" }} />
                              <label htmlFor="">{desc2.length} (Max Length-1050)</label>
                              <textarea rows={30} className='intro' placeholder='Blog Description min-100,max-450' onChange={(e) => setDesc2(e.target.value)}></textarea>
                              <button type='submit' className='create-btn'>CREATE</button>
                        </form>
                  </div>
            </section>
      )
}

export default CreateVideoBlog