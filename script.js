
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            var users = {
                'rleao': {
                    password: '123456',
                    pages: ['opcoes.html','cadastro.html', 'consulta.html']
                },
                'wsantana': {
                    password: '654321',
                    pages: ['opcoes.html', 'cadastro.html']
                },
                'igomes': {
                    password: '010101',
                    pages: ['opcoes.html']
                }
            };

            if (users[username] && users[username].password === password) {
                // Redirect to the first accessible page for the user
                window.location.href = users[username].pages[0];
            } else {
                alert('Usuário ou senha incorretos');
            }
        });
  
