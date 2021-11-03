// Art 109 Three.js Demo Site
// client2.js
// A three.js scene which loads a custom GLTF model and implements Orbit controls

// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";

// Import add-ons for GLTF models and orbit controls
import { OrbitControls } from "./src/OrbitControls.js";
import { GLTFLoader } from "./src/GLTFLoader.js";

//Identify div in HTML to place scene
var container = document.getElementById("space");

//Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xdfdfdf);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
//renderer.setSize(400, 800);
// Add scene to gltf.html
container.appendChild(renderer.domElement);

// Material to be added to model
var newMaterial = new THREE.MeshStandardMaterial({ color: 0x2E5939 });

// Variable for GLTF data
var mesh;

// Load GLTF model, add material, and add it to the scene
const loader = new GLTFLoader().load(
  "./assets/testing123fogv3.glb", // comment this line out and un comment the line below to swithc models
  //"./assets/gourd_web.glb", //<-- photogrammetery model
  function(gltf) {
    // Scan loaded model for mesh and apply defined material if mesh is present
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        //child.material = newMaterial;
      }
    });
    // set position and scale
    mesh = gltf.scene;
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(45, 0, 0);
    mesh.scale.set(.2, .2, .2); // <-- change this to (1, 1, 1) for photogrammetery model
    // Add model to scene
    scene.add(mesh);
  },
  undefined,
  function(error) {
    console.error(error);
  }
);

// Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 3;
controls.maxDistance = 6;
controls.target.set(0, 0, -0.2);
controls.update();

// Position our camera so we can see the shape
camera.position.z = 4.5;

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

// Define and call the render loop
// Define
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
// Call
render();

// Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  render();
}
