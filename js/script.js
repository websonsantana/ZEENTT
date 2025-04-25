const usuarios = [
    { usuario: "admin", senha: "admin123", nome: "Administrador" },
    { usuario: "usuario", senha: "user123", nome: "Usuário Padrão" },
    { usuario: "zeentt", senha: "zeentt2023", nome: "Zeentt Team" },
    { usuario: "silva", senha: "0000", nome: "Administrador" },
    { usuario: "wsantana", senha: "654321", nome: "Administrador" }
];

// LOGIN
function fazerLogin(evento) {
    evento.preventDefault();

    const usuarioDigitado = document.getElementById("username").value;
    const senhaDigitada = document.getElementById("password").value;

    if (!usuarioDigitado || !senhaDigitada) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }

    const usuarioEncontrado = usuarios.find(user => user.usuario === usuarioDigitado && user.senha === senhaDigitada);

    if (usuarioEncontrado) {
        salvarSessao(usuarioEncontrado);
        window.location.href = "menu.html";
    } else {
        exibirMensagem("Usuário ou senha incorretos!", "erro");
        document.getElementById("password").value = "";
    }
}

function salvarSessao(usuario) {
    const agora = new Date().getTime();
    const dadosSessao = {
        usuario: usuario.usuario,
        nome: usuario.nome,
        dataLogin: new Date().toISOString(),
        ultimoAcesso: agora,
        ativo: true
    };
    localStorage.setItem("sessaoUsuario", JSON.stringify(dadosSessao));
}

function verificarSessao() {
    const sessao = JSON.parse(localStorage.getItem("sessaoUsuario"));
    if (sessao?.ativo) {
        const agora = new Date().getTime();
        const tempoInativo = agora - sessao.ultimoAcesso;

        if (tempoInativo > 1800000) { // 30 minutos
            fazerLogoff();
        } else {
            sessao.ultimoAcesso = agora;
            localStorage.setItem("sessaoUsuario", JSON.stringify(sessao));
        }
    }
}

function atualizarUltimoAcesso() {
    const sessao = JSON.parse(localStorage.getItem("sessaoUsuario"));
    if (sessao?.ativo) {
        sessao.ultimoAcesso = new Date().getTime();
        localStorage.setItem("sessaoUsuario", JSON.stringify(sessao));
    }
}

function fazerLogoff() {
    localStorage.removeItem("sessaoUsuario");
    window.location.href = "login.html";
}

function exibirMensagem(texto, tipo) {
    let mensagemEl = document.querySelector(".mensagem-login");

    if (!mensagemEl) {
        mensagemEl = document.createElement("div");
        mensagemEl.className = "mensagem-login";
        const container = document.querySelector(".container") || document.body;
        container.appendChild(mensagemEl);
    }

    mensagemEl.style.cssText = `
        background-color: ${tipo === "erro" ? "#f44336" : "#4CAF50"};
        color: white;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        text-align: center;
    `;
    mensagemEl.textContent = texto;

    setTimeout(() => mensagemEl.remove(), 3000);
}

// MENU
function loadMenu() {
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    const menuList = document.getElementById("menuList");
    if (!menuList) return;

    menuList.innerHTML = "";
    menu.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("item");
        li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button class='delete' onclick='deleteItem(${index})'>X</button>`;
        li.onclick = () => selecionarItem(li);
        menuList.appendChild(li);
    });
}

function addItem() {
    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    if (name && price) {
        const menu = JSON.parse(localStorage.getItem("menu")) || [];
        menu.push({ name, price });
        localStorage.setItem("menu", JSON.stringify(menu));
        loadMenu();
    }
}

function deleteItem(index) {
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu.splice(index, 1);
    localStorage.setItem("menu", JSON.stringify(menu));
    loadMenu();
}

function selecionarItem(item) {
    document.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
}

function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu?.classList.toggle("active");
    const menuButton = document.querySelector('.mobile-menu-button');
menuButton.addEventListener('click', toggleMenu);
}

// PEDIDOS
function loadOrders() {
    const list = document.querySelector(".list");
    if (!list) return;

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    list.innerHTML = "";
    savedOrders.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.quantity} x</span><span>${item.name}</span> <span>R$ ${(item.quantity * item.price).toFixed(2)}</span> <button class="delete" data-index="${index}">x</button>`;
        list.appendChild(li);
    });

    updateSummary();
}

function updateSummary() {
    const totalPriceEl = document.getElementById("total-price");
    const totalItemsEl = document.getElementById("total-items");
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const totalPrice = savedOrders.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const totalItems = savedOrders.reduce((sum, item) => sum + parseInt(item.quantity), 0);

    if (totalPriceEl) totalPriceEl.textContent = `R$ ${totalPrice.toFixed(2)}`;
    if (totalItemsEl) totalItemsEl.textContent = totalItems;
}

// INICIALIZAÇÃO// ... (todo o código anterior permanece igual até o final do DOMContentLoaded)
const itemElements = document.querySelectorAll("#menuList .item");
let selectedItems = {};
let total = 0;

function updateTotal() {
  total = 0;
  itemElements.forEach((itemEl, index) => {
    const checkbox = itemEl.querySelector("input");
    if (checkbox.checked) {
      const price = parseFloat(itemEl.getAttribute("data-price"));
      total += price;
    }
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

itemElements.forEach((itemEl, index) => {
  const checkbox = itemEl.querySelector("input");
  checkbox.addEventListener("change", updateTotal);
});

window.showModal = function (element) {
    const item = element.closest(".item");
    const title = item.getAttribute("data-title");
    const desc = item.getAttribute("data-description");
    const price = parseFloat(item.getAttribute("data-price")).toFixed(2);
    const img = item.getAttribute("data-img");
  
    document.getElementById("modalDetails").innerHTML = `
      <h2>${title}</h2>
      <img src="${img}" alt="${title}" style="width: 100%; max-height: 300px; object-fit: cover; margin: 10px 0;">
      <p>${desc}</p>
      <p><strong>Preço:</strong> R$ ${price}</p>
    `;
  
    document.getElementById("modal").style.display = "flex";
  };
  

window.closeModal = function () {
  document.getElementById("modal").style.display = "none";
};

window.adicionarSelecionadosAoPedido = function () {
  const pedidosAtuais = JSON.parse(localStorage.getItem("orders")) || [];

  itemElements.forEach((itemEl) => {
    const checkbox = itemEl.querySelector("input");
    if (checkbox.checked) {
      pedidosAtuais.push({
        name: itemEl.getAttribute("data-title"),
        price: parseFloat(itemEl.getAttribute("data-price")),
        quantity: 1
      });
      checkbox.checked = false;
    }
  });

  localStorage.setItem("orders", JSON.stringify(pedidosAtuais));
  alert("Itens adicionados ao pedido!");
  updateTotal();
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", fazerLogin);
    }
});

document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target.id === "modal") {
      closeModal();
    }
  });


  
