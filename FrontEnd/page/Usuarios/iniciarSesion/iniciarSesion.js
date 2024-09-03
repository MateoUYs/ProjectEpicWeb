window.onload = () => {
    obtenerUsuarios();
}

async function obtenerUsuarios() {
    //let usuarios = [{ci:56571716, nombre:"Mateo", apellido:"Indart"},{ci:52551716, nombre:"Juanjo", apellido:"Jorginho"},{ci:56576416, nombre:"Micho", apellido:"Ton"}];
    let url = window.location.origin+"/crudusuarios-MateoUYs/Repositorios/BackEnd/controller/gestionUsuarioController.php?funcion=obtener";
    let datos = await fetch(url);
    let usuarios = await datos.json();
    console.log(datos);
    mostrarUsuarios(usuarios);
}

function mostrarUsuarios(usuarios) {
    let tbodyElementes = document.querySelector("#datosUser")
    for (let i=0; i < usuarios.length; i++){
        tbodyElementes.innerHTML += `<tr>
        <td>${usuarios[i].ci}</td>
        <td>${usuarios[i].nombre}</td>
        <td>${usuarios[i].apellido}</td></tr>`;
    }
}