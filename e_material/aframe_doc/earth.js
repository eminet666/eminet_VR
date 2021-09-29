/* global AFRAME */
AFRAME.registerShader('earth', {
schema: {
worldDayTex: { type: 'map', is: 'uniform' },
worldNightTex: { type: 'map', is: 'uniform' },
sunDirection: { type: 'vec3', default: 'vec3(1,0,0)', is: 'uniform' }
},

vertexShader:
` // use backtick for multi-line text
varying vec3 vWorldPosition;
varying vec2 vUV;
varying vec3 vNormal;

void main() {
vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
vWorldPosition = worldPosition.xyz;
vUV = uv;
vNormal = normal;

gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
,

fragmentShader:
` // use backtick for multi-line text
uniform sampler2D worldDayTex;
uniform sampler2D worldNightTex;
uniform vec3 sunDirection;

varying vec3 vWorldPosition;
varying vec2 vUV;
varying vec3 vNormal;

void main()
{
vec3 worldDayColor = texture2D(worldDayTex, vUV).rgb;
vec3 worldNightColor = texture2D(worldNightTex, vUV).rgb;

// 2D rotational direction of the sun is stored in x and y
// but we need it to rotate around the y axis, so shuffle components
vec3 sunDir = vec3( sunDirection.x, 0, sunDirection.y );

// sunFactor +1 means sun directly overhead, noon
// sunFactor -1 means sun directly behind, midnight',
// sunFactor 0 means sun at horizon, sunset or sunrise',
float sunFactor = dot( vNormal, sunDir );

// amplify so we tend more towards pure day or pure night
if( sunFactor>0.0 )
sunFactor = sqrt( sunFactor );
else
sunFactor = -sqrt( -sunFactor );

float sunFactorNorm = (sunFactor + 1.0) * 0.5;

gl_FragColor.rgb = mix( worldNightColor, worldDayColor, sunFactorNorm );

gl_FragColor.a = 1.0;
}
`
});