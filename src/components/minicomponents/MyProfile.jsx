import React, { useContext } from 'react'
import{Context} from '../../main'
import { Link } from 'react-router-dom'

const MyProfile = () => {
  const {mode,user}=useContext(Context)
  return (
    <section className='profile'>
      <div className="avatar">
        <img src={user && user.avatar.url} alt="avatar" />
      </div>
      <div className="user-detail">
        <p>Name :<span>{user.name}</span></p>
        <p>Email :<span>{user.email}</span></p>
        <p>Phone :<span>{user.phone}</span></p>
        <p>Education :<span>{user.education}</span></p>
        <p>Role :<span>{user.role}</span></p>
        <Link to={'/profile/update'}>UPDATE</Link>
      </div>
    </section>
  )
}

export default MyProfile