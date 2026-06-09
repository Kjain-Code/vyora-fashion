import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import './Hero.css';

const words = ['Luxury.', 'Elegance.', 'Fashion.', 'Style.'];

const Hero = () => {
  const mountRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Word cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Three.js
  useEffect(() => {
    const el = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Subtle gold particles
    const count = 3000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random() - 0.5) * 40;
      pos[i*3+1] = (Math.random() - 0.5) * 40;
      pos[i*3+2] = (Math.random() - 0.5) * 20;
      const bright = 0.4 + Math.random() * 0.3;
      col[i*3] = bright * 1.0;
      col[i*3+1] = bright * 0.8;
      col[i*3+2] = bright * 0.1;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const particles = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.06, vertexColors: true, transparent: true, opacity: 0.5
    }));
    scene.add(particles);

    // Floating thin rings — subtle background
    const addRing = (r, tube, opacity, rx, ry) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 16, 200),
        new THREE.MeshBasicMaterial({ color: 0xC9A84C, transparent: true, opacity })
      );
      m.rotation.x = rx; m.rotation.y = ry;
      scene.add(m);
      return m;
    };
    const r1 = addRing(8, 0.008, 0.06, Math.PI/4, 0);
const r2 = addRing(12, 0.006, 0.04, Math.PI/6, Math.PI/5);
const r3 = addRing(5, 0.007, 0.05, Math.PI/2, Math.PI/8);

    // 3 floating diamonds — small, subtle
    const addD = (size, x, y, z) => {
      const m = new THREE.Mesh(
        new THREE.OctahedronGeometry(size, 0),
        new THREE.MeshPhongMaterial({ color: 0xC9A84C, emissive: 0x3a2000, shininess: 400, specular: 0xffd700, transparent: true, opacity: 0.85 })
      );
      m.position.set(x, y, z);
      scene.add(m);
      return m;
    };
    const d1 = addD(0.5, 5, 2, -2);
    const d2 = addD(0.3, -6, -2, -3);
    const d3 = addD(0.2, 3, -3, -1);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl = new THREE.PointLight(0xC9A84C, 4, 20);
    pl.position.set(3, 3, 5); scene.add(pl);
    const pl2 = new THREE.PointLight(0xffd700, 2, 15);
    pl2.position.set(-5, -2, 4); scene.add(pl2);

    camera.position.z = 10;

    // Entrance
    gsap.from(d1.position, { y: -8, duration: 2.5, ease: 'elastic.out(1,0.5)', delay: 0.5 });
    gsap.from(d2.position, { y: 8, duration: 2.8, ease: 'elastic.out(1,0.5)', delay: 0.7 });
    gsap.from(d3.position, { y: -6, duration: 2.2, ease: 'elastic.out(1,0.5)', delay: 0.9 });

    let mx = 0, my = 0;
    const onMouse = e => { mx = (e.clientX/window.innerWidth - 0.5)*2; my = (e.clientY/window.innerHeight - 0.5)*2; };
    window.addEventListener('mousemove', onMouse);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.01;
      r1.rotation.z = t * 0.08;
      r2.rotation.z = -t * 0.06;
      r3.rotation.x = t * 0.1;
      d1.rotation.y = t * 0.5; d1.rotation.x = t * 0.3;
      d2.rotation.y = -t * 0.4; d2.rotation.z = t * 0.3;
      d3.rotation.x = t * 0.6;
      d1.position.y = 2 + Math.sin(t * 0.7) * 0.4;
      d2.position.y = -2 + Math.cos(t * 0.5) * 0.3;
      pl.intensity = 3.5 + Math.sin(t * 1.2) * 1;
      camera.position.x += (mx * 0.3 - camera.position.x) * 0.03;
      camera.position.y += (-my * 0.3 - camera.position.y) * 0.03;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="hero">
      <div ref={mountRef} className="hero-3d" />

      {/* Top eyebrow */}
      <div className="hero-top-bar">
        <span className="hero-top-left">FOR HER. FOR HIM. FOR YOU.</span>
        <span className="hero-top-right">NEW COLLECTION 2026</span>
      </div>

      {/* Main content — center */}
      <div className="hero-center">
        <p className="hero-pre">We make fashion</p>
        <h1 className="hero-big-title">
          <span className={`hero-word ${visible ? 'word-in' : 'word-out'}`}>
            {words[wordIndex]}
          </span>
        </h1>
        <div className="hero-divider-line" />
        <p className="hero-desc">
          Premium fashion crafted for those who demand the finest.<br />
          Discover the new Vyora collection.
        </p>
        <div className="hero-btns">
          <button className="btn-gold">EXPLORE COLLECTION →</button>
          <button className="btn-ghost">WATCH FILM ▶</button>
        </div>
      </div>

      {/* Stats bottom */}
      <div className="hero-bottom-bar">
        <div className="hero-stat">
          <span className="hstat-num">500+</span>
          <span className="hstat-label">PRODUCTS</span>
        </div>
        <div className="hbar-divider" />
        <div className="hero-stat">
          <span className="hstat-num">50K+</span>
          <span className="hstat-label">HAPPY CLIENTS</span>
        </div>
        <div className="hbar-divider" />
        <div className="hero-stat">
          <span className="hstat-num">100%</span>
          <span className="hstat-label">PREMIUM</span>
        </div>
        <div className="hbar-divider" />
        <div className="hero-powered">
          Vyora powered by <span>TechSpire Solutions</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-dot" />
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;