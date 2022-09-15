import { useEffect, useState } from 'react';
import './App.css';
import "./components/waypoint/waypoint.js";
import "./components/map/map.js";
import Tour from './tour.json';
import { Helmet } from "react-helmet";
require('aframe-stereo-component');
require('aframe-look-at-component');
require('aframe');


function App() {

  const [actualLocation, setActualLocation] = useState(Tour.locations[0].id);

  useEffect(()=>{
    window.localStorage.setItem("actualLocation",Tour.locations[0].id)
    document.querySelector('a-scene').addEventListener('enter-vr', function () {
      var vrMap = document.querySelector("#vr-map")
      vrMap.setAttribute("visible",true)
    });
    document.querySelector('a-scene').addEventListener('exit-vr', function () {
      var vrMap = document.querySelector("#vr-map")
      vrMap.setAttribute("visible",false)
    });
    window.addEventListener("go-to", function(e) {
      GoTo(e.detail.to);
    });
  },[])

  const GoTo = (to) => {
    let actualLocation = window.localStorage.getItem("actualLocation");

    if(actualLocation !== to){
      var fadeEl = document.querySelector("#fade")
      fadeEl.emit("fadein");
      let stepsSound = document.getElementById("steps-sound");
      stepsSound.components.sound.playSound();
      setTimeout(()=>{
        var skybox = document.querySelector("#sky")
        var actualWaypoints = document.querySelector(`#${actualLocation}`)
        var goToWaypoints = document.querySelector(`#${to}`)
  
        actualWaypoints.setAttribute("visible",false)
        actualWaypoints.childNodes.forEach(child => {
          child.classList.remove("clickable");
        })
  
        goToWaypoints.setAttribute("visible",true)
        goToWaypoints.childNodes.forEach(child => {
          child.classList.add("clickable");
        })
  
        var vrMap = document.querySelector("#vr-map")
        vrMap.setAttribute("src", `#map-${to}`);
        skybox.setAttribute("src", `#img-${to}`);
        fadeEl.emit("fadeout")
      },1000)
      setActualLocation(to);
      window.localStorage.setItem("actualLocation",to)
    }
  }

  const DispatchGoToEvent = to => {
    let event = new CustomEvent("go-to", {'detail': {
      to: to,
    }});
    window.dispatchEvent(event);
  }

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>mpg1bvr</title>
        <meta
          name="description"
          content="Learn design and code by building real apps with React and Swift. Complete courses about UI design, web and iOS development using Figma, CSS, React Hooks and SwiftUI."
        />
      </Helmet>
      <div id="loading-page">
        <img className="loading" src={"img/loading.gif"} alt="loading" />
      </div>
      <div id="web-ui">
        {Tour.locations.map((location) => {
          return <img className={`location-btn ${actualLocation===location.id?"selected":""}`}
            onClick={() => DispatchGoToEvent(location.id)} 
            src={location.thumbnail} 
            alt={`button ${location.id}`} />
            }
          )
        }
        <img id="web-map" src={Tour.locations.filter(location => location.id === actualLocation)[0].map} alt="map" />
      </div>
      <div id="web-logos">
        <img className="logo" src={"img/logos.png"} alt="logos" />
      </div>
      <a-scene renderer="antialias: true" loading-screen="enabled:false"
      cursor="rayOrigin: mouse; fuseTimeout: 0;" raycaster="objects: .clickable">
        <a-assets>
          {Tour.locations.map(location => <img id={`img-${location.id}`} src={location.src}/>)}
          {Tour.locations.map(location => <img id={`map-${location.id}`} src={location.map}/>)}
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
          return <a-entity id={location.id} visible={index===0?"true":"false"}>
            {location.waypoints.map( waypoint =>
              <a-image 
                position={`${waypoint.position[0]} ${waypoint.position[1]} ${waypoint.position[2]}`}
                scale="2 2.5 1"
                class={index===0?"clickable":""} 
                waypoint={`to:${waypoint.to}`} 
                src="#waypoint"></a-image>
            )}
          </a-entity>
        })}

        <a-entity map position="5 0 0">
          <a-image
            id="vr-map"
            visible="false" 
            position="0 -0.8 0"
            rotation="-30 0 0"
            scale="1 1 1"
            src={`#map-${actualLocation}`}>
          </a-image>
        </a-entity>
        
        <a-entity laser-controls="hand: right" raycaster="objects: .clickable; lineColor: red; lineOpacity: 0.5;"></a-entity>
        <a-sky id="sky" src={`#img-${Tour.locations[0].id}`}></a-sky>

        <a-sound id="ambient-sound" src="src: url(sound/ambient2.mp3)" loop="true" autoplay="true"></a-sound>
        <a-sound id="steps-sound" src="src: url(sound/pop.mp3)"></a-sound>
        
      </a-scene>
    </div>
  );
}

export default App;
