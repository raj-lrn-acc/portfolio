import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, TorusKnot } from "@react-three/drei"
import * as THREE from "three"

function Particles() {
  const ref = useRef<THREE.Points>(null!)
  const count = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#efded9"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function CenterPiece() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <TorusKnot ref={ref} args={[1, 0.3, 128, 16]}>
        <meshNormalMaterial transparent opacity={0.15} wireframe />
      </TorusKnot>
    </Float>
  )
}

function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
        <CenterPiece />
      </Canvas>
    </div>
  )
}

export default Scene
