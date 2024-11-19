import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {sunMaterial} from './material/planets';
import {planets} from './data/planets';
import { createPlanet,createMoon } from "./utils/planets";
import {sphereGeometry} from './geometry/sphare';
import './style.css';

const scene = new THREE.Scene();

//Add lights
const ambientLight = new THREE.AmbientLight(
    'white',0.3
);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(
    'white',1000
);
scene.add(pointLight);


const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);


const planetMeshes = planets.map(planet=>{
    const planetMesh = createPlanet(planet);
    scene.add(planetMesh);
    planet.moons.forEach((moon)=>{
        const moonMesh = createMoon(moon);
        planetMesh.add(moonMesh);
    })
    return planetMesh;
});


//Camera
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth/window.innerHeight,
    0.1,
    400
)
camera.position.z = 55;
camera.position.y = 5;
const renderer = new THREE.WebGLRenderer({
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
   planetMeshes.forEach((planet,planetIndex)=>{
       planet.rotation.y +=planets[planetIndex].speed;
       planet.position.x = Math.sin(planet.rotation.y)* planets[planetIndex].distance;
       planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;
       planet.children.forEach((moon,moonIndex)=>{
           moon.rotation.y +=planets[planetIndex].moons[moonIndex].speed;
           moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
           moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
       })
    })
    sun.rotation.y += 0.001;
    controls.update(); 
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
});