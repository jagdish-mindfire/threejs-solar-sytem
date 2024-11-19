import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export const sunTexture = textureLoader.load("/static/textures/sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace

export const mercuryTexture = textureLoader.load("/static/textures/mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace

export const venusTexture = textureLoader.load("/static/textures/venus.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace

export const earthTexture = textureLoader.load("/static/textures/earth.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace

export const marsTexture = textureLoader.load("/static/textures/mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace

export const moonTexture = textureLoader.load("/static/textures/moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace


