from flask import Flask, render_template, request, redirect, flash, jsonify, session
import requests
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv(dotenv_path='/home/crisstian/mysite/.env')

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')  # Obtiene la clave secreta desde .env
FIREBASE_URL = os.getenv('FIREBASE_URL')  # URL de Firebase

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cursos')
def cursos():
    return render_template('cursos.html')

@app.route('/detalle_curso/<id>')
def detalle_curso(id):
    return render_template('detalle_curso.html', id=id)

@app.route('/quienes_somos')
def quienes_somos():
    return render_template('quienes_somos.html')

@app.route('/gracias')
def gracias():
    return render_template('gracias.html')

# AGREGADOS PARA REGISTRAR USUARIO
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email').strip()
        nombre = data.get('nombre')
        password = data.get('password')

        # Verificar si el correo ya existe
        response = requests.get(f'{FIREBASE_URL}/users.json')
        users = response.json() or {}

        for user in users.values():
            if user.get('email', '').lower() == email.lower():
                return jsonify({'message': 'El correo ya está registrado. Por favor, utiliza otro.', 'type': 'danger'}), 400

        # Registrar nuevo usuario
        hashed_password = generate_password_hash(password)
        new_user = {
            "email": email,
            "nombre": nombre,
            "password": hashed_password
        }
        requests.post(f'{FIREBASE_URL}/users.json', json=new_user)
        return jsonify({'message': '¡Registro exitoso! Ahora puedes iniciar sesión.', 'type': 'success'}), 200

    return render_template('register.html')


# PARA LOGIN
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Aquí manejas la autenticación del usuario
        data = request.get_json()  # Obtener los datos JSON
        email = data.get('email')
        password = data.get('password')

        # Verificar las credenciales con Firebase
        response = requests.get(f'{FIREBASE_URL}/users.json')
        users = response.json() or {}
        for user_id, user_data in users.items():
            if user_data['email'] == email and check_password_hash(user_data['password'], password):
                session['user_id'] = user_id
                session['user_name'] = user_data['nombre']
                return {'message': 'Inicio de sesión exitoso', 'type': 'success'}, 200

        return {'message': 'Correo o contraseña incorrectos', 'type': 'danger'}, 400

    # Si es un GET, devuelve la página del login
    return render_template('login.html')


# PARA ADQUIRIR CURSO
@app.route('/adquirir_curso/<curso_id>', methods=['POST'])
def adquirir_curso(curso_id):
    user_id = session.get('user_id')
    if not user_id:
        flash('Debes iniciar sesión para adquirir un curso.', 'warning')
        return redirect('/login')

    # Guardar el curso adquirido en Firebase
    response = requests.get(f'{FIREBASE_URL}/user_courses/{user_id}.json')
    user_courses = response.json() or {"courses": {}}
    user_courses["courses"][curso_id] = True
    requests.put(f'{FIREBASE_URL}/user_courses/{user_id}.json', json=user_courses)
    return '', 200


# MOSTRAR CURSOS EN MI CUENTA
@app.route('/mi_cuenta')
def mi_cuenta():
    user_id = session.get('user_id')
    if not user_id:
        flash('Debes iniciar sesión para ver tu cuenta.', 'warning')
        return redirect('/login')

    # Obtener los detalles del usuario
    user_response = requests.get(f'{FIREBASE_URL}/users/{user_id}.json')
    user_data = user_response.json() or {}

    # Obtener los cursos adquiridos por el usuario
    user_courses_response = requests.get(f'{FIREBASE_URL}/user_courses/{user_id}/courses.json')
    user_courses = user_courses_response.json() or {}

    # Obtener detalles de los cursos adquiridos
    courses_response = requests.get(f'{FIREBASE_URL}/cursos.json')
    all_courses = courses_response.json() or {}

    # Filtrar los cursos adquiridos por el usuario
    acquired_courses = [
        {
            "nombrecurso": all_courses[curso_id]["nombrecurso"],
            "descripcion": all_courses[curso_id]["descripcion"]
        }
        for curso_id in user_courses if curso_id in all_courses
    ]

    # Renderizar la plantilla con los datos reales
    return render_template(
        'mi_cuenta.html',
        user_name=user_data.get('nombre', 'Usuario'),
        courses=acquired_courses
    )


    #PARA CERRAR SESION
@app.route('/logout')
def logout():
    # Eliminar la información de la sesión (cerrar sesión)
    session.pop('user_id', None)
    session.pop('user_name', None)

    flash('Has cerrado sesión correctamente.', 'success')
    return redirect('/')

    # Verificar si el usuario está logueado
@app.route('/verificar_login', methods=['GET'])
def verificar_login():
    user_id = session.get('user_id')
    if user_id:
        return {'logged_in': True}
    else:
        return {'logged_in': False}

@app.route('/get_config', methods=['GET'])
def get_config():
    # Obtener la configuración desde Firebase
    response = requests.get(f'{FIREBASE_URL}/styles.json')
    config = response.json() or {}
    print(config);
    navbar_color = config.get('navbar_color', '#0066cc')  # Valor por defecto si no está configurado
    footer_color = config.get('footer_color', '#003366')  # Valor por defecto si no está configurado
    #Index
    aprende_color = config.get('aprende_color', '#0066cc')  # Valor por defecto si no está configurado
    beneficio_color = config.get('beneficio_color', '#0066cc')  # Valor por defecto si no está configurado
    # Quienes somos:
    titulo_color = config.get('titulo_color', '#0066cc')  # Valor por defecto si no está configurado
    subtitulo_color = config.get('subtitulo_color', '#0066cc')  # Valor por defecto si no está configurado
        # Cursos:
    titulocurso_color = config.get('titulocurso_color', '#0066cc')  # Valor por defecto si no está configurado
    botoncurso_color = config.get('botoncurso_color', '#0066cc')  # Valor por defecto si no está configurado
    #login
    titulologin_color = config.get('titulologin_color', '#0066cc')  # Valor por defecto si no está configurado
    #registro
    tituloregistro_color = config.get('tituloregistro_color', '#0066cc')  # Valor por defecto si no está configurado
    #Detalle Curso
    titulodetalle_color = config.get('titulodetalle_color', '#0066cc')  # Valor por defecto si no está configurado
    #EDITAR PERFIL
    tituloeditar_color = config.get('tituloeditar_color', '#0066cc')  # Valor por defecto si no está configurado

    return jsonify({
        'navbar_color': navbar_color,
        'footer_color': footer_color,
        'aprende_color': aprende_color,
        'beneficio_color': beneficio_color,
        'titulo_color': titulo_color,
        'subtitulo_color': subtitulo_color,
        'titulocurso_color': titulocurso_color,
        'botoncurso_color': botoncurso_color,
        'titulologin_color': titulologin_color,
        'tituloregistro_color': tituloregistro_color,
        'titulodetalle_color': titulodetalle_color,
        'tituloeditar_color': tituloeditar_color
      })

      # PARA CAMBIAR CONTRASEÑA

@app.route('/editar_perfil', methods=['GET', 'POST'])
def editar_perfil():
    user_id = session.get('user_id')
    if not user_id:
        flash('Debes iniciar sesión para modificar tu cuenta.', 'warning')
        return redirect('/login')

    # Obtener los detalles del usuario
    user_response = requests.get(f'{FIREBASE_URL}/users/{user_id}.json')
    user_data = user_response.json() or {}

    if request.method == 'POST':
        data = request.get_json()
        contrasena_actual = data.get('contrasena_actual')
        nueva_contrasena = data.get('nueva_contrasena')

        # Verificar la contraseña actual
        if not check_password_hash(user_data['password'], contrasena_actual):
            return jsonify({'message': 'La contraseña actual es incorrecta.', 'type': 'danger'}), 400

        # Actualizar la contraseña
        if nueva_contrasena:
            hashed_password = generate_password_hash(nueva_contrasena)
            user_data['password'] = hashed_password
            requests.put(f'{FIREBASE_URL}/users/{user_id}.json', json=user_data)
            return jsonify({'message': 'Contraseña actualizada exitosamente.', 'type': 'success'}), 200

        return jsonify({'message': 'No se realizaron cambios.', 'type': 'info'}), 400

    # Renderizar la página de edición
    return render_template(
        'editar_perfil.html',
        user_name=user_data.get('nombre'),
        email=user_data.get('email')
    )


if __name__ == '__main__':
    app.run(debug=True)
