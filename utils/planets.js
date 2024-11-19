import * as THREE from 'three';
import {moonMaterial} from '../material/planets';
import {sphereGeometry} from '../geometry/sphare';

export const createPlanet = (planet) =>{
    const planetMesh = new THREE.Mesh(sphereGeometry,planet.material);
    planetMesh.scale.setScalar(planet.radius);
    planetMesh.position.x=planet.distance;
    return planetMesh;
}

export const createMoon = (moon) =>{
    const moonMesh = new THREE.Mesh(sphereGeometry,moonMaterial);
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    return moonMesh;
}