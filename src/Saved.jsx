import './Saved.css'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { applyDeficiency } from './colorblindUtils';

function Saved() {


    const [savedImages, setSavedImages] = useState([]);
    const canvasRefs = useRef([]);
    const imageRefs = useRef([]);


    const getSavedImages = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:3000/getSavedImage", {
                headers: { Authorization: `Bearer ${token}` }
              })
            
        
            setSavedImages(response.data);

        } catch (err) {
            console.log(err);
        }
        



    }

    useEffect(() => {
        getSavedImages();
    }, []);




    return (
        <div>
            <h2>Your Saved Images</h2>
            {savedImages.map((img, index) => (
                <div key={img.id}>
                    <p>{img.deficiency}</p>
                    <img
                        ref={el => imageRefs.current[index] = el}
                        src={`http://localhost:3000/uploads/${img.filename}`}
                        onLoad={() => applyDeficiency(canvasRefs.current[index], imageRefs.current[index], img.deficiency)}
                        style={{ display: 'none' }}
                    />
                    <canvas
                        ref={el => canvasRefs.current[index] = el}
                        width="400"
                        height="400"
                    />
                </div>
            ))}
        </div>
    )
}

export default Saved