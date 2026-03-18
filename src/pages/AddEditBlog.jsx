import { addDoc, collection , doc, getDoc, updateDoc} from "firebase/firestore";
import { useState , useEffect} from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "./AddEditBlog.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function AddEditBlog(){
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const {logout, user} = useAuth();
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(()=>{
        if (!id) return;

        const fetchBlog = async () => {
            try{
                const docRef = doc(db, "blogs",id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    if (user && user.uid !== data.userId){
                        toast.error("Not authorized");
                        navigate("/")
                        return;
                    }

                    setTitle(data.title)
                    setContent(data.content)
                }
            }catch(error){
                toast.error(error.message)
            }
        }
        fetchBlog()
    }, [id, user])


    const handleSubmit = async () => {
        if (!title || !content) {
            return toast.error("Please fill in all fields");
        }
        if (!user) {
            return toast.error("Login required");
        }

        try{

            if (id) {
                //update
                await updateDoc(doc(db, "blogs", id), {
                    title,
                    content,
                });

                toast.success("Blog Updated ")
            }else{
                //create 
                await addDoc(collection(db, "blogs"),{
                    title : title,
                    content : content,
                    userId : user.uid,
                    createdAt: new Date(),
                });

                toast.success("Blog published successfully ✅");

            }
            
            
            navigate("/")
        } catch(error){
            toast.error(error.message);
        }
    };

    const handleLogout = async () => {
        try{gYDGLLijJ17o7EKFVIz
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
            <div className="nav-logo">Blop</div>
            <div className="nav-links">
            <span><Link to="/">Feed</Link></span>
            <button className="nav-btn-outline" onClick={handleLogout}>Logout</button>
            </div>
        </nav>

        <div className="container">
            <div className="editor-card">
            <header className="editor-header">
                <h2 className="title">
                {id ? "Edit Post ✏️" : "Create Post"}
                </h2>
                <p className="subtitle">
                {id ? "Update your blog" : "Share your thoughts with the world"}
                </p>
            </header>

            <div className="input-group">
                <label className="input-label">Title</label>
                <input
                className="modern-input"
                placeholder="Give your story a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

                <label className="input-label">Content</label>
                <textarea
                className="modern-textarea"
                placeholder="Write your masterpiece here..."
                rows="8"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            <div className="button-stack">
                <button onClick={handleSubmit} className="btn btn-primary">
                {id ? "Update Post" : "Publish Post"}
                </button>
            </div>
            </div>
        </div>
        </div>
  );
}