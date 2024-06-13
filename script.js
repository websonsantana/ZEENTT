document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 
	'jbrandao',
	'wsantana',
	'gmoreira'
	&& password === 
	'123456',
	'654321',
	'010101'
	
	) {
        window.location.href = 'estoque.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});
