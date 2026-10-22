import { GitBranch, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRMLLoader } from "three/addons/loaders/VRMLLoader.js";

import { Button } from "@/components/ui/button";

import "./App.css";

const MODEL_URL = `${import.meta.env.BASE_URL}taggerv1.wrl`;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.5));

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const fitToScene = () => {
      const box = new THREE.Box3().setFromObject(modelGroup);
      if (box.isEmpty()) return;
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      camera.near = sphere.radius / 100;
      camera.far = sphere.radius * 100;
      camera.updateProjectionMatrix();
      controls.target.copy(box.getCenter(new THREE.Vector3()));
      camera.position
        .copy(sphere.center)
        .add(
          new THREE.Vector3(1, 1, 6)
            .normalize()
            .multiplyScalar(sphere.radius * 3),
        );
      controls.update();
    };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    const loadModel = () => {
      const loader = new VRMLLoader();
      loader.load(
        MODEL_URL,
        (vrmlScene) => {
          modelGroup.add(vrmlScene);
          fitToScene();
        },
        undefined,
        (err) => {
          console.error(err);
          if (!cancelled) setLoadFailed(true);
        },
      );
    };

    loadModel();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden gap-2" ref={containerRef}>
        {loadFailed && (
          <p className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center text-muted-foreground text-sm">
            No se pudo cargar el modelo 3D
          </p>
        )}
        <div className="absolute top-4 right-4 z-50 flex gap-1">
          <Button
            asChild
            size="icon"
            variant="outline"
            aria-label="Repositorio en GitHub"
            className="rounded-[0.675rem] h-8 w-8"
          >
            <a
              href="https://github.com/raulmoracode/tagger"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch className="h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            aria-label="Sitio raulmoracode.com"
            className="rounded-[0.675rem] h-8 w-8"
          >
            <a href="https://raulmoracode.com" target="_blank" rel="noreferrer">
              <Globe className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
