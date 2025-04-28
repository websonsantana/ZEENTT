document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.aparecer');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('mostrar');
      }
    });
  });
  const texto = "Precisou, fala com a ZEENTT, tudo para seu restaurante em um só lugar!";
  const elemento = document.getElementById('texto-digitando');
  let index = 0;
  
  function digitar() {
    if (index < texto.length) {
      elemento.innerHTML += texto.charAt(index);
      index++;
      setTimeout(digitar, 50);
    }
  }
  digitar();
    const menuToggle = document.querySelector('.menu-toggle');    

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});