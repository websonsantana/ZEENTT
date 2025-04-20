// Função para selecionar o item clicado e destacar
function selecionarItem(item) {
  // Remove a classe 'selected' de todos os itens
  const itens = document.querySelectorAll('.item');
  itens.forEach(i => i.classList.remove('selected'));

  // Adiciona a classe 'selected' ao item clicado
  item.classList.add('selected');
}

// Função para alternar o menu mobile
function toggleMenu() {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('open'); // Alterna a classe 'open'
}

// Evento para lidar com o clique nos itens do menu (opcional)
document.addEventListener('DOMContentLoaded', () => {
  const itens = document.querySelectorAll('.item');
  itens.forEach(item => {
    item.addEventListener('click', () => selecionarItem(item));
  });

  const botaoMenu = document.querySelector('.menu-toggle');
  if (botaoMenu) {
    botaoMenu.addEventListener('click', toggleMenu);
  }
});
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
self.addEventListener("install", function (event) {
  console.log("Service Worker instalado");
});

self.addEventListener("fetch", function (event) {
  // Estratégia de cache pode ser colocada aqui
});
