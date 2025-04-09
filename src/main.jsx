import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
export const Context=createContext({
  isAuthenticated:false,
})

import App from './App.jsx'

const AppWrapper=()=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const[user,setUser]=useState({});
  const[blogs,setBlogs]=useState([]);
  const [videoBlogs,setVideoBlogs]=useState([]);
  const[mode,setMode]=useState("dark")
  
  return(
    <Context.Provider value={
      {isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        videoBlogs,setVideoBlogs,
      blogs,setBlogs,mode,setMode
    }}>
      <App></App>
    </Context.Provider>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
