function selecionarItem(item) {
    // Remove a classe 'selected' de todos os itens
    const itens = document.querySelectorAll('.item');
    itens.forEach(i => i.classList.remove('selected'));
  
    // Adiciona a classe 'selected' ao item clicado
    item.classList.add('selected');
  }
  
  function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
   }

{
  "name": "Meu App",
  "short_name": "App",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
