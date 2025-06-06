import React, { useContext } from 'react'
import { Context } from '../../main'
// import LatestBlog from '../miniComponents/LatestBlog'
import LatestBlog from '../minicomponents/LatestBlog.jsx';



const Blogs = () => {
  const {mode,blogs}=useContext(Context)
  return (
    <article className={mode=== "dark" ? "dark-bg":"light-bg"}>
      <LatestBlog blogs={blogs}></LatestBlog>
    </article>
  )
} 

export default Blogs