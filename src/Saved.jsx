import './Saved.css'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { applyDeficiency } from './colorblindUtils';

function Saved() {


    const [savedImages, setSavedImages] = useState([]);
    const canvasRefs = useRef([]);
    const imageRefs = useRef([]);

    const deficiencyColors = {
        protanopia: '#ff6b6b',
        deuteranopia: '#4dabf7',
        tritanopia: '#FF6BB5',
        achromatopsia: '#6C757D'
      };


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
        <div className="saved-image-page">
            <h2 className="saved-images-header" style={{ fontFamily: 'Stack Sans Headline', fontWeight: 10 }}>Image Gallery</h2>
            <div className="image-container">
            {savedImages.map((img, index) => (
                
                <div className="saved-image-container" key={img.id}>
                    <p className="image-deficiency"style={{ fontFamily: 'Poppins', fontWeight: 600, color: deficiencyColors[img.deficiency] || 'black' }}>{img.deficiency}</p>
                    <img
                        ref={el => imageRefs.current[index] = el}
                        src={`http://localhost:3000/uploads/${img.filename}`}
                        onLoad={() => applyDeficiency(canvasRefs.current[index], imageRefs.current[index], img.deficiency)}
                        style={{ display: 'none' }}
                    />
                    <canvas className="visible-image"
                        ref={el => canvasRefs.current[index] = el}
                        width="400"
                        height="400"
                    />
                </div>
            ))}
            </div>
        </div>
    )
}

export default Saved