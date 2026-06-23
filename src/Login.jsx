import './Login.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import signupImage from "./assets/signup-image.jpg";

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

      <div className="login-page">

        <div className="userField">
            <header className="login-title">Login</header>
            <input type="text" className="form-input" id="email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" className="form-input" id="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="login-page-button" id="loginButton"type="button" onClick={handleClick}>
            Log in
            </button>

            <div>
  
            {message && <p className="error-message">{message}</p>}
            </div>

            <text className="dont-have-account">Dont have an account?</text>
            <button className="sign-up-button"id="signUpButton"type="button" onClick={() => navigate('/signup')}>
            Sign Up
            </button>

        </div>

        <div className="login-image">
                <img src={signupImage} alt="signup"></img>
        </div>
      </div>
        </>
       
    );
    
}

export default Login