// --IMPORT--
import { useRef, useState } from 'react'
import './App.css'
import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/facemesh"
import Webcam from "react-webcam"
import { drawMesh } from './utilities.jsx'

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // --FACEMESH--
  const runFacemesh = async () =>{
    const net = await facemesh.load({
      inputResolution:{width:640, height:480, scale:1}
    });
    setInterval(()=> {
      detect(net)
    }, 100)
  };
  // --FACE RECOGNITION--
  const detect = async (net) => {
    if(
      typeof webcamRef !=="undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      console.dir(webcamRef)
      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      const face = await net.estimateFaces(video);
      console.log(net);

      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx)


    }
  };
  runFacemesh();
  return (
    <>
      <div>
        <Webcam ref={webcamRef} 
        style={
          {
            width: 640, 
            height: 480, 
            position:"absolute",
            zIndex:9,
            textAlign: 'center',
            right: 0,
            left: 0,
          }
        }></Webcam>
        <canvas ref={canvasRef}
        style={
          {
            width: 640, 
            height: 480,
            position:"absolute",
            zIndex:9,
            textAlign: 'center',
            right: 0,
            left: 0,
        }
        }></canvas>
      </div>
    </>
  )
}

export default App
