import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { data } from 'react-router-dom';

const CreateBlog = () => {
  const [category, setCategory] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo1Preview, setPhoto1Preview] = useState("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg")
  const [title1, setTitle1] = useState("");
  const [desc1, setDesc1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo2Preview, setPhoto2Preview] = useState("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg")
  const [title2, setTitle2] = useState("");
  const [desc2, setDesc2] = useState("");


  const mainImageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPhoto1Preview(reader.result)
      setPhoto1(file)
    }
  }
  const paraImageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPhoto2Preview(reader.result)
      setPhoto2(file)
    }
  }
  const handleBlog = async (e) => {

    e?.preventDefault();
    const formData = new FormData();
    console.log(title1, desc1, category, title2, desc2)
    formData.append("category", category);
    formData.append("title1", title1);
    formData.append("desc1", desc1);
    formData.append("photo1", photo1);

    if (title2.length >= 3) {
      formData.append("title2", title2);
    }
    if (desc2.length >= 30) {
      formData.append("desc2", desc2);
    }
    if (photo2) {
      formData.append("photo2", photo2);
    }

    try {
      // const { data } = await axios.post("http://localhost:4000/author/create/blogs", formData,
      const { data } = await axios.post("https://blogvantagebackend-2.onrender.com/author/create/blogs", formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        })
      setTitle1("");
      setDesc1("");
      setCategory("");
      setPhoto1("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg");
      setTitle2("");
      setDesc2("");
      setPhoto2("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg");

      setPhoto1Preview("")
      setPhoto2Preview("");

      // console.log(data);
      toast.success("Blog Created Successfully.");
    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
    }
  }
  return (
    <>

      <section className='create-blog'>
        <h3>CREATE BLOG</h3>
        <div className="container">
          <form onSubmit={handleBlog}>
            <div className="category-box">
              <label>Category</label>
              <input type="text" onChange={(e) => setCategory(e.target.value)} />
            </div>
            <input type="text" placeholder='Blog Main Title' value={title1} onChange={(e) => setTitle1(e.target.value)} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="">Blog Main Image</label>
              <img src={photo1Preview ? `${photo1Preview}` : "//"} alt="image1" />
            </div>
            <input type="file" onChange={mainImageHandler} style={{ border: "none" }} />

            <label>{desc1.length}(Max:1050,min:100)</label>
            <textarea rows={30} className='intro' placeholder='Blog Description' onChange={(e) => setDesc1(e.target.value)}></textarea>
            <div className="sub-para">
              <input type="text" placeholder='Paragraph One Title' value={title2} onChange={(e) => setTitle2(e.target.value)} />
              <img src={photo2Preview ? `${photo2Preview}` : "//"} alt="img2" />
            </div>
            <input type="file"
              onChange={paraImageHandler}
              style={{ border: "none" }}
            />
            <label>{desc1.length}(Max:1050,min:100)</label>
            <textarea rows={30} className='intro' placeholder='Blog Description' onChange={(e) => setDesc2(e.target.value)}></textarea>

            <button type="submit" className='create-btn'>
              CREATE BLOG
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default CreateBlog