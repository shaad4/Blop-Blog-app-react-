import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Login.css";

export default function Signup(){
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validate = () => {
    if (!email) {
        toast.error("Email required");
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email format");
        return false;
    }

    if (!password) {
        toast.error("Password required");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
    };

    const handleSignup = async () =>{
        if (!validate()) return;


        try{
            await signup(email,password);
            toast.success("Signup successful")
            navigate("/login")
        }catch(error){
            toast.error(error.message);
        }
    }

    return(
        <div className="page-wrapper"> 

        <nav className="floating-nav">
            <div className="nav-logo">Blop</div>
            <div className="nav-links">
            <button className="nav-btn-outline" onClick={() => navigate("/login")}>Login</button>
            </div>
        </nav>
        
        <div className="container">
       
        <div className="card">
            
            <h2 className="title">Sign Up</h2>
            <p className="subtitle">Create your account</p>

            
            <input
            className="modern-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            className="modern-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />

        
            <button className="btn btn-primary" disabled={!email || password.length < 6} onClick={handleSignup}>
            Create Account
            </button>

           
            <div className="divider"><span>OR</span></div>

            <button className="btn btn-secondary" onClick={() => navigate("/login")}>
            Already have an account? Login
            </button>
            
        </div>
        </div>
    </div>
    )
}

