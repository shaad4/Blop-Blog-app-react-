import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "./BlogDetails.css"

export default function BlogDetails(){
    const {id} = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(()=>{
        
        const fetchBlog = async () => {
            try{
                const docRef = doc(db, "blogs", id);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()){
                    setBlog(docSnap.data());
                }else{
                    toast.error("Blog not found");
                }
            }catch(error){
                toast.error(error.message)
            }
            
        }
        fetchBlog()
        
    }, [id])

    const handleLogout = async () => {
        try {
        await logout();
        navigate("/login");
        } catch (error) {
        toast.error(error.message);
        }
    };

    if (!blog) {
        return (
        <div className="page-wrapper center-content">
            <div className="loader-spinner"></div>
        </div>
        );
    }

    return (
        <div className="page-wrapper">
        {/* Floating Nav */}
        <nav className="floating-nav">
            <div className="nav-logo">Blop</div>
            <div className="nav-links">
            <Link to="/" className="nav-item">Feed</Link>
            <Link to="/add" className="nav-item">Add Blog</Link>
            <button className="nav-btn-outline" onClick={handleLogout}>Logout</button>
            </div>
        </nav>

        <div className="details-container">
            <Link to="/" className="back-link">← Back to Feed</Link>
            
            <article className="details-card">
            <header className="details-header">
                <span className="details-category">Story</span>
                <h1 className="details-title">{blog.title}</h1>
                <div className="details-meta">
                <span className="author-badge">Author ID: {blog.userId?.substring(0, 6)}</span>
                </div>
            </header>

            <hr className="details-divider" />

            <div className="details-body">
                {blog.content}
            </div>
            
            <footer className="details-footer">
                <p>Thanks for reading "Blop" </p>
            </footer>
            </article>
        </div>
        </div>
    );
}