import * as THREE from 'three';

export function createBrain(mat: THREE.MeshPhysicalMaterial): THREE.Group {
  const g = new THREE.Group();

  const left = hemi(-1);
  const right = hemi(1);
  g.add(new THREE.Mesh(left, mat));
  g.add(new THREE.Mesh(right, mat));

  const cb = new THREE.Mesh(callosum(), mat);
  g.add(cb);

  const stem = new THREE.Mesh(stemGeo(), mat);
  g.add(stem);

  g.scale.setScalar(1.6);
  return g;
}

function hemi(side: number): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, 56, 56);
  const p = geo.attributes.position;

  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);

    x *= 0.75;
    y *= 0.95;
    z *= 0.65;

    const gyr =
      Math.sin(x * 5.0 + y * 2.5) * Math.cos(z * 4.0) * 0.14 +
      Math.sin(x * 8.0 + z * 5.0 + y * 3.0) * 0.09 +
      Math.cos(y * 6.0 + x * 3.5) * Math.sin(z * 4.5) * 0.07 +
      Math.sin((x + z) * 5.5 + y * 4.0) * 0.05;

    const l = Math.sqrt(x * x + y * y + z * z);
    if (l > 0.001) { x += (x / l) * gyr; y += (y / l) * gyr; z += (z / l) * gyr; }

    const squeeze = 0.2;
    if (side === -1 && x > -squeeze) x = -squeeze + (x + squeeze) * 0.25;
    if (side === 1 && x < squeeze) x = squeeze + (x - squeeze) * 0.25;

    x += side * 0.38;
    y *= 0.92 + Math.abs(x * 0.15);

    p.setXYZ(i, x, y, z);
  }
  p.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function callosum(): THREE.BufferGeometry {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.45, 0.25, 0),
    new THREE.Vector3(-0.15, 0.55, 0.04),
    new THREE.Vector3(0.15, 0.55, -0.04),
    new THREE.Vector3(0.45, 0.25, 0)
  );
  return new THREE.TubeGeometry(curve, 12, 0.08, 8, false);
}

function stemGeo(): THREE.BufferGeometry {
  const g = new THREE.CylinderGeometry(0.18, 0.32, 0.7, 10, 6);
  g.translate(0, -0.85, -0.1);
  return g;
}
