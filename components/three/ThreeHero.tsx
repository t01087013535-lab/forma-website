'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

// ── Background vertex (fullscreen quad, no MVP) ─────────────────────────────
const BG_VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.999, 1.0);
}
`

// ── Background fragment — FORMA palette (ink + bronze) ─────────────────────
const BG_FRAG = /* glsl */`
precision highp float;

uniform float u_time;
uniform vec2  u_mouse;       // NDC: -1..1
uniform vec2  u_resolution;

varying vec2 vUv;

float hash21(vec2 p) {
  p  = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5, f = 1.0;
  for (int i = 0; i < 6; i++) {
    v  += a * valueNoise(p * f);
    a  *= 0.52;
    f  *= 2.05;
    p  += vec2(3.14, 2.71) * 0.12;
  }
  return v;
}

float warpedFbm(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + t),
                fbm(p + vec2(5.2, 1.3) + t));
  return fbm(p + 1.2 * q + t * 0.3);
}

void main() {
  vec2 uv = vUv;
  vec2 st = uv * 2.0 - 1.0;
  st.x   *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.06;

  float n1 = warpedFbm(st * 1.3 + t, t);
  float n2 = fbm(st * 2.4 - t * 0.5 + vec2(4.8, 2.1));
  float n  = mix(n1, n2, 0.40);

  // Base: near-black with warm undertone (FORMA ink)
  vec3 col = vec3(0.013, 0.014, 0.012);

  // Subtle noise variation — warm shadow tone
  col = mix(col, vec3(0.035, 0.030, 0.020), pow(n, 1.6));

  // ── Mouse light probe (bronze/amber — FORMA accent) ──────────────
  vec2 mouseAR = u_mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
  float mDist  = length(st - mouseAR);
  float mGlow  = 1.0 - smoothstep(0.0, 1.8, mDist);
  mGlow        = pow(mGlow, 1.9);

  // Bronze glow (FORMA accent #675e3f → r=0.40, g=0.37, b=0.25)
  vec3 bronzeCol = vec3(0.40, 0.37, 0.25);
  col += bronzeCol * mGlow * 0.09;
  col += vec3(0.12, 0.09, 0.05) * mGlow * 0.30;

  // Secondary softer ring
  float mRing = smoothstep(0.6, 0.0, abs(mDist - 0.9));
  col += bronzeCol * mRing * 0.015;

  // ── Central vertical shaft (monolith hint) ────────────────────────
  float shaft     = 1.0 - smoothstep(0.0, 0.22, abs(uv.x - 0.5));
  float shaftFade = smoothstep(1.0, 0.10, uv.y);
  col += vec3(0.04, 0.035, 0.020) * shaft * shaftFade;

  // ── Vignette ──────────────────────────────────────────────────────
  float vig = 1.0 - smoothstep(0.28, 1.55, length(st * 0.72));
  col *= mix(0.10, 1.0, vig);

  // ── Film grain ────────────────────────────────────────────────────
  float grain = (hash21(uv * vec2(1873.5, 2347.1) + fract(u_time * 0.04)) - 0.5) * 0.020;
  col += grain;
  col  = max(col, 0.0);

  gl_FragColor = vec4(col, 1.0);
}
`

// ── Monolith vertex (breathing sine wave) ──────────────────────────────────
const MONO_VERT = /* glsl */`
precision highp float;

uniform float u_time;

varying vec2  vUv;
varying vec3  vNormal;
varying float vY;

void main() {
  vUv     = uv;
  vNormal = normalize(normalMatrix * normal);
  vY      = position.y;

  vec3 pos = position;

  float wave  = sin(pos.y * 3.8 + u_time * 0.7) * 0.003;
  pos.x      += wave;

  float pinch = sin(u_time * 0.4) * 0.002;
  pos.x      += pinch * sign(pos.x);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

// ── Monolith fragment — FORMA palette (bronze hover instead of cyan) ────────
const MONO_FRAG = /* glsl */`
precision highp float;

uniform float u_time;
uniform float u_hover;

varying vec2  vUv;
varying vec3  vNormal;
varying float vY;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.34));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

void main() {
  vec3 base = vec3(0.09, 0.095, 0.085);

  float topLight = smoothstep(-0.8, 0.8, vY) * 0.10;
  base += topLight;

  float edgeX    = abs(vUv.x * 2.0 - 1.0);
  float edgeGlow = pow(edgeX, 3.2);
  base += edgeGlow * vec3(0.14, 0.11, 0.06);  // warm bronze edge

  float scan = sin(vUv.y * 120.0 + u_time * 0.5) * 0.5 + 0.5;
  base += scan * 0.006;

  // ── Hover: bronze/amber glow (FORMA accent) ────────────────────
  vec3 bronze = vec3(0.40, 0.37, 0.25);

  base += bronze * u_hover * 0.12;
  base += bronze * edgeGlow * u_hover * 0.50;

  float hoverScan = sin(vUv.y * 80.0 - u_time * 1.5) * 0.5 + 0.5;
  base += bronze * hoverScan * u_hover * 0.07;

  float g = (hash21(vUv * 512.0) - 0.5) * 0.03;
  base += g;

  float edgeAlpha = 1.0 - edgeX * 0.22;
  float alpha     = mix(0.82, 0.97, u_hover) * edgeAlpha;

  gl_FragColor = vec4(max(base, 0.0), alpha);
}
`

export function ThreeHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const mount = el

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.autoClear = false
    mount.appendChild(renderer.domElement)

    // ── Scenes ──────────────────────────────────────────────────────────────
    const bgScene  = new THREE.Scene()
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const mainScene = new THREE.Scene()
    const cameraGroup = new THREE.Group()
    const mainCamera  = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    mainCamera.position.z = 3
    cameraGroup.add(mainCamera)
    mainScene.add(cameraGroup)

    // ── Resources ────────────────────────────────────────────────────────────
    const toDispose: (THREE.BufferGeometry | THREE.Material)[] = []
    function track<T extends THREE.BufferGeometry | THREE.Material>(r: T): T {
      toDispose.push(r); return r
    }

    // ── Background ───────────────────────────────────────────────────────────
    const bgUniforms = {
      u_time:       { value: 0 },
      u_mouse:      { value: new THREE.Vector2(0, 0) },
      u_resolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
    }
    const bgGeo = track(new THREE.PlaneGeometry(2, 2))
    const bgMat = track(new THREE.ShaderMaterial({
      vertexShader:   BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms:       bgUniforms,
      depthTest:      false,
      depthWrite:     false,
    }))
    const bgMesh       = new THREE.Mesh(bgGeo, bgMat)
    bgMesh.frustumCulled = false
    bgScene.add(bgMesh)

    // ── Monolith ─────────────────────────────────────────────────────────────
    const monoUniforms = {
      u_time:  { value: 0 },
      u_hover: { value: 0 },
    }
    const monoGeo = track(new THREE.BoxGeometry(0.12, 1.65, 0.055, 2, 96, 2))
    const monoMat = track(new THREE.ShaderMaterial({
      vertexShader:   MONO_VERT,
      fragmentShader: MONO_FRAG,
      uniforms:       monoUniforms,
      transparent:    true,
      side:           THREE.FrontSide,
    }))
    const monoMesh = new THREE.Mesh(monoGeo, monoMat)
    mainScene.add(monoMesh)

    // Hitbox
    const hitGeo = track(new THREE.BoxGeometry(0.24, 1.9, 0.24))
    const hitMat = track(new THREE.MeshBasicMaterial({ visible: false }))
    const hitbox = new THREE.Mesh(hitGeo, hitMat)
    mainScene.add(hitbox)

    // ── Raycaster ────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const ndc       = new THREE.Vector2(0, 0)
    let   hovered   = false

    // ── Mouse ────────────────────────────────────────────────────────────────
    let targetX = 0, targetY = 0
    let rotTargetX = 0, rotTargetY = 0

    function onMouseMove(e: MouseEvent) {
      const px = e.clientX / window.innerWidth
      const py = e.clientY / window.innerHeight
      ndc.set(px * 2 - 1, -(py * 2 - 1))
      bgUniforms.u_mouse.value.set(ndc.x, ndc.y)
      targetX = e.clientX
      targetY = e.clientY
    }

    // ── Resize ───────────────────────────────────────────────────────────────
    function onResize() {
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w, h)
      mainCamera.aspect = w / h
      mainCamera.updateProjectionMatrix()
      bgUniforms.u_resolution.value.set(w, h)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize',    onResize,    { passive: true })

    // Custom cursor dot (if exists)
    const cursorDot  = document.getElementById('cursor-dot')
    const cursorRing = document.getElementById('cursor-ring')
    let ringX = 0, ringY = 0

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf = 0
    let lastTime = performance.now()
    let elapsed  = 0

    function tick() {
      raf = requestAnimationFrame(tick)

      const now   = performance.now()
      const raw   = (now - lastTime) / 1000
      const delta = Math.min(raw, 0.1)
      lastTime    = now
      elapsed    += delta

      // Update uniforms
      bgUniforms.u_time.value   = elapsed
      monoUniforms.u_time.value = elapsed

      // Cursor
      if (cursorDot) {
        gsap.set(cursorDot, { x: targetX, y: targetY })
      }
      if (cursorRing) {
        ringX += (targetX - ringX) * 0.10
        ringY += (targetY - ringY) * 0.10
        gsap.set(cursorRing, { x: ringX, y: ringY })
      }

      // Raycaster
      raycaster.setFromCamera(ndc, mainCamera)
      const hits = raycaster.intersectObjects([hitbox], false)
      if (hits.length > 0 && !hovered) {
        hovered = true
        gsap.to(monoUniforms.u_hover, { value: 1, duration: 0.75, ease: 'power2.out', overwrite: true })
        gsap.to(monoMesh.scale, { x: 1.04, y: 1.02, duration: 0.7, ease: 'power2.out', overwrite: true })
      } else if (hits.length === 0 && hovered) {
        hovered = false
        gsap.to(monoUniforms.u_hover, { value: 0, duration: 0.75, ease: 'power2.out', overwrite: true })
        gsap.to(monoMesh.scale, { x: 1, y: 1, duration: 0.7, ease: 'power2.out', overwrite: true })
      }

      // Camera parallax
      const lerpSpeed = 1 - Math.pow(0.04, delta)
      rotTargetX = -ndc.y * 0.05
      rotTargetY =  ndc.x * 0.08
      cameraGroup.rotation.x += (rotTargetX - cameraGroup.rotation.x) * lerpSpeed
      cameraGroup.rotation.y += (rotTargetY - cameraGroup.rotation.y) * lerpSpeed

      // Render
      renderer.clear()
      renderer.render(bgScene,   bgCamera)
      renderer.clearDepth()
      renderer.render(mainScene, mainCamera)
    }

    tick()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    onResize)
      toDispose.forEach(r => r.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  )
}
