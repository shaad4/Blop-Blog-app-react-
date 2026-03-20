import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const {signup, login} = useAuth();
    const naviagte = useNavigate();


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


    const handleLogin = async () => {
      if (!validate()) return;

        try{
            await login(email,password);
            toast.success("Login successfull")
            naviagte("/");
        }catch(error){
            toast.error(error.message)
        }
    }

    return (
    <div className="page-wrapper">
      <nav className="floating-nav">
        <div className="nav-logo">Blop </div>
        <div className="nav-links">
        <button className="nav-btn-outline" onClick={() => navigate("/signup")}>Signup</button>

        </div>
      </nav>

      <div className="container">
        <div className="card">
          <header className="card-header">
            <h2 className="title">Sign In</h2>
            <p className="subtitle">Enter your details to access your account</p>
          </header>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="modern-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="modern-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-stack">
            <button onClick={handleLogin} disabled={!email || password.length < 6} className="btn btn-primary">
              Login
            </button>
            <div className="divider">
              <span>or</span>
            </div>
            <button onClick={()=>naviagte("/signup")} className="btn btn-secondary">
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );


}