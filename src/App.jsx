import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import BLogList from "./pages/BLogList";
import AddEditBlog from "./pages/AddEditBlog";
import BlogDetails from "./pages/BlogDetails";
import ProtectedRoute from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import PublicRoute from "./components/PublicRoute";

function App(){
  const {user, logout} = useAuth();
  return (
    <div>

      <ToastContainer />
    

      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          
          } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
          
          } />
        <Route path="/" element={
          <ProtectedRoute>
             <BLogList />
          </ProtectedRoute>
          } />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddEditBlog />
          </ProtectedRoute>
          
          } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <AddEditBlog />
          </ProtectedRoute>
          
          } />
        <Route path="/blog/:id" element={
          <ProtectedRoute>
            <BlogDetails />
          </ProtectedRoute>
          } />

        <Route path="*" element={<PageNotFound />}/>
      </Routes>



    </div>
       
       
    
    
    
  )
}

export default App;