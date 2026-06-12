import './SignUp.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

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
        <>

        
        
        <div className="signUpField">
            <header>SIGN UP PAGE</header>


            <input type="text" id="email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" id="password" placeholder="choose password" onChange={(e) => setPassword(e.target.value)}/>

        

  
            <button id="signUpButton"type="button" onClick={sendData}>
            Sign Up
            </button>

            <div>
  
            {message && <p>{message}</p>}
            </div>

        </div>
        
        
        </>
    )
}

export default SignUp


