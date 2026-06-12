import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react'

import Login from './Login.jsx'
import Home from './Home.jsx'
import SignUp from './SignUp.jsx'
import Saved from './Saved.jsx'

function App() {

    useEffect(() => {
        const interval = setInterval(() => {
        const token = localStorage.getItem('token');
          
          if (token) {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            
            if (isExpired) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }
          }
        }, 5000); // checks every 5 seconds
      
        return () => clearInterval(interval); // cleanup on unmount
      }, []);




    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />      {/* Landing page */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/saved" element={<Saved />} />
            </Routes>
        </BrowserRouter>
    )
}


export default App
