♦app.route("/usuario", methods=["POST"])

def nuevo_usuario():
    # levanta los datos del formulario
        usuario: request.form['usuario']
        correo: request.form['correo']
        ciudad: request.form['ciudad']
        contrasena: request.form['contrasena']
        confirme: request.form['confirme']


def nuevo_usuario(self, usuario, correo, ciudad, contrasena, confirme):
imagen, proveedor):
# Verificamos si ya existe 
self.cursor.execute(f"SELECT * FROM usuario WHERE mail =
{mail}")
mail_existe = self.cursor.fetchone()
if mail_existe:
    return False

