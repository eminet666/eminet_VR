// HEAD _ POSITION (sur objet entity-camera)
// paramètrès :
// trace : visible ou non
// local : détection espace physique
// world : détection espace virtuel
// pivot : rotation de la tête
AFRAME.registerComponent('head-position', {
    schema: {
        trace: { type: 'boolean', default: true },
        local: { type: 'boolean', default: true },
        world: { type: 'boolean', default: true },
        pivot: { type: 'boolean', default: true }
    },
    init: function () {
        if (this.data.trace) { createLog();}

        function createLog() {
            var text = document.createElement('a-text');
            document.querySelector('a-entity[camera]').appendChild(text);
            text.setAttribute('position', '0 0 -0.5');
            text.setAttribute('value', 'trace');
            text.setAttribute('width', 1);
            text.setAttribute('id', 'txtcamera');
            text.setAttribute('align', 'center');
            text.setAttribute('color', '#F00');
        };

    },
    tick: function () {
        if (this.data.trace) {
            let x=0, z=0;

            if (this.data.local) {
                var pos = this.el.object3D.position;
                x += pos.x;
                z += pos.z;
            }

            if (this.data.world) {
                var wposition = new THREE.Vector3();
                var wpos = this.el.object3D.getWorldPosition(wposition);
                x += wpos.x;
                z += wpos.z;
            }

            var message = x.toFixed(2) + "_" + z.toFixed(2);

            if (this.data.pivot) {
                var rot = this.el.object3D.rotation;
                message += '\n' + (rot.y * (180 / Math.PI)).toFixed(2);
            }

            var info = document.querySelector('#txtcamera');
            info.setAttribute('value', message);
        }
    }
});