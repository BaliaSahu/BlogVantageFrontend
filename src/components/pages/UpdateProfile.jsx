import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
      const { mode, user,isAuthenticated ,setUser} = useContext(Context);
      const [name, setName] = useState("");
      const [phone, setPhone] = useState("");
      const [password, setPassword] = useState("");
      const [education, setEducation] = useState("");
      const [avatarPreview, setAvatarPreview] = useState("");
      const [avatar, setAvatar] = useState("");
      const { id } = useParams();

      useEffect(() => {
            setName(user.name);
            setPhone(user.phone);
            setEducation(user.education);
      }, []);
      const handleUpdate = async (e) => {
            e?.preventDefault();
            const fd = new FormData();
            fd.append("name", name);
            fd.append("phone", phone);
            fd.append("password", password);
            fd.append("education", education);
            fd.append("avatar", avatar);
            try {
                  const { data } = await axios.patch("http://localhost:4000/profile/edit",
                        fd
                        , {
                              withCredentials: true,
                              headers: { "Content-Type": "multipart/form-data" }
                        });
                  console.log(data);
                  setUser(data);
                  toast.success("Profile Updation Successfull.");
            } catch (err) {
                  console.log(err);
                  toast.error("Profile Updation Failed!");
            }

      }
      const avatarHandler = (e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                  setAvatarPreview(reader.result)
                  setAvatar(file)
            }
      }
      if(!isAuthenticated){
            return <Navigate to={"/"}></Navigate>
      }
      return (
            <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
                  <section className={"auth-form"} >
                        <form onSubmit={handleUpdate}>
                              <h1>PROFILE UPDATE</h1>
                              <div>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
                              </div>
                              <div>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Your Phone' />
                              </div>
                              <div>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your New Password' />
                              </div>
                              <select value={education} onChange={(e) => setEducation(e.target.value)}>
                                    <option value="">SELECT YOUR HIGHEST EDUCATION</option>
                                    <option value="Matric">Matric</option>
                                    <option value="Higher Secondary">Higher Secondary</option>
                                    <option value="Degree">Degree</option>
                                    <option value="Masters">Masters</option>
                              </select>
                              <div style={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
                                    <div className='avatar'>
                                          <img src={avatarPreview ? `${avatarPreview}` : ""} alt="avatar" />
                                    </div>
                                    <input type="file" onChange={avatarHandler} className='avatar_input_tag' style={{ border: "none" }} />
                              </div>
                              <button type='submit' className='submit-btn'>UPDATE</button>
                        </form>
                  </section>
            </article>
      )
}

export default UpdateProfile