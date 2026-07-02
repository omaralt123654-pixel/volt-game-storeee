import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec3 vPosition;
  uniform float time;

  void main() {
    vPosition = position;
    vec3 pos = position;
    float pulse = sin(time * 2.0 + length(pos) * 10.0) * 0.02;
    pos += normal * pulse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  uniform float time;

  void main() {
    vec3 color = vec3(0.0, 0.83, 1.0);
    float flow = sin(vPosition.x * 10.0 + time * 3.0) * 0.5 + 0.5;
    color *= 0.5 + 0.5 * flow;
    float edge = 1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)));
    color += vec3(0.48, 0.23, 0.93) * edge * 0.5;
    float alpha = 0.8 + 0.2 * sin(time + vPosition.y * 5.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

const glowVertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  varying vec3 vPosition;
  void main() {
    float intensity = pow(0.6 - dot(normalize(vPosition), vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.0, 0.83, 1.0, intensity * 0.3);
  }
`;

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Main wireframe globe
    const geometry = new THREE.IcosahedronGeometry(1, 3);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const globe = new THREE.LineSegments(edges, material);
    globeGroup.add(globe);

    // Outer glow
    const glowGeometry = new THREE.IcosahedronGeometry(1.2, 2);
    const glowEdges = new THREE.EdgesGeometry(glowGeometry);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const glowGlobe = new THREE.LineSegments(glowEdges, glowMaterial);
    globeGroup.add(glowGlobe);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.005,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      globeGroup.rotation.y = time * 0.1;
      globeGroup.rotation.x = Math.sin(time * 0.05) * 0.1;

      material.uniforms.time.value = time;
      glowMaterial.uniforms.time.value = time;

      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
