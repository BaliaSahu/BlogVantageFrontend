import React from 'react'
import { Link } from 'react-router-dom'

const LatestBlog = ({heading, newClass, blogs}) => {
  // console.log(blogs)
  return (
    <section className={newClass && newClass.length > 0 ? "dashboard-blogs ?" : "blogs"}>
      <h3>{heading}</h3>
      <div className="container">
        {
          blogs && blogs.map(element => {
            return (
              <Link to={`/blogs/${element._id}`} key={element._id} className='card'>
                <img src={element.photo1.url} alt="main image" />
                <span>{element.category}</span>
                <h4>{element.title1}</h4>
                <div className="writer_section">
                  <div className="author">
                    <img src={element.authorId.avatar.url} alt="authoravtar" />
                    <p>{element.authorName }</p>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}

export default LatestBlog