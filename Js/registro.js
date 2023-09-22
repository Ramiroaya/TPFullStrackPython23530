
// Array para almacenar los registros
export const registros = [];

// Función para agregar un nuevo registro
function agregarRegistro(userName, email, password) {
    registros.push({ userName, email, password });
}

// Evento de clic en el botón de "Enviar"
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Obtén los valores de los campos de entrada
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verifica si las contraseñas coinciden
    if (password === confirmPassword) {
        // Agrega el registro al array
        agregarRegistro(userName, email, password);
        console.log(registros);
        alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
        // Restablece los valores del formulario
        document.getElementById("registration-form").reset();
    } else {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
    }
});


