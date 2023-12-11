const URL = "https://ayacodoacodo.pythonanywhere.com/";


const app = Vue.createApp({
    data() {
        return {
            usuarios: []
        }
    },
    methods: {
        obtenerUsuarios() {
            // Obtenemos el contenido del inventario
            fetch(URL + 'usuario')
                .then(response => {
                    // Parseamos la respuesta JSON
                    if (response.ok) { return response.json(); }
                })
                .then(data => {
                    // El código Vue itera este elemento para generar la

                    tabla

                    this.productos = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener los Usuarios.');
                });
        },
        eliminarUsuario(email) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario ? ')) {

fetch(URL + `usuario/${email}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            this.usuarios = this.usuarios.filter(usuario => usuario.email !== email);
                            alert('Usuario eliminado correctamente.');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
        }
    }
},
    mounted() {
    //Al cargar la página, obtenemos la lista de productos
    this.obtenerUsuarios();
    }
});
app.mount('body');

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});
