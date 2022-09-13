import { useEffect, useState } from 'react';
import './App.css';
import "./components/waypoint/waypoint.js";
import Tour from './tour.json';
require('aframe-stereo-component');
require('aframe-look-at-component');
require('aframe');



function App() {

  useEffect(()=>{
    document.querySelector('a-scene').addEventListener('loaded', function () {
      setTimeout(()=>document.getElementById("loading-page").style.visibility = "hidden",3000);
    })
    window.addEventListener("go-to", function(e) {
      var fadeEl = document.querySelector("#fade")
      fadeEl.emit("fadein");
      setTimeout(()=>{
        var skybox = document.querySelector("#sky")
        var goToWaypoints = document.querySelector(`#${e.detail.to}`)
        Tour.locations.forEach(location => {
          let waypoints = document.getElementById(location.id);
          waypoints.setAttribute("visible",false)
          waypoints.setAttribute("scale","0 0 0")
        })
        goToWaypoints.setAttribute("visible",true)
        goToWaypoints.setAttribute("scale","1 1 1")
        skybox.setAttribute("src", `#img-${e.detail.to}`);
        fadeEl.emit("fadeout")
      },1000)
  });
  },[])

  const GoTo = to => {
    let event = new CustomEvent("go-to", {'detail': {
      to: to,
    }});
    window.dispatchEvent(event);
  }
  return (
    <div className="App">
      <div id="loading-page">
        <img className="logo" src={"img/logos.png"} alt="logos" />
      </div>
      <div id="web-ui">
        <img className="location-btn" onClick={() => GoTo("pano1")} src={"img/ButtonONE.png"} alt="button one" />
        <img className="location-btn" onClick={() => GoTo("pano2")} src={"img/ButtonONW.png"} alt="button onw" />
        <img className="location-btn" onClick={() => GoTo("pano3")} src={"img/ButtonPNW.png"} alt="button pnw" />
        <img className="location-btn" onClick={() => GoTo("pano4")} src={"img/ButtonPSW.png"} alt="button psw" />
        <img className="location-btn" onClick={() => GoTo("pano5")} src={"img/ButtonPCINT.png"} alt="button pcint" />
      </div>
      <div id="web-logos">
        <img className="logo" src={"img/logos.png"} alt="logos" />
      </div>
      <a-scene renderer="antialias: true" loading-screen="enabled:false"
      cursor="rayOrigin: mouse; fuseTimeout: 0;" raycaster="objects: .clickable">
        <a-assets>
          {Tour.locations.map(location => <img id={`img-${location.id}`} src={location.src}/>)}
          <img id="waypoint" src="img/pinpoint.png"/>
        </a-assets>

        <a-camera id="cam" look-controls="reverseMouseDrag: true" position="0 0 0">
          <a-sphere id="fade" radius="2" 
            material="shader:flat; color: black; opacity: 0.0; side: double; transparent: true; alphaTest: 0.5;"
            animation__fadein="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: normal; startEvents: fadein;"
            animation__fadeout="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: reverse; startEvents: fadeout;"
            >
          </a-sphere>
        </a-camera>

        {Tour.locations.map((location,index) => {
          return <a-entity id={location.id} visible={index===0?"true":"false"} scale={index===0?"1 1 1":"0 0 0"}>
            {location.waypoints.map( waypoint =>
              <a-image 
                position={`${waypoint.position[0]} ${waypoint.position[1]} ${waypoint.position[2]}`}
                scale="2 2.5 1"
                class="clickable" 
                waypoint={`to:${waypoint.to}`} 
                src="#waypoint"></a-image>
            )}
          </a-entity>
        })}
        
        <a-entity laser-controls="hand: right" raycaster="objects: .clickable; lineColor: red; lineOpacity: 0.5;"></a-entity>
        <a-sky id="sky" src={`#img-${Tour.locations[0].id}`}></a-sky>
        
      </a-scene>
    </div>
  );
}

export default App;
