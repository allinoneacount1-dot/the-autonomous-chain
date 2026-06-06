'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function NeuralParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const speed = 0.002 + Math.random() * 0.003;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, offset });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      if (t < 0.5) {
        // Cyan: 0, 240, 255
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.94;
        colors[i * 3 + 2] = 1;
      } else {
        // Violet: 139, 92, 246
        colors[i * 3] = 0.55;
        colors[i * 3 + 1] = 0.36;
        colors[i * 3 + 2] = 0.96;
      }
    }
    return colors;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      dummy.position.set(
        p.x + Math.sin(time * p.speed * 10 + p.offset) * 0.5,
        p.y + Math.cos(time * p.speed * 8 + p.offset) * 0.5,
        p.z + Math.sin(time * p.speed * 6 + p.offset) * 0.3
      );
      const scale = 0.02 + Math.sin(time + p.offset) * 0.01;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.6} />
      <instancedBufferAttribute attach="geometry-attributes-color" args={[colorArray, 3]} />
    </instancedMesh>
  );
}

function ChainRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    groupRef.current.rotation.x = time * 0.05;
    groupRef.current.rotation.y = time * 0.08;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * Math.PI / 3, i * Math.PI / 4, 0]}>
          <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00F0FF' : '#8B5CF6'}
            transparent
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.03;
    meshRef.current.rotation.y = time * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <NeuralParticles />
        <ChainRings />
        <WireframeIcosahedron />
      </Canvas>
    </div>
  );
}
