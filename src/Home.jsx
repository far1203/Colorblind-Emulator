import Header from './Header.jsx'
import ImageProcess from './ImageProccess.jsx';
import axios from 'axios';
import './Home.css'

import { useNavigate } from 'react-router-dom'


function Home() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  
  
  return(
      <>
        
        <nav>
          {token ? (
            <button onClick={handleLogout}>Log Out</button>  // or whatever you want
          ) : (
            <button onClick={() => navigate('/login')}>Log In</button>
          )}
          <button onClick={() => navigate('/saved')}>My Images</button>
        </nav>
        

        <Header/>
        <ImageProcess/>
       
      

        
        
      
      </>
  );

}

export default Home
