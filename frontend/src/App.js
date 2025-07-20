import "./App.css";
import "./style.scss";
import "./media-query.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import BlogDetails from "./pages/BlogDetails";
import Navbar from "./components/Navbar";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import AuthPage from "./pages/AuthPage";
import ExplorePage from "./pages/ExplorePage";
import MyStoriesPage from "./pages/MyStoriesPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import UserProfilePageWrapper from "./pages/UserProfilePageWrapper";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <ToastContainer key="toast-container" position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<BlogDetails />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/my-stories" element={<MyStoriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/user/:userId" element={<UserProfilePageWrapper />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
