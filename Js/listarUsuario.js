const URL = "http://127.0.0.1:5000";

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
            let tablaUsuarioss = document.getElementById('tablaUsuarioss');
            // Iteramos sobre los productos y agregamos filas a la tabla
            for (let usuario of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + usuario.codigo + '</td>' +
            '<td>' + usuario.nombre + '</td>' +
            '<td>' + usuario.ciudad + '</td>' +
            '<td>' + usuario.email + '</td>' +
            '<td>' + usuario.contrasena + '</td>'
            /*Una vez que se crea la fila con el contenido del Usuario,
            se agrega a la tabla utilizando el método appendChild del elemento
            tablaProductos.*/
            
            tablaUsuarios.appendChild(fila);
            }
            })
            .catch(function (error) {
            // En caso de error
            alert('Error al agregar el Usuario.');
            console.error('Error:', error);
    })

