import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Context } from '../../main';

const ViewProfile = () => {
      const { id } = useParams();
      const [details, setDetails] = useState({});
      const [profile,setProfile]=useState("");
      const {mode,isAuthenticated}=useContext(Context)
      useEffect(() => {
            console.log("use Effect")
            const getProfile = async () => {
                  try {
                        const { data } = await axios.get(`http://localhost:4000/profile/view/${id}`, { withCredentials: true })
                        setDetails(data.ProfileDetails);
                        console.log(data.ProfileDetails);
                        setProfile(data.ProfileDetails.avatar.url)
                  } catch (err) {
                        console.log(err);
                        setDetails({});
                  }
            }
            getProfile();
      }, []);
      if(!isAuthenticated){
            return(
                  <Navigate to="/"></Navigate>
            )
      }
      return (
            details && (
                  <article className={mode=== "dark" ? "dark-bg all-authors":"light-bg all-authors"}>
                        <h1>Profile Details</h1>
                        <img src={profile} alt="img" className='pro' />
                        <p><strong>Name:</strong> {details.name}</p>
                        <p><strong>Education: </strong> {details.education}</p>
                        <p><strong>Email: </strong> {details.email}</p>
                        <p><strong>Role: </strong>{details.role}</p>
                  </article>
            )
      )
}

export default ViewProfile