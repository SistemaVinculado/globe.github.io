import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import Globe from 'https://unpkg.com/three-globe/dist/three-globe.module.js';

export function initGlobe(container) {
  // --- Configuração da Cena, Câmera e Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.8));

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 240;

  // --- Instância e Configuração do Globo ---
  const globe = new Globe()
    .globeImageUrl('./js/globe/earth-dark.jpg') 
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .polygonsData([])
    .arcsData([])
    .pointsData([]);

  // --- Carregamento de Dados Geoespaciais (Países) ---
  fetch('./js/globe/globe-data-min.json')
    .then(res => res.json())
    .then(countries => {
      globe.polygonsData(countries.features)
        .polygonCapColor(() => 'rgba(0, 200, 0, 0.15)')
        .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
        .polygonStrokeColor(() => '#00ff00');
    });

  // --- Carregamento de Dados de Voos ---
  fetch('./js/globe/my-flights.json')
    .then(res => res.json())
    .then(flights => {
      globe.arcsData(flights)
        .arcColor(() => 'aquamarine')
        .arcAltitude(0.25)
        .arcStroke(0.3);
    });

  // --- Carregamento de Dados de Aeroportos ---
  fetch('./js/globe/my-airports.json')
    .then(res => res.json())
    .then(airports => {
        globe.pointsData(airports)
        .pointColor(() => 'orange')
        .pointAltitude(0)
        .pointRadius(0.1);
    });

  scene.add(globe);

  // --- Desativar a interatividade e Ativar a Rotação Automática ---
  const controls = globe.controls();
  controls.enabled = false; // Desativa o zoom e o arrastar do mouse
  controls.autoRotate = true; // Ativa a rotação automática
  controls.autoRotateSpeed = 0.4; // Ajuste a velocidade da rotação aqui

  // --- Loop de Animação ---
  function animate() {
    controls.update(); // Necessário para a rotação automática funcionar
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  // --- Responsividade da Janela ---
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', onWindowResize, false);
}
