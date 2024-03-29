document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        localStorage.removeItem('pizzas');
        localStorage.removeItem('token');
        window.location.href = './login.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        localStorage.removeItem('pizzas');
        localStorage.removeItem('token');
        window.location.href = './login.html';
    });
});

