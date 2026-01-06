import React from 'react';

function App() {
  const BACKEND_URL = "https://medicationtracker-backend.onrender.com";

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>💊 Medication Tracker</h1>
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Login with Google
      </button>
    </div>
  );
}

export default App;
