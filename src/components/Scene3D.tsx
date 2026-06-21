import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { mouse, drag } from "@/hooks/useMouseParallax"

function Shape({ pos, scale: s, color, opacity }: { pos: THREE.Vector3; scale: number; color: THREE.Color; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const params = useMemo(() => {
    const geos = [
      { geo: new THREE.IcosahedronGeometry(0.3, 0), speed: 0.005 + Math.random() * 0.02 },
      { geo: new THREE.OctahedronGeometry(0.25, 0), speed: 0.008 + Math.random() * 0.02 },
      { geo: new THREE.TorusGeometry(0.4, 0.08, 16, 32), speed: 0.006 + Math.random() * 0.02 },
      { geo: new THREE.TetrahedronGeometry(0.3, 0), speed: 0.01 + Math.random() * 0.015 },
      { geo: new THREE.DodecahedronGeometry(0.2, 0), speed: 0.005 + Math.random() * 0.025 },
    ]
    return geos[Math.floor(Math.random() * geos.length)]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const depthFactor = 1 + pos.z * 0.1
    ref.current.position.x = pos.x + mouse.x * depthFactor * 1.5
    ref.current.position.y = pos.y + mouse.y * depthFactor * 1.2
    ref.current.rotation.x += params.speed * 0.5
    ref.current.rotation.y += params.speed
    ref.current.rotation.z += params.speed * 0.3
  })

  return (
    <mesh ref={ref} position={pos} scale={s} geometry={params.geo}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  )
}

function FloatingShapes() {
  const shapes = useMemo(() => {
    const arr = []
    for (let i = 0; i < 12; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2
        ),
        scale: 0.5 + Math.random() * 1.2,
        opacity: 0.08 + Math.random() * 0.15,
        color: new THREE.Color().setHSL(0.03 + Math.random() * 0.05, 0.3, 0.7 + Math.random() * 0.2),
      })
    }
    return arr
  }, [])

  return (
    <group>
      {shapes.map((s, i) => (
        <Shape key={i} pos={s.pos} scale={s.scale} color={s.color} opacity={s.opacity} />
      ))}
    </group>
  )
}

function Particles({ count = 1000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
      const c = new THREE.Color().setHSL(0.03, 0.2, 0.5 + Math.random() * 0.4)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
      siz[i] = 0.02 + Math.random() * 0.03
    }
    return [pos, col, siz]
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.05 + i) * 0.0003
      pos[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.04 + i * 1.3) * 0.0003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + mouse.x * 0.02
    ref.current.rotation.x = mouse.y * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CenterTorus() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const df = 1 + (-5) * 0.08
    ref.current.position.x = mouse.x * df * 0.5
    ref.current.position.y = mouse.y * df * 0.4
    ref.current.rotation.x = state.clock.elapsedTime * 0.12 + mouse.y * 0.1
    ref.current.rotation.y = state.clock.elapsedTime * 0.08 + mouse.x * 0.1
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.15
  })

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusKnotGeometry args={[1.2, 0.35, 64, 8]} />
      <meshPhysicalMaterial
        color="#efded9"
        metalness={0.3}
        roughness={0.2}
        transparent
        opacity={0.15}
        wireframe
        envMapIntensity={0.5}
      />
    </mesh>
  )
}

function GlowRings() {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1 + mouse.y * 0.05
    ref.current.rotation.y = state.clock.elapsedTime * 0.05 + mouse.x * 0.05
  })

  return (
    <group ref={ref} position={[0, 0, -3]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i / 5) * Math.PI]}>
          <ringGeometry args={[1.8 + i * 0.4, 1.82 + i * 0.4, 64]} />
          <meshBasicMaterial
            color="#efded9"
            transparent
            opacity={0.04 + i * 0.02}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += (drag.rotationX - groupRef.current.rotation.x) * 0.08
    groupRef.current.rotation.y += (drag.rotationY - groupRef.current.rotation.y) * 0.08
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#efded9" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#ffffff" />
      <Particles />
      <FloatingShapes />
      <CenterTorus />
      <GlowRings />
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 touch-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: "none" }}
      >
        <SceneGroup />
      </Canvas>
    </div>
  )
}
