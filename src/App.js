import './App.css';
import "./components/waypoint/waypoint.js";
require('aframe-stereo-component');
require('aframe-look-at-component');
require('aframe');

function App() {
  return (
    <div className="App">
      <a-scene renderer="antialias: true"
      cursor="rayOrigin: mouse; fuseTimeout: 0;" raycaster="objects: .clickable">
        <a-assets>
          <img id="right" src="img/stereo1r.jpg"/>
          <img id="test" src="img/test.jpeg"/>
          <img id="waypoint" src="img/waypoint.png"/>
        </a-assets>
        {/* <a-entity camera look-controls position="0 0 0" stereocam="eye:left;"></a-entity>

        <a-sky id="sky1" src="#left" stereo="eye:left"></a-sky>
        <a-sky id="sky2" src="#right" stereo="eye:right"></a-sky> */}
        <a-entity id="cam" camera look-controls position="0 0 0">
        <a-sphere id="fade" radius="2" 
                material="shader:flat; color: black; opacity: 0.0; side: double; transparent: true; alphaTest: 0.5;"
                animation__fadein="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: normal; startEvents: fadein;"
                animation__fadeout="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: reverse; startEvents: fadeout;"
                >
                </a-sphere>
        </a-entity>
        <a-image position="0 0 -10" scale="2 3 1" class="clickable" waypoint src="#waypoint"></a-image>
        <a-entity oculus-go-controls></a-entity>
        <a-sky id="sky" src="#right"></a-sky>
        
      </a-scene>
    </div>
  );
}

export default App;
