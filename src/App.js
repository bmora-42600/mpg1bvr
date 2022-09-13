import './App.css';
import "./components/waypoint/waypoint.js";
require('aframe-stereo-component');
require('aframe');

function App() {
  return (
    <div className="App">
      <a-scene antialias="true"
      cursor="rayOrigin: mouse; fuseTimeout: 0;" raycaster="objects: .clickable">
        <a-assets>
          <img id="right" src="img/stereo1r.jpg"/>
          <img id="left" src="img/stereo1l.jpg"/>
        </a-assets>
        {/* <a-entity camera look-controls position="0 0 0" stereocam="eye:left;"></a-entity>

        <a-sky id="sky1" src="#left" stereo="eye:left"></a-sky>
        <a-sky id="sky2" src="#right" stereo="eye:right"></a-sky> */}
        <a-entity camera look-controls position="0 0 0">
        <a-sphere id="fade" radius="2" 
                material="shader:flat; color: black; opacity: 0.0; side: double;"
                animation__fadein="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: normal; startEvents: fadein;"
                animation__fadeout="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: reverse; startEvents: fadeout;"
                >
                </a-sphere>
        </a-entity>
        <a-sphere class="clickable" position="5 0 5" waypoint radius="2">
        </a-sphere>
        
        <a-sky id="sky" src="#right"></a-sky>
        
      </a-scene>
    </div>
  );
}

export default App;
