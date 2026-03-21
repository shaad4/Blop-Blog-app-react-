import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <nav className="floating-nav">
        <div className="nav-logo">Blop</div>
        <button className="nav-btn-outline" onClick={() => navigate("/")}>
          Home
        </button>
      </nav>

      <div className="container">
        <div className="card error-card">
          <h1 className="error-code">404</h1>
          <h2 className="title">Lost in Space?</h2>
          <p className="subtitle">
            This Page is Not Found
          </p>

          <div className="button-stack">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}