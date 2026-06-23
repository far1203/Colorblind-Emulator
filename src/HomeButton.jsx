import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './HomeButton.css'


function HomeButton() {
    const navigate = useNavigate();

    return (
        <button
            className="home-button"
            onClick={() => navigate('/')}
        
        >
        
        <FaHome />


        </button>
    )
}


export default HomeButton;