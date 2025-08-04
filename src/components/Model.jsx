import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export default function Model({ url, position, scale , rotation}) {
  const { scene } = useGLTF(url);
  const group = useRef();

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.FrontSide;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <primitive object={scene} />
    </group>
  );
}