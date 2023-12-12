
const URL = "https://ayacodoacodo.pythonanywhere.com/";


// Función que chequea el usuario y contraseña ingresados en el array de registros.
function loginCheck(userName, password, registros) {
    return registros.find(record => record.userName === userName && record.password === password);
}

// Función para mostrar el saludo
function mostrarSaludo(nombreUsuario) {
    const saludoContainer = document.getElementById("saludo-container");

    if (saludoContainer) {
        saludoContainer.style.display = "block";
        saludoContainer.innerText = "Hola " + nombreUsuario;
    }
}

// Evento de clic en el botón de "Enviar"
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    window.location.replace("modificacionDatosPorUsuario.html");

    // Validaciones
    if (!userName || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    
    // Crear un objeto FormData para enviar al servidor
    const formData = new FormData();
    formData.append('email', userName);
    formData.append('contrasena', password);

    // Solicitud POST al servidor para el inicio de sesión
    fetch(URL + 'login', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Usuario o Contraseña incorrectos');
        }
    })
    .then(data => {
        alert(data.mensaje);
        
        // Almacenar el nombre de usuario en el Local Storage
        localStorage.setItem('nombreUsuario', userName);

        // Redirigir a index.html
        window.location.replace("index.html");
    })
    .catch(error => {
        alert(error.message);
    });
});

// Verificar si hay un usuario logueado al cargar la página principal (index.html)
document.addEventListener("DOMContentLoaded", function () {
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    if (nombreUsuario) {
        mostrarSaludo(nombreUsuario);
    }
});
