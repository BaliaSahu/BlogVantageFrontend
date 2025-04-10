import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { Context } from '../../main'

const UpdateBlog = () => {
  const [category, setCategory] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo1Preview, setPhoto1Preview] = useState("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg")
  const [title1, setTitle1] = useState("");
  const [desc1, setDesc1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo2Preview, setPhoto2Preview] = useState("https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg")
  const [title2, setTitle2] = useState("");
  const [desc2, setDesc2] = useState("");
  const [published, setPublished] = useState(true)
  const { id } = useParams();

  const { mode } = useContext(Context);

  useEffect(() => {
    const fetchBlog = async (e) => {
      e?.preventDefault();
      try {
        const { data } = await axios.get(`http://localhost:4000/user/blog/${id}`,
        // const { data } = await axios.get(`https://blogvantagebackend-2.onrender.com/user/blog/${id}`,
          { withCredentials: true }
        )
        console.log(data);
        setTitle1(data.blog.title1);
        setDesc1(data.blog.desc1);
        setCategory(data.blog.category);
        console.log(data.blog.photo1.url)
        setPhoto1(data.blog.photo1.url);

        setPhoto1Preview(data.blog.photo1.url)
        data.blog.photo2 && setPhoto2(data.blog.photo2.url);
        data.blog.title2 && setTitle2(data.blog.title2);
        data.blog.desc2 && setDesc2(data.blog.desc2);
        data.blog.photo2 && setPhoto2Preview(data.blog.photo2.url)

        setPublished(true);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
    fetchBlog();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("title1", title1);
      updatedData.append("category", category);
      updatedData.append("desc1", desc1);
      console.log(photo1);
      updatedData.append("photo1", photo1);
      if (title2) {
        updatedData.append("title2", title2);
      }
      if (desc2.length > 0) {
        updatedData.append("desc2", desc2);
      }
      if (photo2) {
        updatedData.append("photo2", photo2);
      }
      try {
        const { data } = await axios.patch(`http://localhost:4000/author/update/blogs/${id}`,
        // const { data } = await axios.patch(`https://blogvantagebackend-2.onrender.com/author/update/blogs/${id}`,
          updatedData,
          {
          withCredentials: true,
        })
        toast.success(data.message);
      }
      catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  }
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
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3>UPDATE BLOG</h3>
        <form>
          <div className="category-box">
            <label>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <input type="text" placeholder='Blog Main Title' value={title1} onChange={(e) => setTitle1(e.target.value)} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label >Blog Main Image</label>
              <img src={photo1Preview ? `${photo1Preview}` : "//"} alt="image1" />
            </div>
            <input type="file" onChange={mainImageHandler} style={{ border: "none" }} />
            <label >{desc1.length}(max:1050.min: 120)</label>
            <textarea rows={30} className='intro' value={desc1} placeholder='Blog Description' onChange={(e) => setDesc1(e.target.value)}></textarea>
            <div className="sub-para">
              <input type="text" placeholder='Paragraph One Title' value={title2} onChange={(e) => setTitle2(e.target.value)} />
              <img src={photo2Preview ? `${photo2Preview}` : "//"} alt="img2" />
            </div>
            <input type="file"
              onChange={paraImageHandler}
              style={{ border: "none" }}
            />
            <label>{desc2.length}(Max: 1050,min:100)</label>
            <textarea rows={30} className='intro' placeholder='Blog Description' onChange={(e) => setDesc2(e.target.value)}></textarea>
           
            <button type="submit" onClick={handleUpdate} className='update-btn'>
              UPDATE BLOG
            </button>
        </form>
      </section>
    </article>
  )
}

export default UpdateBlog