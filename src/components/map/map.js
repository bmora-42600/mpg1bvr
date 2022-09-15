import AFRAME from 'aframe';

AFRAME.registerComponent("map", {
    init: function() {
      this.el.setAttribute("look-at", "#cam");
    },

    tick: function() {
        let position = this.el.getAttribute("position");
        var direction = new window.THREE.Vector3();
        this.el.sceneEl.camera.getWorldDirection(direction);
        direction.y = this.el.sceneEl.camera.position.y;
        position.lerp(direction.multiplyScalar(3),0.01);
    }
})