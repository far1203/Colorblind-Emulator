import './SignUp.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import signupImage from "./assets/signup-image.jpg";


function SignUp() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('');

    const validateEmail = (em) => {
        if (!em.trim())                        return "Email can't be empty";
        if (em.length > 254)                   return "Email too long";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return "Invalid email format";
        return null;
    };

    const sendData = async () => {

      const emailError = validateEmail(email);
      if (emailError) {
        setMessage(emailError) // replace with setMessage(emailError) if you want it on screen
        return;
      }

        try {
          const response = await axios.post("http://localhost:3000/signUpAttempt", {
            email: email,
            password: password
          })

          navigate('/login', { replace: true })
        } catch (err) {
          setMessage(err.response.data.error);
        }
      };

    return (
        <div className="signup-page">

        
        
          <div className="signUpField">
              <header className="signup-title">Sign Up</header>


              <input type="text" className="form-input" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
              <input type="text" className="form-input" placeholder="choose password" onChange={(e) => setPassword(e.target.value)}/>

          

    
              <button className="signUp-Button"type="button" onClick={sendData}>
              Sign Up
              </button>

              <div>
    
              {message && <p className="error-message">{message}</p>}
              </div>


             

          </div>

          <div className="signup-image">
                <img src={signupImage} alt="signup"></img>
              </div>
        
        
        </div>
    )
}

export default SignUp


