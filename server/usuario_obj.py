class Usuario:
    usuario = []
    def nuevo_usuario(self, usuario, correo, ciudad, contrasena):
    
        nuevo_usuario = { # diccionario de datos de registro
        usuario: usuario,
        correo: correo,
        ciudad: ciudad,
        contrasena: contrasena
    }
    
    def modificar_contrasena(self, contrasena, nueva_contrasena):
        for contrasena in contrasena:
            if contrasena [contrasena] == contrasena:
                contrasena [contrasena] = nueva_contrasena
                return True
    print("Contraseña modificada")

    def modificar_correo(self, correo, nueva_correo):
        for correo in correo:
            if correo [correo] == correo:
                correo [correo] = nueva_correo
                return True
    print("Correo modificado")
    
    def modificar_ciudad(self, ciudad, nueva_ciudad):
        for ciudad in ciudad:
            if ciudad[ciudad] == ciudad:
                ciudad[ciudad] = nueva_ciudad
                return True
    print("Ciudad modificada")