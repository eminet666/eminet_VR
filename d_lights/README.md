## lights
* documentation : [aframe doc](https://aframe.io/docs/1.2.0/components/light.html)
* exemples: [default](./default.html) | [properties](./light_1_properties.html) | 
[ambiant](./light_2_type_1_ambiant.html)| [directional](./light_2_type_2_directional.html) |
[dir-target](./light_2_type_2_directional_target.html) |
[hemisphere](./light_2_type_3_hemisphere.html) | [](./light_2_type_4_point.html) |
[spot](./light_2_type_5_spot.html)

* source : [tuto](https://aframe-course.glitch.me/0800-lights.html)
* exemple : [default](./lights_0_default.html) | [disable](./lights_0_desabledefault.html) |
[ambiant](./lights_1_ambiant.html) | [directional](./lights_2_directional.html) |
[hemisphere](./lights_3_hemisphere.html) | [point](./lights_4_point.html) |
[spot](./lights_5_spot.html) | [spot_target](./lights_6_spot_target.html) |
[shadow](./lights_7_shadow.html)

* [exemple](https://aframe.io/aframe-school/#/7/1)

### types
#### Ambient : lights globally affect all entities in the scene 
- propriétés : color, intensity
- position, rotation, and scale have no effect on ambient lights.
- recommendation : to have some form of ambient light such that shadowed areas are not fully black 
```html
<a-entity light="type: ambient; color: #CCC"></a-entity>
```
- [example](./aframe_doc/light_2_type_1_ambiant.html)

#### Directional : infinitely far away, but from a specific direction, like the sun. 
- absolute position do not have an effect on the intensity
- specify the direction using the position component
- example : light upper-left at a 45-degree angle 
(only the vector matters, position="-100 100 0" and position="-1 1 0" are the same)
```html
<a-entity light="type: directional; color: #EEE; intensity: 0.5" position="-1 1 0"></a-entity>
```
- [example](./aframe_doc/light_2_type_2_directional.html)

- specify the direction by creating a child entity it targets. 
```html
<a-light type="directional" position="0 0 0" rotation="-90 0 0" target="#directionaltarget">
  <a-entity id="directionaltarget" position="0 0 -1"></a-entity>
</a-light>
```
- [example](./aframe_doc/light_2_type_2_directional_target.html)
- the most efficient type for adding realtime shadows to a scene.

#### Hemisphere : like an ambient light with 2 colors (1 above (color), 1 below (groundColor))
```html
<a-entity light="type: hemisphere; color: #33C; groundColor: #3C3; intensity: 2">
</a-entity>
```
- [example](./aframe_doc/light_2_type_3_hemisphere.html)


#### Point : omni-directional and affect materials depending on their position and distance
- like light bulb (<> directional light).
```html
<a-entity light="type: point; intensity: 0.75; distance: 50; decay: 2" position="0 10 10">
</a-entity>
```
- [example](./aframe_doc/light_2_type_4_point.html)
- properties : 
decay : amount the light dims along the distance (defautt : 1.0)
distance : distance where intensity becomes 0.

#### Spot : cast light only in one direction (but not omni-directional)
```html
<a-entity light="type: spot; angle: 45"></a-entity>
```
- [example](./aframe_doc/light_2_type_5_spot.html)
- properties : 
angle : maximum extension from its direction (in degrees) (default: 60)
decay : amount the light dims along the distance of the light (default : 1.0)
distance : distance where intensity becomes 0
penumbra : percent of the spotlight cone that is attenuated due to penumbra (default : 0)
target 	element the spot should point to