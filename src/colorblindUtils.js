import { simulate } from '@bjornlu/colorblind'

export function applyDeficiency(canvas, image, deficiency) {


        
        

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    

    const scale = Math.min(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight
    );

    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;

    image.crossOrigin = "Anonymous"

    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = (canvasWidth - drawWidth) / 2;
    const y = (canvasHeight - drawHeight) / 2;

    ctx.drawImage(
        image, x, y, drawWidth,
        drawHeight
    )

    const imageData = ctx.getImageData(x, y, drawWidth,
        drawHeight)

    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        

        const simColor = simulate({ r, g, b }, deficiency)
        
        data[i] = simColor.r
        data[i + 1] = simColor.g
        data[i + 2] = simColor.b
    }
    
    ctx.putImageData(imageData, x, y);

}