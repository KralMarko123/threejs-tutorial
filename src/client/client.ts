import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(10));
scene.add(new THREE.AxesHelper(-10));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.domElement);

//GUI, FOLDERS
const gui = new GUI();
const guiCubeFolder = gui.addFolder("Cube");
guiCubeFolder.open();

const guiCubeRotationFolder = guiCubeFolder.addFolder("Rotation");
guiCubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
guiCubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
guiCubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
guiCubeRotationFolder.open();

const guiCubePositionFolder = guiCubeFolder.addFolder("Position");
guiCubePositionFolder.add(cube.position, "x", -10, 10);
guiCubePositionFolder.add(cube.position, "y", -10, 10);
guiCubePositionFolder.add(cube.position, "z", -10, 10);
guiCubePositionFolder.open();

const guiCubeScaleolder = guiCubeFolder.addFolder("Scale");
guiCubeScaleolder.add(cube.scale, "x", 0, 5);
guiCubeScaleolder.add(cube.scale, "y", 0, 5);
guiCubeScaleolder.add(cube.scale, "z", 0, 5);
guiCubeScaleolder.open();

guiCubeFolder.add(cube, "visible");

//ANIMATION
function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.025;
  // cube.rotation.y += 0.025;

  render();
  stats.update();
}

//RENDER
function render() {
  renderer.render(scene, camera);
}

//FUNCTION CALLS
animate();
