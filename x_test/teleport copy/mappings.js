// https: //github.com/fernandojsg/aframe-input-mapping-component
var mappings = {
    mappings: {
        default: {
            common: {
                trackpaddown: 'teleportstart',
                trackpadup: 'teleportend'
            },
            'oculus-touch-controls': {
                bbuttondown: 'teleportstart',
                bbuttonup: 'teleportend'
            },
            keyboard: {
                't_down': 'teleportstart',
                't_up': 'teleportend'
            }
        }
    }
};

AFRAME.registerInputMappings(mappings);