import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react'
import './ImageProcess.css'
import { applyDeficiency } from './colorblindUtils';


function ImageProcess() {

    const [image, setImage] = useState(null);

    const [message, setMessage] = useState('');

    const canvasRef = useRef(null);

    const imageRef = useRef(null);

    const [deficiency, setDeficiency] = useState('protanopia')


    const handleSave = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            setMessage('You need to be logged in to save an image.');
            return;
        }

        try {
            await axios.post("http://localhost:3000/saveImage", 
                { filename: image, deficiency: deficiency },
                { headers: { Authorization: `Bearer ${token}` }}
                
            )
            setMessage('Image saved!');
        } catch(err) {
            if (err.response && err.response.status === 401) {
                alert('You need to be logged in to save an image.');
            } else {
                alert('Something went wrong saving the image.');
            }
            console.log(err);
        }
        

        
    }

    

    const sendData = async (e) => {
        
        console.log(e)
        e.preventDefault()


        const formData = new FormData()

        console.log(e.target[0].files[0])
        formData.append("filename", e.target[0].files[0])

        try {
            const response = await axios.post("http://localhost:3000/imageUpload", formData)
            console.log(response.data.message)
            setImage(response.data.message)
        } catch(err) {
            console.log(err)
        }
    }

    

    function copyImagetoCanvas() {
        applyDeficiency(canvasRef.current, imageRef.current, deficiency);
    }

    


    function changeDeficiency(event) {

        setDeficiency(event.target.value)

        
    }

    useEffect(() => {

        if (image) {
            copyImagetoCanvas()
        }
        
        
    }, [deficiency])

    return(
        
        <>
        <div className="page-elements-container">
        <div className="forms">
        <select className="deficiency-selector" name="deficiency" id="deficiency" onChange={changeDeficiency}>
            <option value="protanopia">protanopia</option>
            <option value="tritanopia">tritanopia</option>
            <option value="deuteranopia">deuteranopia</option>
            <option value="achromatopsia">achromatopsia</option>
        </select>
      
        <form className="image-form" encType="multipart/form-data" onSubmit={sendData}>
            <input type="file" id="myFile" name="filename" />
            <input type="submit"/>
        </form>
        </div>
        <div className="imagesContainer">
        <div className="images">
            <div className="imageContainer">
                <img 
                ref={imageRef}
                src={`http://localhost:3000/uploads/${image}`}
               
                onLoad={copyImagetoCanvas}
                className="image"
                ></img>
            </div>
            


            <div className="canvasContainer">
            <canvas className="canvas" ref={canvasRef} width="400" height="400"></canvas>
            </div>

          

        </div>
     
        </div>
  
        {image && <button className="save-image-button" onClick={handleSave}>Save Image</button>}

        {message && <p className="error-message">{message}</p>}
        
        </div>
        </>

        



    );




}

export default ImageProcess