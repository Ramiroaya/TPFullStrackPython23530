const URL = "http://127.0.0.1:5000";

document.getElementById('form').addEventListener('submit', function (event) {
  Event.preventDefalt();

  var formData = new FormData();
  formData.append('usuario', document.getElementById('usuario').value);
  formData.append('correo', document.getElementById('correo').value);
  formData.append('ciudad', document.getElementById('ciudad').value);
  formData.append('contrasena', document.getElementById('contrasena').value);
  formData.append('confirmarContrasena', document.getElementById('confirmarContrasena').value);

  //Solicitud POST al servidor
  fetch(URL + '/usuario', {
    method: 'POST',
    body: formData
  })

  // Respuesta del servidor
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else { //error, lanza una excepción para ser "catcheada" luego
      throw new Error('Error en el registro. El usuario ya existe.');
    }
  })

  // Respuesta OK 
  .then(function (data) {
    alert('Usuario creado: ' + data.mensaje);
  })

    // En caso de error
    .catch(function (error) {
      alert(error.message);
      console.error('Error:', error);
    })

    // Limpiar el formulario en ambos casos
    .finally(function () {
      document.getElementById('usuario').value = "";
      document.getElementById('correo').value = "";
      document.getElementById('ciudad').value = "";
      document.getElementById('contrasena').value = "";
      document.getElementById('confirmarContrasena').value = "";
    });

    // agregamos al servidor
    formData.append('codigo', document.getElementById('codigo').value);
})

/*--------------*/

const registros = [];
export default registros;

// Función para validar que sea Email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para agregar un nuevo registro
function agregarRegistro(userName, ciudad, email, password) {
  registros.push({ userName, ciudad, email, password });
}

// Función para validar la contraseña (puedes expandirla según tus necesidades)
function isValidPassword(password) {
  // Agrega reglas de contraseña aquí (longitud mínima, mayúsculas, minúsculas, caracteres especiales, etc.)
  return password.length >= 6;
}

// Evento de clic en el botón de "Enviar"
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Obtén los valores de los campos de entrada
    const userName = document.getElementById("userName").value;
    const ciudad = document.getElementById("ciudad").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verifica que el campo Usuario sea obligatorio
    if (userName.trim() === "") {
      alert("El nombre de usuario es obligatorio.");
    } else if (!isValidEmail(email)) {
      alert("El correo electrónico debe tener un formato válido.");
    } else if (!isValidPassword(password)) {
      alert("La contraseña debe tener al menos 6 caracteres.");
    } else if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
    } else {
      // Agrega el registro al array
      agregarRegistro(userName, ciudad, email, password);
      // Almacena los registros en el Local Storage
      localStorage.setItem('registros', JSON.stringify(registros));
      console.log(registros);
      alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");

      // Restablece los valores del formulario
      document.getElementById("registration-form").reset();
      window.location.href = "sesion.html";
    }
  });
});
