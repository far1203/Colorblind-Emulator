import './Login.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('');
    


    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:3000/loginAttempt", {
              email: email,
              password: password
            })

            const { user, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
    
            console.log(response.data.message)
            navigate('/', { replace: true })

            
            
          } catch (err) {
            setMessage(err.response.data.error);
          }
        };

        

    return(
        
        <>

        

        <div className="userField">
            <header>LOGIN PAGE</header>
            <input type="text" id="email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" id="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>
            <button id="loginButton"type="button" onClick={handleClick}>
            Login
            </button>

            <div>
  
            {message && <p>{message}</p>}
            </div>

            <text>Dont have an account?</text>
            <button id="signUpButton"type="button" onClick={() => navigate('/signup')}>
            Sign Up
            </button>

        </div>
        </>
       
    );
    
}

export default Login