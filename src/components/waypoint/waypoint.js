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

      this.el.addEventListener("click", e => {
        let event = new CustomEvent("go-to", {'detail': {
          to: this.data.to,
        }});
        window.dispatchEvent(event);
      })
      this.el.addEventListener('mouseenter', (e) => {
        this.el.setAttribute('scale', '2.5 3 1');
      })
      this.el.addEventListener('mouseleave', (e) => {
        this.el.setAttribute('scale', '2 2.5 1');
      })
    }
})