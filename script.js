
    const users = {
        'abarreto': {
            password: 'teste1',
            pages: ['opcoes.html', 'cadastro.html', 'consulta.html','dashboard.html'],
            unidade: ['piedade', 'boa_viagem']
        },
        'rleao': {
            password: '123456',
            pages: ['opcoes.html', 'cadastro.html', 'consulta.html'],
            unidade: ['piedade', 'boa_viagem']
        },
        'wsantana': {
            password: '654321',
            pages: ['consulta.html'],
            unidade: ['piedade']
        },
        'igomes': {
            password: '010101',
            pages: ['opcoes.html'],
            unidade: ['boa_viagem']
        }
    };

    const loginForm = document.getElementById('loginForm');
    const unidadeSelect = document.getElementById('unidade');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const unidade = unidadeSelect.value;
        const username = usernameInput.value;
        const password = passwordInput.value;

        const user = users[username];

        if (user && user.password === password && user.unidade.includes(unidade)) {
            
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('lastActivity', Date.now());
            window.location.href = user.pages[0];
        } else {
            alert('Usuário, senha ou unidade incorretos.');
        }
    });

    function checkActivity() {
        const lastActivity = sessionStorage.getItem('lastActivity');
        if (Date.now() - lastActivity > 10 * 60 * 1000) { // 10 minutos
            sessionStorage.clear();
            alert('Sessão expirada. Faça login novamente.');
            window.location.href = 'index.html';
        }
    }

    setInterval(checkActivity, 60000); // Verifica a cada 1 minuto

    document.addEventListener('mousemove', () => {
        sessionStorage.setItem('lastActivity', Date.now());
    });

    document.addEventListener('keypress', () => {
        sessionStorage.setItem('lastActivity', Date.now());
    });

    
