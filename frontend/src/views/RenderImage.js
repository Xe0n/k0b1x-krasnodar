import React, { useEffect, useRef } from 'react';
import {ButtonGroup, Button} from 'reactstrap'
import toast from 'react-hot-toast'

const RenderImage = ({ responseData }) => {
  const { image, predictions, picture } = responseData;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    if (predictions.length === 0) {
        return;
    }

    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    const imgUrl = URL.createObjectURL(picture);
    const img = new Image();
    img.src = imgUrl;

    predictions.forEach((prediction) => {
      ctx.beginPath();
      ctx.rect(prediction.x, prediction.y, prediction.width, prediction.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    });

    img.onload = () => {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }, [responseData]);
  const ShowNotionYes = () => {
    toast.success('Спасибо, ваша информация будет использована для дообучения', {
        duration: 5000
    })
  }
  const ShowNotionNo = () => {
    toast.error('Спасибо, ваша информация будет использована для дообучения', {
        duration: 5000
    })
  }
  return (
    <div style={{padding: '20px'}}>
      <canvas ref={canvasRef}></canvas>
      <div>В кадре есть объект торговли?</div>
      <ButtonGroup>
        <Button color="danger" onClick={() => ShowNotionNo()}>
          Нет
        </Button>
        <Button color="success" onClick={() => ShowNotionYes()}>
          Да
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default RenderImage;