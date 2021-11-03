// Art 109 Three.js Demo Site
// client5.js
// A three.js scene that combines the
// glTF loader example (client2.js)
// and AsciiEffect example (client4.js)

// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";

// Import add-on for GLTF models
import { GLTFLoader } from "./src/GLTFLoader.js";
// Note that we are using the TrackballControls so the
// OrbitControls from client2.js are not loaded.

// Import AsciiEffect and TrackballControls
import { AsciiEffect } from './src/AsciiEffect.js';
import { TrackballControls } from './src/TrackballControls.js';

// Declaring variables for the scene
let camera, controls, container, scene, renderer, effect, mesh;

const start = Date.now();

// Call the init and animate functions (client4.js style)
init();
animate();

// Define the init function which contains the bulk of the scene
function init() {

  //Identify div in HTML to place scene
  container = document.getElementById("space2");

  //Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    500 / 500,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xdfdfdf);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(500, 500);

  // Material to be added to model
  var newMaterial = new THREE.MeshStandardMaterial({
    color: 0x2E5939
  });

  // Load GLTF model, add material, and add it to the scene
  const loader = new GLTFLoader().load(
    "./assets/testing123fogv3.glb",
    function(gltf) {
      // Scan loaded model for mesh and apply defined material if mesh is present
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = newMaterial;
        }
      });
      // set position and scale
      mesh = gltf.scene;
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0.349066, 0, 0); // <-- changed to better display texture
      mesh.scale.set(.2, .2, .2);
      // Add model to scene
      scene.add(mesh);
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

  // Position our camera so we can see the shape
  camera.position.z = 4.5;

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  scene.add(directionalLight);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, .97);
  scene.add(ambientLight);

  // Add AsciiEffect
  effect = new AsciiEffect(renderer, ' -~=#', {
    invert: true
  });
  effect.setSize(500, 500);
  effect.domElement.style.color = '#6E2E99';
  effect.domElement.style.backgroundColor = '#2E9939';

  // Add scene to gltf.html
  container.appendChild(effect.domElement);

  // Add controls
  controls = new TrackballControls(camera, effect.domElement);

}

// Define animate function
function animate() {

  requestAnimationFrame(animate);

  render();

}


// Define the render loop
function render() {

  // Add rotation animation
  const timer = Date.now() - start;
  mesh.rotation.y = timer * 0.0003;

  controls.update();
  effect.render(scene, camera);
}
