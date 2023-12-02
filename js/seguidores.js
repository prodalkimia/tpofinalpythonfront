//Implementación de API usando fetch 

let seguidor = 'https://randomuser.me/api' //variable referencia al origen de los datos
fetch(seguidor) //solicitud a la url
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log(res.results[0].email)
            usuario.innerHTML = `
            <img src="${res.results[0].picture.large}">
            <p>${res.results[0].name.first} ${res.results[0].name.last}</p>
            <p>${res.results[0].location.country}</p>
            <p>${res.results[0].email}</p>
            ` //mostrando datos
        })
        .catch(error => console.log("Ocurrió un error", error)) // si hay un error será atrapado por catch