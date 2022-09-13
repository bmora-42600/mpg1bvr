import AFRAME from 'aframe';

AFRAME.registerComponent("waypoint", {
    init: function() {
      // grab the "fading sphere"
      this.el.setAttribute("look-at", "#cam");
      var fadeEl = document.querySelector("#fade")
      // when clicked - emit the defined "startEvent"
      this.el.addEventListener("click", e => {
        fadeEl.emit("fadein");
        setTimeout(()=>{
          var skybox = document.querySelector("#sky")
          skybox.setAttribute("src", "#test");
          fadeEl.emit("fadeout")
        },1000)
      })
    }
})