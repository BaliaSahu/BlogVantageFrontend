import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Context } from "../../main";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const SideBar = ({ setComponent }) => {
  const [show, setShow] = useState(false);
  const { mode, setMode, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHome = () => {
    navigateTo("/");
  };
  const handleComponent = (value) => {
    setComponent(value);
  };
  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <RxHamburgerMenu />
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <img src={user && user.avatar.url} alt="avatar" />
          <p>{user.name}</p>
        </div>
        <ul>
          <button onClick={() => handleComponent("My Blogs")}>MY BLOGS</button>
          <button onClick={()=> handleComponent("My Video Blog")}>MY VIDEO BLOGS</button>
          <button onClick={() => handleComponent("Create Blog")}>
            CREATE BLOG
          </button>
          <button  onClick={() => handleComponent("Create Video Blog")}>
            CREATE VIDEO BLOG
          </button>
          <button onClick={() => handleComponent("Analytics")}>
            CHART
          </button>
          <button onClick={() => handleComponent("My Profile")}>
            MY PROFILE
          </button>
          <button style={{backgroundColor:"beige" ,color:"black"}} onClick={gotoHome}>HOME</button>
          <button style={{backgroundColor:"red"}} onClick={handleLogout}>LOGOUT</button>
          <button
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
            className={
              mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
            }
          >
            {mode === "light" ? (
              <CiLight className="light-icon" />
            ) : (
              <MdDarkMode className="dark-icon" />
            )}
          </button>
        </ul>
      </section>
    </>
  );
};

export default SideBar;


// import React, { useContext, useState } from "react";
// import { Context } from "../../main";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { FaArrowLeft } from "react-icons/fa";
// import { CiLight } from "react-icons/ci";
// import { MdDarkMode } from "react-icons/md";

// const SideBar = ({ component, setComponent }) => {
//   const { mode, setMode, setIsAuthenticated, user } = useContext(Context);
//   const [show, setShow] = useState(false);
//   const navigateTo = useNavigate();

//   const handleLogout = async (e) => {
//     e?.preventDefault(); // Ensure e is defined before calling preventDefault()
//     try {
//       const { data } = await axios.get("http://localhost:4000/user/logout", {
//         withCredentials: true,
//       });
//       setIsAuthenticated(false);
//       toast.success(data.message);
//       navigateTo("/"); // Redirect only after logout
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Logout failed");
//       console.log(err);
//     }
//   };
//   const handleComponent = (value) => {
//     console.log(value)
//     setComponent(value);
//     console.log(component)
//   };
//   const goToHome = () => {
//     navigateTo("/"); // Ensure this only executes when the button is clicked
//   };

//   return (
//     <>
//       <div className="icon-wrapper" onClick={() => setShow(!show)}>
//         <RxHamburgerMenu />
//       </div>
//       <section className={show ? "show-sidebar sidebar" : "sidebar"}>
//         <div className="icons-wrapper-arrow" onClick={() => setShow(!show)}>
//           <FaArrowLeft />
//         </div>
//         <div className="user-details">
//           {user?.avatar && <img src={user.avatar} alt="Profile" />}
//           <p>{user?.name || "Guest"}</p>
//         </div>
//         <ul>
//           <button onClick={() => handleComponent("MyBlogs")}>My Blogs</button>
//           <button onClick={() => handleComponent("CreateBlog")}>Create Blog</button>
//           <button onClick={() => handleComponent("Chart")}>Chart</button>
//           <button onClick={() => handleComponent("MyProfile")}>My Profile</button>
//           <button onClick={goToHome}>Home</button>
//           <button onClick={handleLogout}>Logout</button>
//           <button
//             onClick={() => setMode(mode === "dark" ? "light" : "dark")}
//             className={mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"}
//           >
//             {mode === "light" ? <CiLight className="light-icon" /> : <MdDarkMode className="dark-icon" />}
//           </button>
//         </ul>
//       </section>
//     </>
//   );
// };

// export default SideBar;
