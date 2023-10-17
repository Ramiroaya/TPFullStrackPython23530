//Funcion que chequea el usuario y contraseña ingresados en el array de registros.
function loginCheck(userName, password, registros) {
    return registros.find(record => record.userName === userName && record.password === password);
}

// Evento de clic en el botón de "Enviar"
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    // Recupera los registros almacenados en el Local Storage
    const storedRegistros = JSON.parse(localStorage.getItem('registros')) || [];

    // Verifica el inicio de sesión con los registros recuperados
    const userRecord = loginCheck(userName, password, storedRegistros);

    if (userRecord) {
        alert("Login exitoso. Sesión Iniciada");
        document.getElementById("login-form").reset();
        window.location.href = "index.html";
    } else {
        alert("Usuario o Contraseña incorrectos");
    }
});

