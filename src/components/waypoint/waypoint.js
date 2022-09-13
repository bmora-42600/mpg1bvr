import AFRAME from 'aframe';

AFRAME.registerComponent("waypoint", {
    init: function() {
      // grab the "fading sphere"
      var fadeEl = document.querySelector("#fade")
      // when clicked - emit the defined "startEvent"
      this.el.addEventListener("click", e => {
        fadeEl.emit("fadein")
      })
    }
})