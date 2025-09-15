// Importa a função de inicialização do nosso novo módulo de globo
import { initGlobe } from './globe/index.js';

// Seleciona o elemento HTML que servirá de contêiner para o globo
const globeContainer = document.getElementById('globe-container');

// Verifica se o contêiner foi encontrado no documento
if (globeContainer) {
  // Se encontrou, chama a função para criar e animar o globo dentro dele
  initGlobe(globeContainer);
} else {
  // Se não, exibe um erro no console para ajudar a depurar
  console.error('O elemento #globe-container não foi encontrado no DOM.');
}
