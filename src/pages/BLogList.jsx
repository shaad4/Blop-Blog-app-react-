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

   
   

 return (
        <div className="page-wrapper">
           
            <nav className="floating-nav">
                <div className="nav-logo" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>Blop</div>
                <div className="nav-links" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Link to="/add" className="nav-link-text">Create Blog</Link>
                    <Link to="/myblogs" className="nav-link-text">My Blog</Link> 
                    <button className="nav-btn-outline" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="feed-container">
                <header className="feed-header">
                    <h1 className="title">Community Feed</h1>
                    <p className="subtitle">Discover latest stories from creators around the world</p>
                </header>

                <div className="blog-grid">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog.id} className="card blog-card">
                                <div className="blog-content">
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <p className="blog-excerpt">
                                        {blog.content?.substring(0, 150)}...
                                    </p>
                                </div>
                                <div className="blog-actions">
                                    <Link to={`/blog/${blog.id}`} className="read-link">
                                        Read Story →
                                    </Link>

                                    <span>by {blog.authorName || "anonymous"}</span>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="card" style={{ gridColumn: '1 / -1' }}>
                            <p className="subtitle">No blogs found. Be the first to write one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
