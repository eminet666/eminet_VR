/* global AFRAME */
AFRAME.registerShader('sky', {
    schema: {
        worldDayTex: {
            type: 'map',
            is: 'uniform'
        },
        worldNightTex: {
            type: 'map',
            is: 'uniform'
        },
        sunDirection: {
            type: 'vec3',
            default: 'vec3(1,0,0)',
            is: 'uniform'
        }
    },

    vertexShader: `  // use backtick for multi-line text
    varying vec3 vWorldPosition;
    varying vec2 vUV;

    void main() {
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;
        vUV = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `,

    fragmentShader: `  // use backtick for multi-line text
    uniform vec3 sunDirection;
    varying vec3 vWorldPosition;
    varying vec2 vUV;

    void main() 
    {
        vec2 sunUV = vec2( sunDirection.z, 0.5 );
        vec2 cmpUV = vec2( 1.0-vUV.x, vUV.y );
        vec2 diffUV = vec2( sunUV.x-cmpUV.x, sunUV.y-cmpUV.y );

        float dist = sqrt( (diffUV.x*diffUV.x) + (diffUV.y*diffUV.y) );

        if( dist<0.01 )
            gl_FragColor.rgb = vec3(1,0.98,0.7);
        else
            gl_FragColor.rgb = vec3(0,0,0);

        gl_FragColor.a = 1.0;
    }
    `

});