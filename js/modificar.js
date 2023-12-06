// const URL = "http://127.0.0.1:5000/"
const URL = "https://peu.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            apellido: '',
            mail: '',
            fecha_nac: '',
            pais: '',
            ciudad: '',
            tecnologia: '',
            imagen_url: '',
            imagenUrlTemp: null,
            mostrarDatosUsuario: false,
        };
    },

    methods: {
        obtenerUsuario() {
            fetch(URL + 'usuarios/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los datos del usuario.')
                    }
                })

                .then(data => {
                    this.nombre = data.nombre;
                    this.apellido = data.apellido;
                    this.mail = data.mail;
                    this.fecha_nac = data.fecha_nac;
                    this.pais = data.pais;
                    this.ciudad = data.ciudad;
                    this.tecnologia = data.tecnologia;
                    this.imagen_url = data.imagen_url;
                    this.mostrarDatosUsuario = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código de usuario no encontrado.');
                })
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file);
        },

        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombre', this.nombre);
            formData.append('apellido', this.apellido);
            formData.append('mail', this.mail);
            formData.append('fecha_nac', this.fecha_nac);
            formData.append('pais', this.pais);
            formData.append('ciudad', this.ciudad);
            formData.append('tecnologia', this.tecnologia);

            if (this.imagenSeleccionada) {
                formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }

            fetch(URL + 'usuarios/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al guardar los cambios del usuario.')
                    }
                })
                .then(data => {
                    alert('Usuario actualizado correctamente.');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar al usuario.');
                });
        },

        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.apellido = '';
            this.mail = '';
            this.fecha_nac = '';
            this.pais = '';
            this.ciudad = '';
            this.tecnologia = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
            this.mostrarDatosUsuario = false;
        }
    }
});

app.mount('#app');
