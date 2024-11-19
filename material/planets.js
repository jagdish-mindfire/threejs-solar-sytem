import * as THREE from "three";
import {
  sunTexture,
  mercuryTexture,
  venusTexture,
  earthTexture,
  marsTexture,
  moonTexture,
} from "../textures/planets";

export const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

export const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
export const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
export const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
export const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
export const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
