import * as THREE from './build/three.module.js';

import { AsciiEffect } from './src/AsciiEffect.js';
import { TrackballControls } from './src/TrackballControls.js';
import { GLTFLoader } from "./src/GLTFLoader.js";

let camera, controls, scene, renderer, effect;

let sphere, plane;

const start = Date.now();

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 150;
  camera.position.z = 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  const pointLight1 = new THREE.PointLight(0xffffff);
  pointLight1.position.set(500, 500, 500);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
  pointLight2.position.set(-500, -500, -500);
  scene.add(pointLight2);

  // Load GLTF model, add material, and add it to the scene
  const loader = new GLTFLoader().load(
    "./assets/testing123fogv3.glb",
    function(gltf) {
      // Scan loaded model for mesh and apply defined material if mesh is present
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          //child.material = newMaterial;
        }
      });
      // set position and scale
      mesh = gltf.scene;
      mesh.position.set(-150, 0, 0);
      mesh.rotation.set(45, 0, 0);
      mesh.scale.set(40, 40, 40);
      // Add model to scene
      scene.add(mesh);
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

  sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshPhongMaterial({
    flatShading: true
  }));
  scene.add(sphere);

  // Plane

  plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({
    color: 0xe0e0e0
  }));
  plane.position.y = -200;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effect = new AsciiEffect(renderer, ' .:-+*=%@#', {
    invert: true
  });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'black';
  effect.domElement.style.backgroundColor = 'cyan';

  // Special case: append effect.domElement, instead of renderer.domElement.
  // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

  document.body.appendChild(effect.domElement);

  controls = new TrackballControls(camera, effect.domElement);

  //

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {

  const timer = Date.now() - start;

  sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
  sphere.rotation.x = timer * 0.0003;
  sphere.rotation.z = timer * 0.0002;

  controls.update();

  effect.render(scene, camera);

}
