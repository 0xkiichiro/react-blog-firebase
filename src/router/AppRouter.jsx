import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import About from "../pages/About/About.jsx";
import BlogDetail from "../pages/BlogDetail/BlogDetail";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import MyPosts from "../pages/MyPosts/MyPosts";
import Register from "../pages/Register/Register";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<BlogDetail />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
