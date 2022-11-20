import axios from "axios";
import { Routes, Route, Router } from "react-router-dom";
import AdminLogin from "./Admin/AdminPages/AdminLogin";
import UserNotFoundPage from "./User/UserNotFoundPage";
import Login from "./User/UserPages/Login";
import Register from "./User/UserPages/Register";
import EditProfile from "./User/UserPages/EditProfile";
import ForgotPasswordForm from "./User/UserPages/ForgotPassword";
import VerifyEmailForm from "./User/UserPages/VerifyEmailCode";
import Home from "./User/UserPages/Home";
import Dashboard from "./Admin/AdminPages/Dashboard";
import WriteBlog from "./Admin/AdminPages/WriteBlog";
import AllBlogs from "./Admin/AdminPages/AllBlogs";
import EmailVerificationSuccess from "./User/UserPages/EmailVerificationSuccess";
import NewPassword from "./User/UserPages/NewPassword";
import SingleBlog from "./User/UserPages/SingleBlog";
import AllUsers from "./Admin/AdminPages/AllUsers";
import AdminForgotPassword from "./Admin/AdminPages/AdminForgotPassword";
import AdminPasswordChange from "./Admin/AdminPages/AdminPasswordChange";

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
      <Route path="/verifyemail" element={<VerifyEmailForm />} />
      <Route
        path="/registration-success/:uuid"
        element={<EmailVerificationSuccess />}
      />
      <Route path="/newPassword/:uuid" element={<NewPassword />} />
      <Route path="/blog/:blogId" element={<SingleBlog />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard/writeblog" element={<WriteBlog />} />
      <Route path="/admin/dashboard/blogs" element={<AllBlogs />} />
      <Route path="/admin/dashboard/usersinfo" element={<AllUsers />} />
      <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
      <Route
        path="/admin/passwordchange/:uuid"
        element={<AdminPasswordChange />}
      />

      {/* Page Not found */}
      <Route path="*" element={<UserNotFoundPage />} />
    </Routes>
  );
}

export default App;
