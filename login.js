const usuarios = [
    { usuario: "admin", senha: "admin123", nome: "Administrador" },
    { usuario: "usuario", senha: "user123", nome: "Usuário Padrão" },
    { usuario: "zeentt", senha: "zeentt2023", nome: "Zeentt Team" },
    { usuario: "zeentt", senha: "zeentt2023", nome: "Zeentt Team" },
    { usuario: "msilva", senha: "1234", nome: "Administrador" }
    { usuario: "wsantana", senha: "654321", nome: "Administrador" }
];

document.addEventListener("DOMContentLoaded", function () {
    const formularioLogin = document.getElementById("loginForm");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", fazerLogin);
    }

    verificarSessao();

    // Atualiza o último acesso em qualquer interação
    document.addEventListener("click", atualizarUltimoAcesso);
    document.addEventListener("keydown", atualizarUltimoAcesso);
});

function fazerLogin(evento) {
    evento.preventDefault();

    const usuarioDigitado = document.getElementById("username").value;
    const senhaDigitada = document.getElementById("password").value;

    if (!usuarioDigitado || !senhaDigitada) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }

    const usuarioEncontrado = autenticarUsuario(usuarioDigitado, senhaDigitada);

    if (usuarioEncontrado) {
        salvarSessao(usuarioEncontrado);
        window.location.href = "menu.html";
    } else {
        exibirMensagem("Usuário ou senha incorretos!", "erro");
        document.getElementById("password").value = "";
    }
}

function autenticarUsuario(usuario, senha) {
    return usuarios.find(user => user.usuario === usuario && user.senha === senha) || null;
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
    if (sessao && sessao.ativo) {
        const agora = new Date().getTime();
        const tempoInativo = agora - sessao.ultimoAcesso;

        if (tempoInativo > 1800000) { // 30 minutos
            fazerLogoff(); // sessão expirada
        } else {
            // Atualiza o último acesso
            sessao.ultimoAcesso = agora;
            localStorage.setItem("sessaoUsuario", JSON.stringify(sessao));
        }
    }
}

function atualizarUltimoAcesso() {
    const sessao = JSON.parse(localStorage.getItem("sessaoUsuario"));
    if (sessao && sessao.ativo) {
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
        document.querySelector(".container").appendChild(mensagemEl);
    }

    mensagemEl.style.backgroundColor = tipo === "erro" ? "#f44336" : "#4CAF50";
    mensagemEl.style.color = "white";
    mensagemEl.style.padding = "10px";
    mensagemEl.style.marginTop = "10px";
    mensagemEl.style.borderRadius = "5px";
    mensagemEl.style.textAlign = "center";
    mensagemEl.textContent = texto;

    setTimeout(() => {
        mensagemEl.remove();
    }, 3000);
}
