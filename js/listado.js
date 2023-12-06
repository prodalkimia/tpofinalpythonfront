// const URL = "http://127.0.0.1:5000/"
const URL = "https://peu.pythonanywhere.com/"

fetch(URL + 'usuarios')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener los usuarios.');
        }
    })

    .then(function (data) {
        let tablaUsuarios = document.getElementById('tablaUsuarios');

        for (let usuario of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + usuario.codigo + '</td>' + '<td>' + usuario.nombre + '</td>' + '<td>' + usuario.apellido + '</td>' + '<td>' + usuario.mail + '</td>' + '<td>' + usuario.fecha_nac + '</td>' + '<td>' + usuario.pais + '</td>' + '<td>' + usuario.ciudad + '</td>' + '<td>' + usuario.tecnologia + '</td>' +
            '<td><img src=https://www.pythonanywhere.com/user/PEU/files/home/PEU/mysite/static/img/' + usuario.imagen_url + ' alt="Imagen del usuario" style="width: 100px;"></td>'; 
            
            tablaUsuarios.appendChild(fila);
        }
    })
    .catch(function (error) {
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    })