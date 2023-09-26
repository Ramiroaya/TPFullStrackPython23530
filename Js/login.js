import  registros from 'registro.js';


//Funcion que chequea el usuario y contraseña ingresados en el array de registros.

function loginCheck(userName, password, registros) {
    for(let i=0; i<registros.length; i++) {
        if (registros[i].username == userName && registros[i].password == password) {
            return true;
        } else {
            return false;
        }
    }
}

// Evento de clic en el botón de "Enviar"
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); 

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (loginCheck(userName, password, registros)) {
        alert("Login exitoso. Sesion Iniciada");
        document.getElementById("login-form").reset();
    } else {
        alert ("Usuario o Contraseña incorrectos");
    }

});     

