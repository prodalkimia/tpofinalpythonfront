let header = `
<div class="contenedor-header">
<img src="img/tecnosfera1.png" alt="Tecnósfera">
<nav>
    <ul>
        <li><a class="nav" href="index.html">Home</a></li>
<!--    <li><a class="nav" href="catalogo.html">Noticias</a></li>  -->
        <li><a class="nav" href="sobrenosotros.html">Nosotros</a></li>
        <li><a class="nav" href="forms.html">Contacto</a></li>
    </ul>
</nav>
<form class="buscar" action="https://www.google.com/search" method="GET" target="_blank">
    <label for="busqueda"></label>
    <input id="busqueda" name="busqueda" type="search" placeholder="Buscá tu artículo">
    <button id="buscar" name="buscar" aria-label="buscar contenido"><i class="fa-solid fa-magnifying-glass"></i></button>
</form>
</div>
`
document.getElementById("idheader").innerHTML = header
//La propiedad innerHTML() permite acceder y modificar el contenido HTML dentro de un elemento.
//Nota: si solo estás manipulando texto sin necesidad de interpretar HTML, es recomendable utilizar textContent en su lugar, ya que es más seguro y eficiente.

let footer = `
<div class="contenedor-redes">
            <ul>
                <li><a href="https://www.facebook.com/" target="_blank" class="facebook"><i class="fa-brands fa-facebook-f"></i></a></li>
                <li><a href="https://www.instagram.com" target="_blank" class="instagram"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://api.whatsapp.com/send?phone=5453325562&text=Hola,%20quisiera%20informacion%20sobre%20su%20producto" class="whatsapp" target="_blank"><i class="fa-brands fa-whatsapp"></i></a></li>
            </ul>
            <p>@Todos los derechos reservados 2023 - Tecnosfera</p> <!-- Sacar de la lista -->

            <script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
            <script src="https://mediafiles.botpress.cloud/5b12978f-523a-47f0-9f68-367ec51d2d8e/webchat/config.js" defer></script>
</div>
`
document.getElementById("idfooter").innerHTML = footer
