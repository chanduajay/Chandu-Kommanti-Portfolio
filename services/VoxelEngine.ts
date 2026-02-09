
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppState, SimulationVoxel, RebuildTarget, VoxelData } from '../types';
import { CONFIG, COLORS } from '../utils/voxelConstants';

export class VoxelEngine {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private instanceMesh: THREE.InstancedMesh | null = null;
  private dummy = new THREE.Object3D();
  
  private voxels: SimulationVoxel[] = [];
  private rebuildTargets: RebuildTarget[] = [];
  private rebuildStartTime: number = 0;
  
  private state: AppState = AppState.STABLE;
  private onStateChange: (state: AppState) => void;
  private onCountChange: (count: number) => void;
  private animationId: number = 0;

  private particles: THREE.Points | null = null;

  constructor(
    container: HTMLElement, 
    onStateChange: (state: AppState) => void,
    onCountChange: (count: number) => void
  ) {
    this.container = container;
    this.onStateChange = onStateChange;
    this.onCountChange = onCountChange;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(CONFIG.BG_COLOR);
    this.scene.fog = new THREE.Fog(CONFIG.BG_COLOR, 70, 180);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(40, 40, 70);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
    this.controls.target.set(0, 5, 0);

    // BRIGHT STUDIO LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
    this.scene.add(ambientLight);

    // High Key Top Light
    const mainSpot = new THREE.SpotLight(0xffffff, 2.0);
    mainSpot.position.set(0, 120, 40);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.5;
    mainSpot.decay = 1;
    mainSpot.distance = 400;
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 2048;
    this.scene.add(mainSpot);

    // Side Fill
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(50, 20, 50);
    this.scene.add(fillLight);

    // Ground Reflections
    const groundPoint = new THREE.PointLight(0x0ea5e9, 0.6, 100);
    groundPoint.position.set(-20, CONFIG.FLOOR_Y + 1, -20);
    this.scene.add(groundPoint);

    // Bright Floor
    const floorMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        roughness: 0.1, 
        metalness: 0.1,
        transparent: true,
        opacity: 0.8
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = CONFIG.FLOOR_Y;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const grid = new THREE.GridHelper(400, 60, 0xd1d5db, 0xf1f5f9);
    grid.position.y = CONFIG.FLOOR_Y + 0.01;
    this.scene.add(grid);

    this.createAtmosphere();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private createAtmosphere() {
    const geo = new THREE.BufferGeometry();
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 200;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.5,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  public loadInitialModel(data: VoxelData[]) {
    this.createVoxels(data);
    this.onCountChange(this.voxels.length);
    this.state = AppState.STABLE;
    this.onStateChange(this.state);
  }

  private createVoxels(data: VoxelData[]) {
    if (this.instanceMesh) {
      this.scene.remove(this.instanceMesh);
      this.instanceMesh.geometry.dispose();
      (this.instanceMesh.material as THREE.Material).dispose();
    }

    this.voxels = data.map((v, i) => {
        const c = new THREE.Color(v.color);
        return {
            id: i,
            x: v.x, y: v.y, z: v.z, color: c,
            vx: 0, vy: 0, vz: 0, rx: 0, ry: 0, rz: 0,
            rvx: 0, rvy: 0, rvz: 0
        };
    });

    const geometry = new THREE.BoxGeometry(CONFIG.VOXEL_SIZE - 0.05, CONFIG.VOXEL_SIZE - 0.05, CONFIG.VOXEL_SIZE - 0.05);
    const material = new THREE.MeshStandardMaterial({ 
        roughness: 0.3, 
        metalness: 0.2,
        emissiveIntensity: 0.05
    });
    
    this.instanceMesh = new THREE.InstancedMesh(geometry, material, this.voxels.length);
    this.instanceMesh.castShadow = true;
    this.instanceMesh.receiveShadow = true;
    this.scene.add(this.instanceMesh);

    this.draw();
  }

  private draw() {
    if (!this.instanceMesh) return;
    this.voxels.forEach((v, i) => {
        this.dummy.position.set(v.x, v.y, v.z);
        this.dummy.rotation.set(v.rx, v.ry, v.rz);
        this.dummy.updateMatrix();
        this.instanceMesh!.setMatrixAt(i, this.dummy.matrix);
        this.instanceMesh!.setColorAt(i, v.color);
    });
    this.instanceMesh.instanceMatrix.needsUpdate = true;
    this.instanceMesh.instanceColor!.needsUpdate = true;
  }

  public dismantle() {
    if (this.state !== AppState.STABLE) return;
    this.state = AppState.DISMANTLING;
    this.onStateChange(this.state);

    this.voxels.forEach(v => {
        v.vx = (Math.random() - 0.5) * 1.8;
        v.vy = Math.random() * 1.5 + 1;
        v.vz = (Math.random() - 0.5) * 1.8;
        v.rvx = (Math.random() - 0.5) * 0.4;
        v.rvy = (Math.random() - 0.5) * 0.4;
        v.rvz = (Math.random() - 0.5) * 0.4;
    });
  }

  public rebuild(targetModel: VoxelData[]) {
    if (this.state === AppState.REBUILDING) return;

    const available = this.voxels.map((v, i) => ({ index: i, color: v.color, taken: false }));
    const mappings: RebuildTarget[] = new Array(this.voxels.length).fill(null);

    targetModel.forEach(target => {
        let bestDist = 9999;
        let bestIdx = -1;
        for (let i = 0; i < available.length; i++) {
            if (available[i].taken) continue;
            const c2 = new THREE.Color(target.color);
            const dr = available[i].color.r - c2.r;
            const dg = available[i].color.g - c2.g;
            const db = available[i].color.b - c2.b;
            const d = Math.sqrt(dr * dr + dg * dg + db * db);
            
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
                if (d < 0.01) break;
            }
        }
        if (bestIdx !== -1) {
            available[bestIdx].taken = true;
            mappings[available[bestIdx].index] = {
                x: target.x, y: target.y, z: target.z,
                delay: Math.random() * 600
            };
        }
    });

    for (let i = 0; i < this.voxels.length; i++) {
        if (!mappings[i]) {
            mappings[i] = {
                x: this.voxels[i].x, y: this.voxels[i].y, z: this.voxels[i].z,
                isRubble: true, delay: 0
            };
        }
    }

    this.rebuildTargets = mappings;
    this.rebuildStartTime = Date.now();
    this.state = AppState.REBUILDING;
    this.onStateChange(this.state);
  }

  private updatePhysics() {
    if (this.state === AppState.DISMANTLING) {
        this.voxels.forEach(v => {
            v.vy -= 0.06;
            v.x += v.vx; v.y += v.vy; v.z += v.vz;
            v.rx += v.rvx; v.ry += v.rvy; v.rz += v.rvz;

            if (v.y < CONFIG.FLOOR_Y + 0.5) {
                v.y = CONFIG.FLOOR_Y + 0.5;
                v.vy *= -0.3; v.vx *= 0.8; v.vz *= 0.8;
            }
        });
    } else if (this.state === AppState.REBUILDING) {
        const now = Date.now();
        const elapsed = now - this.rebuildStartTime;
        let allDone = true;

        this.voxels.forEach((v, i) => {
            const t = this.rebuildTargets[i];
            if (t.isRubble) return;
            if (elapsed < t.delay) { allDone = false; return; }

            const speed = 0.18 + Math.random() * 0.08;
            v.x += (t.x - v.x) * speed;
            v.y += (t.y - v.y) * speed;
            v.z += (t.z - v.z) * speed;
            v.rx += (0 - v.rx) * speed;
            v.ry += (0 - v.ry) * speed;
            v.rz += (0 - v.rz) * speed;

            if (Math.abs(t.x - v.x) > 0.02) allDone = false;
            else { v.x = t.x; v.y = t.y; v.z = t.z; v.rx = 0; v.ry = 0; v.rz = 0; }
        });

        if (allDone) {
            this.state = AppState.STABLE;
            this.onStateChange(this.state);
        }
    }
    if (this.particles) this.particles.rotation.y += 0.001;
  }

  private animate() {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.updatePhysics();
    this.draw();
    this.renderer.render(this.scene, this.camera);
  }

  public handleResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  public setAutoRotate(enabled: boolean) {
    this.controls.autoRotate = enabled;
  }

  public cleanup() {
    cancelAnimationFrame(this.animationId);
    this.container.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}
