const URL = "https://ayacodoacodo.pythonanywhere.com/";


// Realizamos la solicitud GET al servidor para obtener todos los Usuarios
fetch(URL + 'usuario')
    .then(function (response) {
        if (response.ok) {
            return response.json();


        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al obtener los usuarios.');
        }
    })
    .then(function (data) {
        let tablaUsuarios = document.getElementById('tablaUsuarios');
        // Iteramos sobre los usuarios y agregamos filas a la tabla
        for (let usuario of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + usuario.idUsuario + '</td>' +
                '<td>' + usuario.nombre + '</td>' +
                '<td>' + usuario.ciudad + '</td>' +
                '<td align="right">' + usuario.email + '</td>'

            //Una vez que se crea la fila con el contenido del producto,se agrega a la tabla utilizando el método appendChild del elemento tablaProductos.

            tablaUsuarios.appendChild(fila);
        }
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    })

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });