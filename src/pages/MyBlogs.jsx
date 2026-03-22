import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link , useNavigate} from 'react-router-dom';
import { deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Login.css';

export default function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const {user , logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const snapshot = await getDocs(collection(db, "blogs"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const myBlogs = data.filter(
                (blog) => blog.userId === user?.uid
            );

            setBlogs(myBlogs);
        };
        fetchBlogs();
    }, [user]);

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
                <div className="nav-links">
                  
                    <Link to="/" className="nav-link-text" >Feed</Link>
                   
                    <Link to="/add" className="nav-link-text" >Create Blog</Link>
                    <button className="nav-btn-outline" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="feed-container">
                <header className="feed-header">
                    <h1 className="title">My library</h1>
                    <p className="subtitle">Manage and edit your published stories</p>
                </header>

                <div className="blog-grid">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog.id} className="card blog-card">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-excerpt">
                                    {blog.content?.substring(0, 120)}...
                                </p>
                                
                                <div className="blog-actions">
                                    <Link to={`/blog/${blog.id}`} className="read-link">Read →</Link>
                                    <div className="action-btns">
                                        <button className="icon-btn edit" onClick={() => navigate(`/edit/${blog.id}`)}>Edit</button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(blog.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="subtitle">You haven't written any blogs yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
