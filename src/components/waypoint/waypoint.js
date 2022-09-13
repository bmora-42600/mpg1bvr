import AFRAME from 'aframe';

AFRAME.registerComponent("waypoint", {
    schema: {
      to: {type: 'string', default: ""}
    },
    init: function() {
      // grab the "fading sphere"
      this.el.setAttribute("look-at", "#cam");
      // when clicked - emit the defined "startEvent"
      this.el.addEventListener("click", e => {
        let event = new CustomEvent("go-to", {'detail': {
          to: this.data.to,
        }});
        window.dispatchEvent(event);
      })
    }
})