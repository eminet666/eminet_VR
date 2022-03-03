// version 20220226

AFRAME.registerComponent("debug-cursor", {
    schema: {
        detect: { type: 'array' },
        log: { type: 'boolean', default: false},
    },
    init: function () {
        var self = this;
        let detect = this.data.detect;
        let log = this.data.log;

        this.el.addEventListener("mouseenter", function (evt) {
            self.evt("mouseenter", evt.detail.intersectedEl, "green", detect, log)
        });
        this.el.addEventListener("mouseleave", function (evt) {
            self.evt("mouseleave", evt.detail.intersectedEl, "red", detect, log)
        })
        this.el.addEventListener("click", function (evt) {
            self.evt("click", evt.detail.intersectedEl, "blue", detect, log)
        })
    },
    evt: function (action, intersectedEl, color, detect, log) {
        for (var i = 0; i < detect.length; i++) {
            let cas = detect[i].split('-');
                if (intersectedEl.id === cas[0].substr(1)) { // target id
                    if(action === cas[1]){                   // mouse action
                        intersectedEl.emit(cas[2]);          // event
                        console.log("debug-cursor: event '" + cas[2] + 
                                    "' sent on ["+ action +
                                    "] to " + intersectedEl.id); 
                    }               
            }
        }    
        if (log) {
            console.log(`%c[${action}] ${intersectedEl.id}`, `color: ${color}`);
            console.log(intersectedEl);
        }
    }
})

// debug-keyboard
AFRAME.registerComponent('debug-keyboard', {
    schema: {
        key: {
            type: 'array'
        },
        target: {
            type: 'array'
        },
        event: {
            type: 'array'
        },
    },
    init: function () {
        let key = this.data.key;
        let event = this.data.event;
        let target = this.data.target;
        document.addEventListener('keypress', evt => {
            for (var i = 0; i < key.length; i++) {
                if (evt.keyCode === key[i].codePointAt(0)) {
                    let cible = document.querySelector(target[i]);
                    cible.emit(event[i]);
                    console.log("debug-keyboard : event " + event[i] + " sent to " + target[i]);
                }
            }
        });
    }
});

// debug-fuse
AFRAME.registerComponent('debug-fuse', {
    schema: {
        event: { event: 'string', default: 'test' },
    },
    init: function () {
        let event = this.data.event;
        let el = this.el;
        
        this.el.addEventListener('click', function (evt) {
            //console.log('I was at: ', evt.detail.intersection.point);
            el.emit(event);
            console.log("debug-fuse: event " + event + " sent to " + el.id);
            
        });
    }
});
