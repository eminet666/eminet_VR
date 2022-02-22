##  mixamo

* [source model](https://free3d.com/3d-model/male-base-mesh-6682.html)
* [mixamo site](https://www.mixamo.com/#/)
* [3D model viewer](https://www.creators3d.com/online-viewer)

#### mixamo to aframe
[mixamo to aframe](https://www.youtube.com/watch?v=gGFAF0Flc5Q)
Mode d'emploi (idem mac/pc):
1. Sur Firefox : 
- créer un compte mixamo
- uploader le modèle 3D au format obj (ou zip avec .mtl et textures en jpg)
- placer les marqueurs (attention aux côtés left-right des poignets-coudes-genoux)
- et choisir l'option "no fingers" ... pour que le rig se génère
- exporter la position de base en fbx ou collada (Idle) avec option 'with skin'
- puis choisir plusieurs animations (Walking, Dying, Running, ...)
- et les exporter aussi (cliquer sur 'in place' pour celles qui intègre un déplacement)
Remarque : options d'exportation des animations : 24fps, with skin, ...

2. Dans Blender : 
- ouvrir Blender et enlever le cube
- importer le Idle.flx et renomment en Idle dans la collection et idle dans les animations
- ouvrir 'Dope Sheet' et selection 'Action Editor'
- 'idle' apparait et appuyer sur 'Push Down' pour l'ajouter à la liste des animations
- importer le 'Walking.fbx' et renommer l'animation en 'walking'
- sélectionner l'objet Idle dans la collection (très important)
- dans la liste des animations, sélectionner 'walking' et appuyer sur "Push Down' pour l'ajouter
- supprimer l'objet dans la collection (sinon l'animation apparaitra 2 fois, une copie avec Idle)
- recommencer avec Running.fbs et Dying.fbx
- sauvegarder le .blend et exporter en .glb (avec les animations)

3. Dans Gltf Viewer
- tester le .glb, les différentes animations

4. Avec aframe
- créer un fichier .html et intégrer le fichier .glb




