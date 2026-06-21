import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { pointer } from "@/hooks/usePointer"
import { scrollProgress } from "@/hooks/useSmoothScroll"
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing"

/* ---------- Starfield ---------- */
function Stars({ count = 2000 }) {
  const ref = useRef<THREE.Points>(null!)
  const [pos, sizes] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40
      p[i * 3 + 1] = (Math.random() - 0.5) * 30
      p[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5
      s[i] = 0.01 + Math.random() * 0.04
    }
    return [p, s]
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.003 + pointer.x * 0.01
    ref.current.rotation.x = pointer.y * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#efded9"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ---------- Floating Wireframe Shapes ---------- */
function ShapeLayer() {
  const groupRef = useRef<THREE.Group>(null!)
  const shapes = useMemo(() => {
    const arr = []
    for (let i = 0; i < 10; i++) {
      const depth = -2 - Math.random() * 10
      arr.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, depth),
        rotSpeed: 0.003 + Math.random() * 0.015,
        scale: 0.4 + Math.random() * 1.2,
        geo: new THREE.IcosahedronGeometry(0.35, 0),
        color: new THREE.Color().setHSL(0.03, 0.15, 0.6 + Math.random() * 0.3),
        opacity: 0.06 + Math.random() * 0.1,
      })
    }
    return arr
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      const s = shapes[i]
      if (!mesh || !s) return
      const df = 1 + s.pos.z * 0.06
      mesh.position.x = s.pos.x + pointer.x * df * 1.2
      mesh.position.y = s.pos.y + pointer.y * df * 1.0
      mesh.rotation.x += s.rotSpeed * 0.6
      mesh.rotation.y += s.rotSpeed
    })
  })

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale} geometry={s.geo}>
          <meshPhysicalMaterial
            color={s.color}
            transparent
            opacity={s.opacity}
            wireframe
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Center Torus Knot ---------- */
function CenterPiece() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const scrolled = scrollProgress * 2
    ref.current.position.x = pointer.x * 0.6
    ref.current.position.y = pointer.y * 0.5 - scrolled * 0.3
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 + pointer.y * 0.08
    ref.current.rotation.y = state.clock.elapsedTime * 0.1 + pointer.x * 0.08
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusKnotGeometry args={[1.4, 0.4, 128, 16]} />
      <meshPhysicalMaterial
        color="#efded9"
        metalness={0.2}
        roughness={0.1}
        transparent
        opacity={0.12}
        wireframe
        emissive="#efded9"
        emissiveIntensity={0.08}
      />
    </mesh>
  )
}

/* ---------- Orbiting Rings ---------- */
function OrbitalRings() {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.08 + pointer.y * 0.03
    ref.current.rotation.y = state.clock.elapsedTime * 0.04 + pointer.x * 0.03
  })

  return (
    <group ref={ref} position={[0, 0, -4]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2 + (i / 6) * 0.3, 0, (i / 6) * Math.PI]}
        >
          <ringGeometry args={[2 + i * 0.3, 2.02 + i * 0.3, 80]} />
          <meshBasicMaterial
            color="#efded9"
            transparent
            opacity={0.03 + i * 0.015}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Scene ---------- */
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#efded9" />
      <pointLight position={[-5, -3, -5]} intensity={0.2} color="#ffffff" />
      <Stars />
      <ShapeLayer />
      <CenterPiece />
      <OrbitalRings />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.4}
        />
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.03}
          bokehScale={2}
        />
      </EffectComposer>
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 touch-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: "none" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
