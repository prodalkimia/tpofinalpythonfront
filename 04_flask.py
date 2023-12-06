from flask import Flask, request, jsonify
from flask import request
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)

CORS(app)

class UserId:
    """
    Clase que gestiona una base de datos con usuarios.
    - Contiene los métodos
        - agregar_usuario: Agrega un nuevo usuario, cuando el código del usario no existe en la base de datos.
        - consultar_ususario: Recibe como parámetro el codigo de usuario, para consultar si existe en una
        base de datos.
        - listar_usuarios: Muestra los usarios que se encuentran registrados. No recibe argumentos.
        - modificar_usuario: Modifica un usuario, recibiendo como parámetro principal el código de usuario.
        - eliminar_usuario: Elimina un usuario, usando como parámetro el código de usuario.
        - mostrar_usuario: Muestra los datos de un solo usario, usando como párametro el código de usuario.
    """

    def __init__(self, host, user, password, database):
        """
        Iicializa una instancia de Catalogo y crea una conexión a la base de datos.
        Crea una conexión a la base de datos MySQL y se configura un cursor para que devuelva resultados en forma de diccionarios.
        Verifica si la tabla Usuarios existe en la BBDD, sino la crea
        """
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
        )
        self.cursor = self.conn.cursor()

        try: 
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS usuarios (
                            codigo INT (3),
                            nombre VARCHAR(45) NOT NULL,
                            apellido VARCHAR(45) NOT NULL,
                            mail VARCHAR(255) NOT NULL,
                            fecha_nac VARCHAR(10) NOT NULL,
                            pais VARCHAR(50) NOT NULL,
                            ciudad VARCHAR(50) NOT NULL,
                            tecnologia VARCHAR(31) NOT NULL,
                            imagen_url VARCHAR(255))"""
        )

        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def listar_usuarios(self) -> dict:
        """
        Muestra los usarios que se encuentran registrados. No recibe argumentos. Devuelve una lista de diccionario.
        """ 
        self.cursor.execute("SELECT * FROM usuarios") 
        usuarios = self.cursor.fetchall() 
        return usuarios  

    def consultar_usuario(self, codigo: int) -> dict | bool:
        """
        Recibe como parámetro el codigo de usuario, para consultar si existe en una
        base de datos.
        """
        self.cursor.execute(f"SELECT * FROM usuarios WHERE codigo = {codigo}")
        return self.cursor.fetchone()
    
    def mostrar_usuario(self, codigo: int) -> None:
        """
        Muestra los datos de un solo usario por consola, usando como párametro el código de usuario.
        """
        usuario = self.consultar_usuario(codigo)
        if usuario:
            str_usuario = f"""
            Código de usuario.......: {usuario['codigo']:03}
            Nombre..................: {usuario['nombre']}
            Apellido................: {usuario['apellido']}
            Fecha de nacimiento.....: {usuario['fecha_nac']}
            Mail....................: {usuario['mail']}
            País de nacimiento......: {usuario['pais']}
            Ciudad de residencia....: {usuario['ciudad']}
            Tecnología de interés...: {usuario['tecnologia']}
            Imágen del usuario......: {usuario['imagen_url']}
            """
            print(str_usuario)
            print("-" * 40)
        else:
            print("Usuario no encontrado")

    def agregar_usuario(
        self,
        codigo: int,
        nombre: str,
        apellido: str,
        mail: str,
        fecha_nac: str,
        pais: str,
        ciudad: str,
        tecnologia: str,
        imagen: str,
    ) -> bool:
        """
        Agrega un nuevo usuario, verificando si el usuario existe en la BBDD por medio del código.
        """
        self.cursor.execute(f"SELECT * FROM usuarios WHERE codigo = {codigo}")

        usuario_existe = self.cursor.fetchone()
        if usuario_existe:
            return False

        sql = "INSERT INTO usuarios (codigo, nombre, apellido, mail, fecha_nac, pais, ciudad, tecnologia, imagen_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        valores = (codigo, nombre, apellido, mail, fecha_nac, pais, ciudad, tecnologia, imagen) 

        self.cursor.execute(sql, valores)
        self.conn.commit()

        return True
    
    def modificar_usuario(
        self,
        codigo: int,
        nuevo_nombre: str,
        nuevo_apellido: str,
        nuevo_mail: str,
        nueva_fecha_nac: str,
        nuevo_pais: str,
        nueva_ciudad: str,
        nueva_tecnologia: str,
        nueva_imagen: str,
    ) -> bool:
        """
        Modifica un usuario, recibiendo como parámetro el código de usuario.
        """
        sql = f"UPDATE usuarios SET nombre = %s, apellido =%s, mail = %s, fecha_nac = %s, pais = %s, ciudad = %s, tecnologia = %s, imagen_url = %s WHERE codigo = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_mail, nueva_fecha_nac, nuevo_pais, nueva_ciudad, nueva_tecnologia, nueva_imagen, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def eliminar_usuario(self, codigo: int) -> bool:
        """
        Elimina un usuario de la Tabla de la BBDD, usando como argumento el código de usuario.
        """
        self.cursor.execute(f"DELETE FROM usuarios WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

# ---------------------Main---------------------
# cliente = UserId(host="localhost", user="root", password="", database="miapp")
cliente = UserId(host="PEU.mysql.pythonanywhere-services.com", user="PEU", password="TPOCodo@23", database="PEU$miapp")

# camino = 'static/img/'
camino = '/home/PEU/mysite/static/img/'

@app.route("/usuarios", methods = ['GET'])
def listar_usuarios():
    usuarios = cliente.listar_usuarios()
    return jsonify(usuarios)

@app.route("/usuarios/<int:codigo>", methods=["GET"]) 
def mostrar_usuarios(codigo): 
    usuarios = cliente.consultar_usuario(codigo) 
    if usuarios: 
        return jsonify(usuarios) 
    else: 
        return "Usuario no encontrado", 404
    
@app.route("/usuarios", methods = ['POST'])
def agregar_usuario():
    codigo = request.form['codigo']
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    mail = request.form['mail']
    fecha_nac = request.form['fecha_nac']
    pais = request.form['pais']
    ciudad = request.form['ciudad']
    tecnologia = request.form['lista']
    imagen = request.files['imagen'] 
    nombre_imagen = secure_filename(imagen.filename)

    nombre_base, extension = os.path.splitext(nombre_imagen) 
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(camino, nombre_imagen))

    if cliente.agregar_usuario(codigo, nombre, apellido, mail, fecha_nac, pais, ciudad, tecnologia, nombre_imagen):
        return jsonify({"mensaje": "Usuario agregado"}),201
    else:
        return jsonify({"mensaje": "Usuario ya existe"}), 400

@app.route("/usuarios/<int:codigo>", methods=["PUT"])
def modificar_usuarios(codigo): 
    
    nuevo_nombre = request.form.get("nombre")
    nuevo_apellido = request.form.get("apellido")
    nuevo_mail = request.form.get("mail")
    nueva_fecha_nac = request.form.get("fecha_nac")
    nuevo_pais = request.form.get("pais")
    nueva_ciudad = request.form.get("ciudad")
    nueva_tecnologia = request.form.get("tecnologia") 
    
    imagen = request.files['imagen'] 
    nombre_imagen = secure_filename(imagen.filename) 
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(camino, nombre_imagen)) 
    
    if cliente.modificar_usuario(codigo, nuevo_nombre, nuevo_apellido, nuevo_mail, nueva_fecha_nac, nuevo_pais, nueva_ciudad, nueva_tecnologia, nombre_imagen):
        return jsonify({"mensaje": "Usuario modificado"}), 200 
    else: 
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

@app.route("/usuarios/<int:codigo>", methods=["DELETE"]) 
def eliminar_usuarios(codigo): 
 
    usuario = cliente.consultar_usuario(codigo) 
    if usuario: 

        ruta_imagen = os.path.join(camino, usuario['imagen_url'])
        if os.path.exists(ruta_imagen): 
            os.remove(ruta_imagen) 
        
        if cliente.eliminar_usuario(codigo): 
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el usuario"}), 500 
    else: return jsonify({"mensaje": "Usuario no encontrado"}), 404

if __name__ == "__main__": 
    app.run(debug=True)
