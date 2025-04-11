function selecionarItem(item) {
  // Remove a classe 'selected' de todos os itens
  const itens = document.querySelectorAll('.item');
  itens.forEach(i => i.classList.remove('selected'));

  // Adiciona a classe 'selected' ao item clicado
  item.classList.add('selected');
}

function toggleMenu() {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('active'); // Alterna a classe 'active'
}