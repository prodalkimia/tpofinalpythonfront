// const URL = "http://127.0.0.1:5000/"
const URL = "https://peu.pythonanywhere.com/"

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('codigo', document.getElementById('codigo').value);
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('mail', document.getElementById('mail').value);
    formData.append('fecha_nac', document.getElementById('fecha_nac').value);
    formData.append('pais', document.getElementById('pais').value);
    formData.append('ciudad', document.getElementById('ciudad').value);
    formData.append('lista', document.getElementById('lista').value);
    formData.append('imagen', document.getElementById('imagenUsuario').files[0]);

    fetch(URL + 'usuarios', {
        method: 'POST',
        body: formData
    })

    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al agregar el usuario.');
        }
    })

    .then(function () {
        alert('Usuario agregado correctamente.');
    })
    .catch(function (error) {
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    }) .finally(function () {
        document.getElementById('codigo').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('mail').value = "";
        document.getElementById('fecha_nac').value = "";
        document.getElementById('pais').value = "";
        document.getElementById('ciudad').value = "";
        document.getElementById('lista').value = "";
        document.getElementById('imagen').value = "";
    });
})
