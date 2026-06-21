import * as THREE from 'three';

export function buildBrain(mat: THREE.MeshPhysicalMaterial): THREE.Group {
  const g = new THREE.Group();

  const left = hemisphere(-1);
  const right = hemisphere(1);

  g.add(new THREE.Mesh(left, mat));
  g.add(new THREE.Mesh(right, mat));

  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.4, 0.2, 0),
    new THREE.Vector3(-0.1, 0.5, 0.03),
    new THREE.Vector3(0.1, 0.5, -0.03),
    new THREE.Vector3(0.4, 0.2, 0)
  );
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 10, 0.07, 6, false), mat));

  const stem = new THREE.CylinderGeometry(0.15, 0.28, 0.6, 8);
  stem.translate(0, -0.75, -0.08);
  g.add(new THREE.Mesh(stem, mat));

  g.scale.setScalar(1.5);
  return g;
}

function hemisphere(side: number): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, 48, 48);
  const p = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    let { x, y, z } = v;

    const egg = 1 + z * 0.25;
    x *= 0.7 * egg;
    y *= 0.9 * (1 + z * 0.08);
    z *= 0.65;

    const gyri =
      Math.sin(x * 5 + y * 3) * Math.cos(z * 4) * 0.12 +
      Math.sin(x * 8 + z * 5 + y * 2) * 0.08 +
      Math.cos(y * 6 + x * 4) * Math.sin(z * 4.5) * 0.06 +
      Math.sin((x + z) * 4.5 + y * 3) * 0.05;

    const len = Math.sqrt(x * x + y * y + z * z);
    if (len > 0.001) {
      x += (x / len) * gyri;
      y += (y / len) * gyri;
      z += (z / len) * gyri;
    }

    const flat = 0.05;
    if (side === -1 && x > -flat) x = -flat + (x + flat) * 0.15;
    if (side === 1 && x < flat) x = flat + (x - flat) * 0.15;

    x += side * 0.32;

    p.setXYZ(i, x, y, z);
  }

  p.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}
