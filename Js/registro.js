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
  formData.append('contrasena', document.getElementById('password').value);
  formData.append('confirmarContrasena', document.getElementById('confirmPassword').value);
  console.log(nombre);

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
    document.getElementById('userName').value = "";
    document.getElementById('ciudad').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('confirmPassword').value = "";
  })
});

