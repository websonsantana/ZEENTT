const usuarios = [
    { usuario: "admin", senha: "admin123", nome: "Administrador" },
    { usuario: "usuario", senha: "user123", nome: "Usuário Padrão" },
    { usuario: "zeentt", senha: "zeentt2023", nome: "Zeentt Team" },
    { usuario: "msilva", senha: "1234", nome: "Administrador" },
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

document.addEventListener("DOMContentLoaded", function () {
    const formularioLogin = document.getElementById("loginForm");
    if (formularioLogin) formularioLogin.addEventListener("submit", fazerLogin);

    verificarSessao();

    if (window.location.pathname.includes("login.html")) {
        const sessao = JSON.parse(localStorage.getItem("sessaoUsuario"));
        if (sessao?.ativo) window.location.href = "menu.html";
    }

    document.addEventListener("click", atualizarUltimoAcesso);
    document.addEventListener("keydown", atualizarUltimoAcesso);

    const addButton = document.querySelector(".add");
    const saveButton = document.querySelector(".save");
    const concludeButton = document.querySelector(".conclude");

    if (addButton) {
        addButton.addEventListener("click", () => {
            const menuItems = JSON.parse(localStorage.getItem("menu")) || [];
            if (menuItems.length === 0) {
                alert("Nenhum item no cardápio cadastrado!");
                return;
            }

            const itemName = prompt("Digite o nome do item (deve estar no cardápio):");
            const menuItem = menuItems.find(item => item.name.toLowerCase() === itemName?.toLowerCase());

            if (!menuItem) {
                alert("Item não encontrado no cardápio!");
                return;
            }

            const quantity = parseInt(prompt("Quantidade:")) || 1;
            const newItem = { quantity, name: menuItem.name, price: menuItem.price };

            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            savedOrders.push(newItem);
            localStorage.setItem("orders", JSON.stringify(savedOrders));
            loadOrders();
        });
    }

    const list = document.querySelector(".list");
    if (list) {
        list.addEventListener("click", function (event) {
            if (event.target.classList.contains("delete")) {
                const index = event.target.getAttribute("data-index");
                const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
                savedOrders.splice(index, 1);
                localStorage.setItem("orders", JSON.stringify(savedOrders));
                loadOrders();
            }
        });
    }

    if (saveButton) saveButton.addEventListener("click", () => alert("Pedido salvo!"));
    if (concludeButton) concludeButton.addEventListener("click", () => concluirPedido());

    loadMenu();
    loadOrders();
});

function concluirPedido() {
    alert('Pedido concluído!');
    const pedidoList = document.querySelector('.list');
    if (pedidoList) pedidoList.innerHTML = '';

    localStorage.removeItem("orders");
    updateSummary();
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.mobile-menu');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

const items = [
    { title: "Combo dos Clássicos", price: 52.90, description: "2 Sanduíches + Batata + Bebida. Escolha entre Big Mac, Cheddar McMelt..." },
    { title: "4 Pequenos Preços", price: 32.00, description: "Escolha 4 itens entre Cheeseburger, McFiesta, Chicken Jr..." },
    { title: "McOferta Média + Nuggets/Cheeseburger/McFlurry", price: 43.90, description: "1 McOferta Média Clássica + acompanhamento (Nuggets, Cheeseburger ou McFlurry)." },
    { title: "2 McOfertas Médias", price: 68.90, description: "2 McOfertas Médias Clássicas para compartilhar." },
    { title: "2 Sanduíches com desconto", price: 30.90, description: "Leve 2 sanduíches com desconto entre várias opções." }
  ];

  let total = 0;

  const menuList = document.getElementById('menuList');
  const totalDisplay = document.getElementById('total');
  const modal = document.getElementById('modal');
  const modalDetails = document.getElementById('modalDetails');

  function updateTotal(amount) {
    total += amount;
    totalDisplay.textContent = total.toFixed(2);
  }

  function showModal(item) {
    modalDetails.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p><p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p><button class='btn-add' onclick='selectItem(${item.price})'>Selecionar</button>`;
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function selectItem(price) {
    updateTotal(price);
    closeModal();
  }

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<div class='item-title'>${item.title}</div><div class='item-price'>a partir de R$ ${item.price.toFixed(2)}</div>`;
    div.onclick = () => showModal(item);
    menuList.appendChild(div);
  });