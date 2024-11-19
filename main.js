import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

const textureLoader = new THREE.TextureLoader();

const sunTexture = textureLoader.load("/static/textures/sun.jpg");
const mercuryTexture = textureLoader.load("/static/textures/mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace
const venusTexture = textureLoader.load("/static/textures/venus.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace
const earthTexture = textureLoader.load("/static/textures/earth.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace
const marsTexture = textureLoader.load("/static/textures/mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace
const moonTexture = textureLoader.load("/static/textures/moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});



// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];



const createPlanet = (planet) =>{
    const planetMesh = new THREE.Mesh(sphereGeometry,planet.material);
    planetMesh.scale.setScalar(planet.radius);
    planetMesh.position.x=planet.distance;
    return planetMesh;
}

const createMoon = (moon) =>{
    const moonMesh = new THREE.Mesh(sphereGeometry,moonMaterial);
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    return moonMesh;
}

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
camera.position.z = 100;
camera.position.y = 5;
const renderer = new THREE.WebGLRenderer({
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

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