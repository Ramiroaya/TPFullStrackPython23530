const URL = "https://ayacodoacodo.pythonanywhere.com";
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});


const app = Vue.createApp({
  data() {
    return {
      nombre: '',
      ciudad: '',
      email: '',
      contrasena: '',
      repetirContrasena: '',
      mostrarDatosProducto: false,
    };
  },
  methods: {
    obtenerUsuarioo() {
      fetch(URL + 'usuario/' + this.email)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            //Si la respuesta es un error, lanzamos una excepción para ser "catcheada" más adelante en el catch.

            throw new Error('Error al obtener los datos del Usuario.');

          }
        })
        .then(data => {
          this.nombre = data.nombre;
          this.ciudad = data.ciudad;
          this.email = data.email;
          this.contrasena = data.contrasena;
          this.mostrarDatosProducto = true;
        })
        .catch(error => {
          console.log(error);
          alert('Email no encontrado.');
        })
    },
    /*seleccionarImagen(event) {
      const file = event.target.files[0];
      this.imagenSeleccionada = file;
      this.imagenUrlTemp = URL.createObjectURL(file); // Crea una
      
      URL temporal para la vista previa
    },*/
    guardarCambios() {
      const formData = new FormData();
      formData.append('nombre', this.nombre);
      formData.append('ciudad', this.ciudad);
      formData.append('email', this.email);
      formData.append('contrasena', this.contrasena);
      formData.append('precio', this.precio);

      //Utilizamos fetch para realizar una solicitud PUT a la API y guardar los cambios.



      fetch(URL + 'usuario/' + this.email, {
        method: 'PUT',
        body: formData,
      })
        .then(response => {
          //Si la respuesta es exitosa, utilizamos response.json() para parsear la respuesta en formato JSON.
          if (response.ok) {
            return response.json()
          } else {
            //Si la respuesta es un error, lanzamos una excepción.

            throw new Error('Error al guardar los cambios del usuario.')
          }
        })
        .then(data => {
          alert('Usuario actualizado correctamente.');
          this.limpiarFormulario();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al actualizar el usuario.');
        });
    },
    limpiarFormulario() {
      this.nombre = '';
      this.ciudad = '';
      this.email = '';
      this.contrasena = '';
      this.mostrarDatosProducto = false;


    }
  }
});
app.mount('#app');

