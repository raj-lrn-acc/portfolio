import * as THREE from 'three';

export function createProceduralBrain(material: THREE.MeshPhysicalMaterial): THREE.Group {
  const group = new THREE.Group();

  const leftGeo = buildHemisphere(-1, material);
  const rightGeo = buildHemisphere(1, material);

  const leftMesh = new THREE.Mesh(leftGeo, material);
  const rightMesh = new THREE.Mesh(rightGeo, material);

  group.add(leftMesh);
  group.add(rightMesh);

  const stemGeo = new THREE.CylinderGeometry(0.2, 0.35, 0.8, 12, 8);
  stemGeo.translate(0, -0.9, 0);
  const stem = new THREE.Mesh(stemGeo, material);
  group.add(stem);

  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.55, 0.15, 0),
    new THREE.Vector3(-0.2, 0.6, 0.05),
    new THREE.Vector3(0.2, 0.6, -0.05),
    new THREE.Vector3(0.55, 0.15, 0)
  );
  const tubeGeo = new THREE.TubeGeometry(curve, 14, 0.1, 8, false);
  const connector = new THREE.Mesh(tubeGeo, material);
  group.add(connector);

  group.scale.setScalar(1.8);
  return group;
}

function buildHemisphere(side: number, material: THREE.MeshPhysicalMaterial): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2 + 0.3);
  const pos = geo.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    let { x, y, z } = vertex;

    x *= 0.85;
    y *= 1.05;
    z *= 0.7 + y * 0.15;

    const gyri = (
      Math.sin(x * 4.5 + y * 2.0) * Math.cos(z * 3.5) * 0.18 +
      Math.sin(x * 7.0 + z * 5.0) * 0.10 +
      Math.cos(y * 6.0 + x * 3.0) * 0.08 +
      Math.sin((x + z) * 5.0 + y * 4.0) * 0.06
    );

    const len = Math.sqrt(x * x + y * y + z * z);
    if (len > 0.01) {
      x += (x / len) * gyri;
      y += (y / len) * gyri;
      z += (z / len) * gyri;
    }

    const innerCutoff = 0.15;
    if (side === -1 && x > -innerCutoff) {
      const excess = x - (-innerCutoff);
      x = -innerCutoff + excess * 0.3;
    }
    if (side === 1 && x < innerCutoff) {
      const excess = x - innerCutoff;
      x = innerCutoff + excess * 0.3;
    }

    const s = Math.sin(y * 2.5 + x * 1.5 + z * 2.0) * 0.04;
    pos.setXYZ(i, x, y + s, z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}
