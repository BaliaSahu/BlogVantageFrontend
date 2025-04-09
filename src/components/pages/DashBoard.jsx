// import React, { useContext, useState } from 'react'
// import {Context} from '../../main'
// import { Navigate } from 'react-router-dom'
// import Sidebar from '../layout/SideBar'
// import MyProfile from '../minicomponents/MyProfile'
// import CreateBlog from '../minicomponents/CreateBlog'
// import Chart from '../minicomponents/Chart'
// import MyBlogs from '../minicomponents/MyBlogs'

// const DashBoard = () => {
//   const{mode,isAuthenticated,user}=useContext(Context)
//   const [component,setComponent]=useState("My Blogs") 

//   if(!isAuthenticated || user.role === "user" ){
//     return( <Navigate to={"/"}></Navigate>)
//   }
//   return (
//     <section className={mode==="dark" ? "dark-bg dashboard" : "light-bg dashboard"}>
//       <Sidebar component={component} setComponent={setComponent}>
//       {/* {
//         component === "My Profile" ? (<MyProfile></MyProfile>) : component === "Create Blog" ? (<CreateBlog></CreateBlog>) :
//         component === "Chart" ? <Chart></Chart> : (<MyBlogs></MyBlogs>)
//       } */}
//        {component === "MyProfile" && <MyProfile />}
//         {component === "CreateBlog" && <CreateBlog />}
//         {component === "Chart" && <Chart />}
//         {component === "MyBlogs" && <MyBlogs />}
//       </Sidebar>
//     </section>
//   )
// }

// export default DashBoard



import React, { useContext, useState } from "react";
import SideBar from "../layout/SideBar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
import Chart from "../miniComponents/Chart";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import CreateVideoBlog from "../minicomponents/CreateVideoBlog";
import MyVideoBlogs from "../minicomponents/MyVideoBlogs";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Analytics" ? (
        <Chart />
      ) : component === "Create Video Blog" ? (<CreateVideoBlog></CreateVideoBlog>)
        : component === "My Video Blog" ? (<MyVideoBlogs></MyVideoBlogs>)
          : (
            <MyBlogs />
          )}
    </section>
  );
};

export default Dashboard;
// 