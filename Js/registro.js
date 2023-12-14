const URL = "https://ayacodoacodo.pythonanywhere.com/";

document.getElementById('registration-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  var contrasena = document.getElementById('contrasena').value;
  var confirmarContrasena = document.getElementById('confirmarContrasena').value;

  if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
  }

  const formData = new FormData();
  formData.append('nombre', document.getElementById('userName').value);
  formData.append('ciudad', document.getElementById('ciudad').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('contrasena', contrasena);
  formData.append('confirmarContrasena', confirmarContrasena);


   // Realizamos la solicitud POST al servidor
   fetch(URL + 'usuario', {
    method: 'POST',
    body: formData // Aquí enviamos formData en lugar de JSON
})
    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al agregar el Usuario.');
        }
    })


    // Respuesta OK
    .then(function () {
        // En caso de éxito
        alert('Usuario agregado correctamente.');
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    })
   .finally(function () {
    // Restablece los valores del formulario
    document.getElementById('nombre').value = "";
    document.getElementById('ciudad').value = "";
    document.getElementById('email').value = "";
    document.getElementById('contrasena').value = "";
    document.getElementById('confirmarContrasena').value = "";
  })
});


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
    const nombre = document.getElementById("userName").value;
    const ciudad = document.getElementById("ciudad").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;
    const confirmarContrasena = document.getElementById("confirmPassword").value;

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
      agregarRegistro(nombre, ciudad, email, contrasena);
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

