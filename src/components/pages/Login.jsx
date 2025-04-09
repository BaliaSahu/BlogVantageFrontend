import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Context } from '../../main'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("");
  const { mode,user,setUser, setMode, isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();



  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:4000/user/login",
        {
          email,
          password
        }
        , {
          withCredentials: true,
          // headers: { "Content-Type": "application/json" }
        })
      toast.success(data.message);
      
      // console.log(role);
      console.log(data)
      setEmail("")
      setPassword("")
      console.log("eta")
      setIsAuthenticated(true)
      setRole(data.details.role)
      console.log("etak")
      await setUser({
        role,
        ...data.details
      })
      console.log(user)
      navigateTo("/");
      console.log(user)
    }
    catch (err)  {
      toast.error(err.message)
    }
  }
  if (isAuthenticated) {
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {/* <select value={role}  onChange={(e) => setRole(e.target.value)} >
            <option value="Select">Select</option>
            <option value="author">Author</option>
            <option value="user">User</option>
          </select> */}
          <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' />
          </div>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your Password' />
          </div>

          <p> Register ? <Link to={'/register'}>Register Now</Link></p>
          <button type='submit' className='submit-btn'>Login</button>
        </form>
      </section>
    </article>
  )
}

export default Login