import './App.css';
require('aframe-stereo-component');
require('aframe');

function App() {
  return (
    <div className="App">
      <a-scene antialias="true">
        <a-assets>
          <img id="right" src="img/stereo1r.jpg"/>
          <img id="left" src="img/stereo1l.jpg"/>
        </a-assets>
        <a-entity camera look-controls position="0 0 0" stereocam="eye:left;"></a-entity>

        <a-sky id="sky2" src="#right"></a-sky>
      </a-scene>
    </div>
  );
}

export default App;
