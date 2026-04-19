import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import * as THREE from "three";

// ── Suppress the harmless KHR_materials_pbrSpecularGlossiness warning ────────
// This extension is deprecated but Three.js logs it on every GLTF load.
// We filter it out at the source rather than registering a dead plugin.
;(function suppressGLTFWarning() {
  const _warn = console.warn.bind(console)
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('KHR_materials_pbrSpecularGlossiness')) return
    _warn(...args)
  }
})()

const REGION_COLORS = {
  prefrontal:   "#378ADD",
  amygdala:     "#D85A30",
  hippocampus:  "#1D9E75",
  hypothalamus: "#EF9F27",
  cerebellum:   "#85B7EB",
  brainstem:    "#aaa89e",
};

const REGION_LABELS = {
  prefrontal:   "Prefrontal Cortex",
  amygdala:     "Amygdala",
  hippocampus:  "Hippocampus",
  hypothalamus: "Hypothalamus",
  cerebellum:   "Cerebellum",
  brainstem:    "Brain Stem",
};

const REGION_CAMERA = {
  prefrontal:   { position: [-1.4,  0.9,  2.0], target: [-0.3,  0.3,  0] },
  amygdala:     { position: [ 0.8, -0.2,  2.4], target: [ 0.2, -0.1,  0.2] },
  hippocampus:  { position: [ 1.4,  0.1,  1.8], target: [ 0.4,  0.0,  0.1] },
  hypothalamus: { position: [ 0.3,  0.2,  2.6], target: [ 0.1,  0.1,  0.2] },
  cerebellum:   { position: [ 1.5, -0.9,  1.8], target: [ 0.5, -0.5,  0] },
  brainstem:    { position: [ 0.2, -1.2,  2.2], target: [ 0.0, -0.7,  0.1] },
};

function getRegionFromName(name) {
  const n = name.toLowerCase();
  if (n.includes("frontal") || n.includes("prefrontal")) return "prefrontal";
  if (n.includes("amygdala"))     return "amygdala";
  if (n.includes("hippocampus"))  return "hippocampus";
  if (n.includes("hypothalamus")) return "hypothalamus";
  if (n.includes("cerebellum"))   return "cerebellum";
  if (n.includes("stem") || n.includes("medulla") || n.includes("pons") || n.includes("brainstem")) return "brainstem";
  return null;
}

function CameraController({ selectedRegion, controlsRef }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!selectedRegion || !REGION_CAMERA[selectedRegion]) return;
    const { position, target } = REGION_CAMERA[selectedRegion];
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(...position);
    const startTarget = controlsRef.current?.target.clone() || new THREE.Vector3();
    const endTarget = new THREE.Vector3(...target);
    let t = 0;
    const duration = 55;
    const tick = () => {
      t++;
      const ease = 1 - Math.pow(1 - t / duration, 3);
      camera.position.lerpVectors(startPos, endPos, ease);
      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(startTarget, endTarget, ease);
        controlsRef.current.update();
      }
      if (t < duration) requestAnimationFrame(tick);
    };
    tick();
  }, [selectedRegion]);
  return null;
}

function BrainModel({ selectedRegion, onSelect }) {
  const { scene } = useGLTF("/modals/brain.glb");

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        try {
          child.material = child.material.clone();
          child.material.transparent = true;

          const region = getRegionFromName(child.name);
          const isSelected = region === selectedRegion;

          child.material.emissive = new THREE.Color("#000000");
          child.material.emissiveIntensity = 0;

          if (selectedRegion) {
            if (isSelected) {
              child.material.emissive = new THREE.Color(REGION_COLORS[selectedRegion]);
              child.material.emissiveIntensity = 0.85;
              child.material.opacity = 1.0;
            } else {
              child.material.opacity = 0.32;
              child.material.emissiveIntensity = 0;
            }
          } else {
            child.material.opacity = 1.0;
          }
        } catch (_) {}
      }
    });
  }, [scene, selectedRegion]);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        try {
          const region = getRegionFromName(e.object?.name || "");
          if (region) onSelect(region);
        } catch (_) {}
      }}
    >
      <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[ 3,  3,  3]} intensity={1.3} />
      <directionalLight position={[-3,  2, -2]} intensity={0.8} />
      <directionalLight position={[ 0, -3,  2]} intensity={0.7} color="#aaccff" />
      <directionalLight position={[ 0,  0, -3]} intensity={0.5} color="#ffeedd" />
      <directionalLight position={[ 0,  3, -3]} intensity={0.4} color="#cce4ff" />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#378ADD" wireframe />
    </mesh>
  );
}

function RegionLegend({ selectedRegion, onSelect, onReset }) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 7,
      padding: "10px 14px",
      background: "rgba(8,16,36,0.72)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
    }}>
      {Object.entries(REGION_LABELS).map(([id, label]) => {
        const active = selectedRegion === id;
        const color  = REGION_COLORS[id];
        return (
          <button
            key={id}
            onClick={() => onSelect(active ? null : id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px 5px 8px",
              borderRadius: 20,
              border: `1.5px solid ${active ? color : "rgba(255,255,255,0.12)"}`,
              background: active ? `${color}22` : "rgba(255,255,255,0.04)",
              color: active ? color : "rgba(255,255,255,0.65)",
              fontSize: 11,
              fontWeight: active ? 700 : 500,
              fontFamily: "system-ui, sans-serif",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "all 0.18s",
              boxShadow: active ? `0 0 12px ${color}44` : "none",
            }}
          >
            <span style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: color,
              display: "inline-block",
              flexShrink: 0,
              boxShadow: active ? `0 0 6px ${color}` : "none",
            }} />
            {label}
          </button>
        );
      })}

      <button
        onClick={onReset}
        style={{
          marginLeft: "auto",
          padding: "5px 12px",
          borderRadius: 20,
          border: "1.5px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.4)",
          fontSize: 11,
          fontFamily: "system-ui",
          cursor: "pointer",
          letterSpacing: "0.04em",
          transition: "all 0.18s",
        }}
      >
        ↺ Reset
      </button>
    </div>
  );
}

export default function BrainModal3D({ selectedRegion, onSelect }) {
  const controlsRef = useRef();

  function handleReset() {
    onSelect(null);
    if (controlsRef.current) {
      controlsRef.current.object.position.set(0, 0, 3);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }

  return (
    <div style={{
      width: "100%",
      borderRadius: 16,
      overflow: "hidden",
      background: "linear-gradient(160deg, #080f1e 0%, #0b1a30 60%, #080f14 100%)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ height: 400, position: "relative" }}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#080f1e"), 1)}
        >
          <SceneLights />

          <Suspense fallback={<LoadingFallback />}>
            <CameraController selectedRegion={selectedRegion} controlsRef={controlsRef} />
            <BrainModel selectedRegion={selectedRegion} onSelect={onSelect} />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableZoom
            enablePan={false}
            minDistance={1.5}
            maxDistance={6}
            autoRotate={!selectedRegion}
            autoRotateSpeed={0.5}
          />
        </Canvas>

        {!selectedRegion && (
          <div style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.25)",
            fontSize: 10,
            fontFamily: "system-ui",
            letterSpacing: "0.08em",
            pointerEvents: "none",
            userSelect: "none",
          }}>
            DRAG TO ROTATE · SCROLL TO ZOOM
          </div>
        )}

        {selectedRegion && (
          <div style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 14px 6px 10px",
            borderRadius: 20,
            background: "rgba(8,16,36,0.82)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid ${REGION_COLORS[selectedRegion]}55`,
            color: REGION_COLORS[selectedRegion],
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "system-ui",
            letterSpacing: "0.04em",
            pointerEvents: "none",
            boxShadow: `0 0 20px ${REGION_COLORS[selectedRegion]}33`,
          }}>
            <span style={{
              width: 9, height: 9,
              borderRadius: "50%",
              background: REGION_COLORS[selectedRegion],
              display: "inline-block",
              boxShadow: `0 0 8px ${REGION_COLORS[selectedRegion]}`,
            }} />
            {REGION_LABELS[selectedRegion]}
          </div>
        )}
      </div>

      <RegionLegend
        selectedRegion={selectedRegion}
        onSelect={onSelect}
        onReset={handleReset}
      />
    </div>
  );
}

useGLTF.preload("/modals/brain.glb");
