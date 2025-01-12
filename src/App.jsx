// --IMPORT--
import { useRef, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities.jsx";
import WebCamera from "./FaceDetection/faceDetection.jsx";

function App() {

  return (
    <>
      <div>
        <WebCamera />
      </div>
    </>
  );
}

export default App;
