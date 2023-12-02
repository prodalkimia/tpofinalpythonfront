//Función para validar el formulario
//Al cumplirse las validaciones se envía el formulario

function validarformulario() {
    //Validación de nombre
    if (document.formulario.nombre.value.length == 0)  {
        alert("Debe escribir su nombre")
        document.formulario.nombre.focus()
        return 0
    }
    //Validación de apellido
    if (document.formulario.apellido.value.length == 0)  {
        alert("Debe escribir su apellido")
        document.formulario.apellido.focus()
        return 0
    }
    //Validación de email
    if (!document.formulario.email.value.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/))  {
        alert("Introduzca un email válido")
        document.formulario.email.focus()
        return 0
    }
    //Validación de lista despegable
    if (document.formulario.lista.value == 0) {
        alert("Debe seleccionar un campo tecnológico favorito")
        document.formulario.lista.focus()
        return 0
    }
    //Envío de formulario
    alert("Email enviado - muchas gracias")
    document.formulario.submit()

}

 

