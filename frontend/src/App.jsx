import { useState } from 'react'
import './App.css'

function App() {
  // Fixed: Removed the double "const"
  const BACKEND_URL = "https://medicationtracker-backend.onrender.com";

  const handleLogin = () => {
    // This sends the user to your Render backend to start the Google login
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="app-container">
      <h1>💊 Medication Tracker</h1>
      
      <div className="card">
        <h2>Welcome</h2>
        <p>Please log in to manage your medications securely.</p>
        
        {/* The Google Login Button */}
        <button 
          onClick={handleLogin} 
          style={{ backgroundColor: '#4285F4', color: 'white', padding: '10px 20px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
        >
          Login with Google
        </button>
      </div>

      <p className="footer">
        Connected to: {BACKEND_URL}
      </p>
    </div>
  )
}

export default App
