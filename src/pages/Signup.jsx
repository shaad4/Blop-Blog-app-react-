import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Login.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateProfile } from "firebase/auth";

export default function Signup(){
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validate = () => {
        if (!username) {
            toast.error("Username required");
            return false;
        }

        if (username.length < 3) {
            toast.error("Username must be at least 3 characters");
            return false;
        }

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

        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

        if (!strongPassword.test(password)) {
            toast.error(
            "Password must include uppercase, lowercase, number & special character"
            );
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSignup = async () =>{
        if (!validate()) return;


        try{
            const userCred = await signup(email, password);

            await updateProfile(userCred.user,{
                displayName : username,
            });

            await setDoc(doc(db, "users", userCred.user.uid),{
                username,
                email,
            });

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
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

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

            <input
                className="modern-input"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

        
            <button className="btn btn-primary" disabled={!username || !email || !password || password !== confirmPassword} onClick={handleSignup}>
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

