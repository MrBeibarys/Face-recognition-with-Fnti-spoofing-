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
        <link
          rel="stylesheet"
          href="https://pyscript.net/latest/pyscript.css"
        />
        <script defer src="https://pyscript.net/latest/pyscript.js"></script>
        <py-config></py-config>
        <py-script>print('Hello, World!')</py-script>
        <WebCamera />
        <p>hellp</p>
      </div>
    </>
  );
}

export default App;
