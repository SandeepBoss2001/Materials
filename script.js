import * as THREE from "three";
import  "./style.css"
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "./node_modules/three/examples/jsm/loaders/RGBELoader";
import GUI from 'lil-gui'; 

const canvas = document.querySelector('canvas.webgl');

 
const scene = new THREE.Scene()
// texture
const textureloader = new THREE.TextureLoader()
const texture = textureloader.load("./Static/texture.jpg")
// 
texture.colorSpace = THREE.SRGBColorSpace
// mesh
const squr  = new THREE.BoxGeometry( 1, 1, 1 );
const color = new THREE.MeshPhysicalMaterial()
color.metalness = 1
color.roughness = 0





// color.wireframe = true
const mesh = new THREE.Mesh(
    new THREE.TorusGeometry( 0.8, 0.4, 16, 32),
    color
)
// mesh2
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry( 1, 16, 16 ),
    color
    
)
mesh2.position.x -= 3

// Light
// const light = new THREE.AmbientLight(0xffffff, 1 ); 
// scene.add( light );
// // 
// const light2 = new THREE.PointLight( 0xffffff,30 );
// light.position.set( 2, 3, 4 );
// scene.add( light2 );
// gui
const gui = new GUI();
gui.add(color, "metalness").min(0).max(2).step(0.0001)
gui.add(color, "roughness").min(0).max(2).step(0.0001)

// RGBELOader  copy paste
const rgbe = new RGBELoader()
rgbe.load("./Static/2k.hdr",(environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})
// 

scene.add(mesh, mesh2)
// mesh2
// size
const sizes = {
    width: 800,
    height: 600
}
// camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
camera.position.z = 5;
scene.add(camera)



// control
const controls = new OrbitControls( camera, canvas );
// rendereer

const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)


//animate

let clock = new THREE.Clock()

const animate = ()=>{
    const ellipse = clock.getElapsedTime()
    mesh.rotation.y = ellipse * 2 
    mesh2.rotation.y = ellipse * 2
    renderer.render(scene, camera)
   window.requestAnimationFrame(animate)
   
}
animate()
// 
window.addEventListener("dblclick", function(){
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})