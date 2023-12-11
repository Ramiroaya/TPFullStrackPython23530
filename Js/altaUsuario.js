const URL = "https://ayacodoacodo.pythonanywhere.com/";

document.getElementById('formulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    var contrasena = document.getElementById('contrasena').value;
    var confirmarContrasena = document.getElementById('confirmarContrasena').value;

    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    var formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('ciudad', document.getElementById('ciudad').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('contrasena', contrasena);
    formData.append('confirmarContrasena', confirmarContrasena);

    try {
        const response = await fetch(URL + 'usuario', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error al agregar el usuario: ${response.statusText}`);
        }

        alert('Usuario agregado correctamente.');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error);
    } finally {
        // Limpiar el formulario en ambos casos (éxito o error)
        document.getElementById('nombre').value = "";
        document.getElementById('ciudad').value = "";
        document.getElementById('email').value = "";
        document.getElementById('contrasena').value = "";
        document.getElementById('confirmarContrasena').value = "";
    }
});
