//Funcion que chequea el usuario y contraseña ingresados en el array de registros.
function loginCheck(userName, password, registros) {
    return registros.find(record => record.userName === userName && record.password === password);
}

// Evento de clic en el botón de "Enviar"
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    // Recupera los registros almacenados en el Local Storage
    const storedRegistros = JSON.parse(localStorage.getItem('registros')) || [];

    // Verifica el inicio de sesión con los registros recuperados
    const userRecord = loginCheck(userName, password, storedRegistros);

    if (userRecord) {
        alert("Login exitoso. Sesión Iniciada");

        // Almacenar el nombre de usuario en el Local Storage
        localStorage.setItem('nombreUsuario', userName);

        // Redirigir a index.html
        window.location.href = "index.html";
    } else {
        alert("Usuario o Contraseña incorrectos");
    }
});

// Verificar si hay un usuario logueado al cargar la página principal (index.html)
document.addEventListener("DOMContentLoaded", function () {
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    if (nombreUsuario) {
        // Mostrar el saludo en la barra de navegación
        const saludoContainer = document.getElementById("saludo-container");

        if (saludoContainer) {
            saludoContainer.style.display = "block";
            saludoContainer.innerText = "Hola " + nombreUsuario;
        }
    }
});

