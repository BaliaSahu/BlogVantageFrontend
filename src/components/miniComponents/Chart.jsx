import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
} from "chart.js"
import { Doughnut } from 'react-chartjs-2'
import toast from 'react-hot-toast';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Chart = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [myVideoBlogs, setMyVideoBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState(0);
  const [notLikedBlogs, setNotLikedBlogs] = useState(0);
  const [reportedBlogs, setReportedBlogs] = useState(0);
  const [likedVideoBlogs, setLikedVideoBlogs] = useState(0);
  const [notLikedVideoBlogs, setNotLikedVideoBlogs] = useState(0);
  const [reportedVideoBlogs, setReportedVideoBlogs] = useState(0);
  useEffect(() => {
    const fetchMyBlogs = async () => {
      console.log("fetchMyBlogs");
      try {
        // const { data } = await axios.get("http://localhost:4000/author/view/blogs", { withCredentials: true });
        const { data } = await axios.get("https://blogvantagebackend-2.onrender.com/author/view/blogs", { withCredentials: true });
        setMyBlogs(data)
        console.log(data);
        const totalLikes = data.reduce((acc, blog) => acc + blog.likedBy.length, 0);
        const totalDislikes = data.reduce((acc, blog) => acc + blog.dislikedBy.length, 0);
        const totalReports = data.reduce((acc, blog) => acc + blog.reportBy.length, 0);
        setLikedBlogs(totalLikes);
        setNotLikedBlogs(totalDislikes);
        setReportedBlogs(totalReports);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
    const fetchMyVideoBlogs = async () => {
      console.log("Video Blogs");
      try {
        // const { data } = await axios.get("http://localhost:4000/author/view/videoblog", { withCredentials: true })
        const { data } = await axios.get("https://blogvantagebackend-2.onrender.com/author/view/videoblog", { withCredentials: true })
        setMyVideoBlogs(data)
        console.log(data);
        const totalLikes = data.reduce((acc, blog) => acc + blog.likedBy.length, 0);
        const totalDislikes = data.reduce((acc, blog) => acc + blog.dislikedBy.length, 0);
        const totalReports = data.reduce((acc, blog) => acc + blog.reportBy.length, 0);
        setLikedVideoBlogs(totalLikes);
        setNotLikedVideoBlogs(totalDislikes);
        setReportedVideoBlogs(totalReports);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
    fetchMyBlogs();
    fetchMyVideoBlogs();
  }, []);
  

  console.log(likedBlogs);
  const data = {
    labels: ["Liked", "Not Liked", "report", "Blog Video Liked", "Blog Video Not Liked", "Blog Video report"],
    datasets: [
      {
        label: "Blogs",
        data: [
          likedBlogs,
          notLikedBlogs,
          reportedBlogs,
          likedVideoBlogs,
          notLikedVideoBlogs,
          reportedVideoBlogs,
        ],
        borderColor: ["#6E26B6", "#F15D5D", "#BFD641"],
        backgroundColor: ["#17E0DC", "#E79797", "#FF0303"],
        borderWidth: 1,
      }
    ]
    // 
    // 
  }
  return (
    <section className='chart-container' style={{ height: "90vh" }}>
      <h3>BLOG ANALYTICS</h3>
      <Doughnut data={data} style={{ height: "550px" }}></Doughnut>
      <ul>
        <li>BLOG LIKED: <span>{likedBlogs}</span></li>
        <li>BLOG NOT LIKED: <span>{notLikedBlogs}</span></li>
        <li>REPORTED BLOGS: <span>{reportedBlogs}</span></li>
        <li>BLOG VIDEO LIKED: <span>{likedVideoBlogs}</span></li>
        <li>BLOG VIDEO NOT LIKED: <span>{notLikedVideoBlogs}</span></li>
        <li>REPORTED VIDEO BLOGS: <span>{reportedVideoBlogs}</span></li>
      </ul>
    </section>
  )
}

export default Chart