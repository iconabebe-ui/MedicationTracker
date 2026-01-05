import { useState } from 'react'
import './App.css'

function App() {
  // This is your live Render backend URL
  const BACKEND_URL = "https://medicationtracker-backend.onrender.com";

  const handleLogin = () => {
    // This redirects the user to the Google Auth route on your backend
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💊 Medication Tracker</h1>
      </header>
      
      <main className="card">
        <h2>Welcome Back</h2>
        <p>Manage your prescriptions and set reminders easily.</p>
        
        <div className="login-section">
          <button 
            onClick={handleLogin} 
            className="login-button"
            style={{ 
              backgroundColor: '#4285F4', 
              color: 'white', 
              padding: '12px 24px', 
              cursor: 'pointer', 
              border: 'none', 
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            Login with Google
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>Status: Connected to Backend</p>
        <small>{BACKEND_URL}</small>
      </footer>
    </div>
  )
}

export default App
