import { useRef } from "react";
import Webcam from "react-webcam";
import "./faceDetection.css";
import * as facemesh from "@tensorflow-models/facemesh";
import * as ts from "@tensorflow/tfjs";
import { drawMesh } from "../utilities";

export default function WebCamera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  
  // загрузка Facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480, scale: 1 },
    });
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    if(
      typeof webcamRef !=="undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      const face = await net.estimateFaces(video);

      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx)


    }
  };
  runFacemesh()
  return (
    <div className="video-container">
      <Webcam className="video" ref={webcamRef}/>
      <canvas className="video" ref={canvasRef}/>
    </div>
  )
}