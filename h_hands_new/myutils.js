// HEAD _ POSITION (sur objet entity-camera)
// paramètrès :
// trace : visible ou non
// local : détection espace physique
// world : détection espace virtuel
// pivot : rotation de la tête
AFRAME.registerComponent('head-position', {
    schema: {
        trace: {
            type: 'boolean',
            default: true
        },
        local: {
            type: 'boolean',
            default: true
        },
        world: {
            type: 'boolean',
            default: true
        },
        pivot: {
            type: 'boolean',
            default: true
        }
    },
    init: function () {
        if (this.data.trace) {
            createLog();
        }

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
            let x = 0,
                z = 0;

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

// HAND_POSITION (avec id sur objet)
AFRAME.registerComponent('hand-position', {
    schema: {
        trace: { type: 'boolean', default: true },
        myid: { type: 'string'}
    },
    init: function () {
        this.data.myid = this.el.id;
        var id = this.data.myid;

        if (this.data.trace) { createLog();}

        function createLog() {
            var text = document.createElement('a-text');
            document.querySelector('#'+id).appendChild(text);
            text.setAttribute('position', '0 0.08 0');
            text.setAttribute('rotation', '-90 0 0');
            text.setAttribute('value', 'position');
            text.setAttribute('scale', '0.1 0.1 0.1');
            text.setAttribute('id', 'txt'+id);
            text.setAttribute('align', 'center');
            text.setAttribute('color', '#FFF');
        };
    },
    tick: function () {
    if (this.data.trace) {
            var pos = this.el.object3D.position;
            var message = "x: " + pos.x.toFixed(2) + 
                          ", y: " + pos.y.toFixed(2)+ 
                          ", z: " + pos.z.toFixed(2);


            var info = document.querySelector('#txt'+this.data.myid);
            info.setAttribute('value', message);
        }
    }
});

// HEAD_ROTATION (sur objet entity-camera vers objets )

// FOLLOW_HEAD_ROTATION
AFRAME.registerComponent('follow-head-rotation', {
    schema: {
        trace: { type: 'boolean', default: true },
        cam: { type: 'string'},
        log: { type: 'string'}
    },
    init: function () {
        this.data.cam = document.querySelector('a-entity[camera]');

        if (this.data.trace) {
            createLog();
        }

        function createLog() {
            var text = document.createElement('a-text');
            document.querySelector('a-entity[camera]').appendChild(text);
            text.setAttribute('position', '0 0 -0.5');
            text.setAttribute('value', 'position');
            text.setAttribute('width', 1);
            text.setAttribute('id', 'txtlog');
            text.setAttribute('align', 'center');
            text.setAttribute('color', '#FFF');
        };
    },
    tick: function () {
            var rot = this.data.cam.object3D.rotation;
            var ry = (rot.y * (180 / Math.PI)).toFixed(2);
            var newrot = " -90 " + ry + " 180";
            //console.log(newrot);
            this.el.setAttribute('rotation', newrot);

        if (this.data.trace) {
            var sceneEl = document.querySelector('a-scene');
            var log = sceneEl.querySelector('#txtlog');
            log.setAttribute('value', ry);

        }

    }
});

// FOLLOW_HAND_POSITION
AFRAME.registerComponent('follow-hand-position', {
    schema: {
        trace: {
            type: 'boolean',
            default: true
        },
        hand: {
            type: 'string'
        },
        log: {
            type: 'string'
        }
    },
    init: function () {
        var side = (this.el.id.substring(4));
        var sceneEl = document.querySelector('a-scene');
        this.data.hand = sceneEl.querySelector('#main' + side);
    },
    tick: function () {
        var pos = this.data.hand.object3D.position;
        var newpos = pos.x + " 0 "+ pos.z;
        this.el.setAttribute('position', );

    }
});



