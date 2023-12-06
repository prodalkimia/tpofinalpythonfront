// const URL = "http://127.0.0.1:5000/"
const URL = "https://peu.pythonanywhere.com/"
const app = Vue.createApp({
    data() {
        return {
            usuarios: []
        }
    },
    methods: {
        obtenerUsuarios() {
            fetch(URL + 'usuarios')
                .then(response => {
                    if (response.ok) { return response.json(); }
                })
                .then(data => {
                    this.usuarios = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener los usuarios.');
                });
        },
        eliminarUsuario(codigo) {
            if (confirm('¡Estás por eliminar este usuario!')) {
                fetch(URL + `usuarios/${codigo}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            this.usuarios = this.usuarios.filter(usuario => usuario.codigo !== codigo);
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
        this.obtenerUsuarios();
    }
});
app.mount('body');