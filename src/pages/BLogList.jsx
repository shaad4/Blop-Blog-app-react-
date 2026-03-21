import {  collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import "./BlogList.css";
import { useAuth } from '../context/AuthContext'

export default function BLogList() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const {logout, user} = useAuth()
    const navigate = useNavigate()

    
    useEffect(()=>{
        const fetchBlogs = async () => {
            try{
                const snapshot = await getDocs(collection(db, "blogs"));

                const data = snapshot.docs.map((doc) => ({
                    id : doc.id,
                    ...doc.data(),
                }));
                setBlogs(data);
            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false)
            }
            
        };
        fetchBlogs();
    }, []);

    const handleLogout = async () => {
        try{
            await logout();
            toast.success("Logged Out");
            navigate("/login")
        }catch(error){
            toast.error(error.message);
        }
    

    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this blog?");
        if (!confirmDelete) return;

        try{
            await deleteDoc(doc(db, "blogs", id));
            toast.success("Deleted");

            setBlogs((prev) => prev.filter((blog)=> blog.id !== id))
        }catch(error){
            toast.error(error.message);
        }
    }

    const myBlogs = blogs.filter((blog) => blog.userId === user?.uid);
    const otherBlogs = blogs.filter((blog) => blog.userId !== user?.uid);
   

 return (
    <div className="page-wrapper">
        <nav className="floating-nav">
        <div className="nav-logo" style={{ color: '#63d9f1', fontWeight: 'bold' }}>
            Blop
        </div>
        <div className="nav-links">
            <Link to="/add">Add Blog</Link>
            <button className="nav-btn-outline" onClick={handleLogout}>
            Logout
            </button>
        </div>
        </nav>

        <div className="feed-container">
        <h1 className="title">Latest Stories</h1>
        <p className="subtitle">Discover perspectives from the community</p>

        {/* ✅ MY BLOGS */}
        <h2 className="section-title">My Blogs</h2>
        <div className="blog-grid">
            {blogs
            .filter((blog) => blog.userId === user?.uid)
            .map((blog) => (
                <div key={blog.id} className="blog-card">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">
                    {blog.content.slice(0, 160)}
                </p>

                <div className="blog-footer">
                    <Link to={`/blog/${blog.id}`} className="read-link">
                    Read Entry →
                    </Link>

                    <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog.id)}
                    >
                    Delete
                    </button>

                    <Link to={`/edit/${blog.id}`}>
                    <button className="edit-btn">Edit</button>
                    </Link>
                </div>
                </div>
            ))}
        </div>

        {/* ✅ OTHER BLOGS */}
        <h2 className="section-title">Other Blogs</h2>
        <div className="blog-grid">
            {blogs
            .filter((blog) => blog.userId !== user?.uid)
            .map((blog) => (
                <div key={blog.id} className="blog-card">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">
                    {blog.content.slice(0, 160)}
                </p>

                <div className="blog-footer">
                    <Link to={`/blog/${blog.id}`} className="read-link">
                    Read Entry →
                    </Link>
                </div>
                </div>
            ))}
        </div>
        </div>
    </div>
    );
}
