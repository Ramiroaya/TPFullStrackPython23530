from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import mysql.connector

import os
import time

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
class Conector:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

    self.cursor = self.conn.cursor(dictionary=True)

    try:
        self.cursor.execute(f"USE {database}")
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
            self.cursor.execute(f"CREATE DATABASE {database}")
            self.conn.database = database
        else:
            raise err


    self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuario (
        idUsusario INT PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(255) NOT NULL,
        ciudad  varchar(255),
        email VARCHAR(255) NOT NULL,
        contrasena VARCHAR(255) NOT NULL)''')
    self.conn.commit()

    self.cursor.close()
    self.cursor = self.conn.cursor(dictionary=True)


    #Metodo para consultar un Usuario por su Id.
    def consultar_usuario(self, email):
        self.cursor.execute(f"SELECT * FROM usuario WHERE email = {email}")
        return self.cursor.fetchone()


    # Metodo para mostrar un Usuario
    def mostrar_usuarios(self, email):
        # Mostramos los datos de un Usuario a partir de su Email
        usuario = self.consultar_usuario(email)
        if usuario:
            print("-" * 40)
            print(f"Nombre del Usuario: {usuario['nombre']}")
            print(f"Ciudad del Usuario: {usuario['ciudad']}")
            print(f"Email del Usuario: {usuario['email']}")
            print(f"Contraseña del Usuario: {usuario['contrasena']}")
            print("-" * 40)
        else:
            print("Usuario no encontrado.")


    
    

    #Metodo para listar Usuarios
    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM usuario")
        usuarios = self.cursor.fetchall()
        return usuarios


    #Metodo para agregar un Usuario.
    def agregar_usuario(self, nombre, ciudad, mail, contrasena):
        self.cursor.execute("SELECT * FROM usuario WHERE email = {email}")
        usuario_existe = self.cursor.fetchone()
        if usuario_existe:
            return False
        sql = "INSERT INTO usuario (nombre, ciudad, email, contrasena) VALUES (%s, %s, %s, %s)"
        valores = (nombre, ciudad, mail, contrasena)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
    


    #Metodo para modificar un Usuario.
    def modificar_usuario(self, codigo, nuevo_nombre, nueva_ciudad, nuevo_email, nueva_contrasena):
        sql = "UPDATE usuario SET nombre= %s, ciudad= %s, email= %s, contrasena= %s" 
        valores = (nuevo_nombre, nueva_ciudad, nuevo_email, nueva_contrasena)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0



    # Metodo para eliminar un Usuario
    def eliminar_usuario(self, codigo):
        self.conn.execute(f"DELETE FROM usuario WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0










#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Creamos una instancia de Conector
conexion = Conector(
        host="localhost",
        user="root",
        password="root",
        database="cryptoMercado"
    )  


# Metodo para listar Usuarios
@app.route('/usuario', metthods=["GET"])
def listar_usuarios():
    usuario = Conector.listar_usuarios()
    return jsonify(usuario)


# Metodo para buscar un Usuario por su Id
@app.route('/usuario/<int:idUsuario>', methods=['GET'])
def mostrar_usuario(email):
    usuario = Conector.consultar_usuario(email)
    if usuario:
        return jsonify(usuario)
    else:
        return "Usuario no encontrado", 404



# Metodo para crear un nuevo Usuario
@app.route("/usuario", methods=["POST"])
def nuevo_usuario():
    # Levanta los datos del formulario
    usuario = request.form.get('usuario')
    ciudad = request.form.get('ciudad')
    email = request.form.get('email')
    contrasena = request.form.get('contrasena')
    confirmarContrasena = request.form.get('confirmarContrasena')

    if Conector.agregar_usuario(usuario, ciudad, email, contrasena):
        return jsonify({"mensaje": "Usuario agregado"}), 201
    else:
        return jsonify({"mensaje": "Usuario ya existente"}), 400

    


# Endpoint para el inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.form

    email = data['email']
    contrasena = data['contrasena']

    # Verificar las credenciales en la base de datos
    cursor.execute("SELECT * FROM usuario WHERE email = %s AND contrasena = %s", (email, contrasena))
    usuario = cursor.fetchone()

    if usuario:
        return jsonify({'mensaje': 'Inicio de sesión exitoso'})
    else:
        return jsonify({'mensaje': 'Credenciales incorrectas'}), 401



# Endpoint para modificar un Usuario
@app.route('/usuario/<int:idUsuario', methods=['PUT'])
def modificar_usuario(idUsuario):
    # Recojo los datos del Formulario
    nuevo_nombre = request.form.get("nombre")
    nueva_ciudad = request.form.get("ciudad")
    nuevo_email = request.form.get("email")
    nueva_contrasena = request.form.get("contrasena")

    # Actualizando Usuario
    if Conector.modificar_usuario(idUsuario, nuevo_nombre, nueva_ciudad, nuevo_email, nueva_contrasena):
        return jsonify({"mensaje": "Se ha actualizado correctamente el usuario."}), 200
    else:
        return jsonify({"mensaje": "No se pudo actualizar el usuario"}), 404


# Endpoint para eliminar un Usuario
@app.route("/usuario/<int:idUsuario>", methods=["DELETE"])
def eliminar_usuario(idUsuario):
    if idUsuario:
        if Conector.eliminar_usuario(idUsuario):
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el usuario"}), 500
    else:
        return jsonify({"mensaje": "El usuario no existe"}), 404


if __name__ == '__main__':
    app.run(debug=True)