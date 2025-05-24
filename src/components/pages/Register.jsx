import React, { useContext, useState } from 'react'
import {Context} from '../../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
  const [name,setName]=useState("")
  const [role,setRole]=useState("")
  const [phone,setPhone]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [education,setEducation]=useState("")
  const [avatar,setAvatar]=useState(null)
  const [avatarPreview,setAvatarPreview]=useState("")
  
  const avatarHandler=(e)=>{
    const file=e.target.files[0];

    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }
  const {mode,isAuthenticated,setUser}=useContext(Context)
  const navigateTo=useNavigate();

  const handleRegister=async(e)=>{
    e.preventDefault();
    const formData=new FormData();

    formData.append("name",name);
    formData.append("role",role);
    formData.append("email",email)
    formData.append("password",password)
    formData.append("phone",phone)
    formData.append("education",education)
    formData.append("avatar",avatar)

    console.log(formData);
    try{
        const {data}=await axios.post("http://localhost:4000/user/signup",
         formData
          ,{
          withCredentials:true,
          headers:{"Content-Type":"multipart/form-data"}
        })
        
        setUser(role)
        setName("");
        setEmail("");
        setEducation("");
        setAvatarPreview("");
        setAvatar(null);
        setPassword("");
        setPhone("");
        setRole("");

        toast.success(data.message);
        navigateTo("/")
    }catch(err){
      console.log(err.response.data)
      toast.error(err.response.data.message);
    }

  }
  if(isAuthenticated){
    return (<Navigate to={"/"}></Navigate>)
  }
  return (
    <article className={mode==="dark" ? "dark-bg": "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleRegister}>
          <h1>REGISTER</h1>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="">SELECT ROLE</option>
            <option value="user">READER</option>
            <option value="author">AUTHOR</option>
          </select>
          <div>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Your Name'/>
          </div>
          <div>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your Email'/>
          </div>
          <div>
            <input type="tel" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder='Your Phone'/>
          </div>
          <div>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Your Password'/>
          </div>
          <select value={education} onChange={(e)=> setEducation(e.target.value)}>
            <option value="">SELECT YOUR HIGHEST EDUCATION</option>
            <option value="Matric">Matric</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Degree">Degree</option>
            <option value="Masters">Masters</option>
          </select>
          <div style={{display:"flex", flexDirection:'column',alignItems:"center"}}>
            <div className='avatar'>
              <img src={avatarPreview ? `${avatarPreview}`: ""} alt="avatar" />
            </div>
            <input type="file" onChange={avatarHandler} className='avatar_input_tag' style={{border:"none"}}/>
          </div>
          <p>Already Registered ? <Link to={'/login'}>Login Now</Link></p>
          <button type='submit' className='submit-btn'>REGISTER</button>
        </form>
      </section>

    </article>
  )
}

export default Register