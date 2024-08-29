window.onload = async () => {
    agregarEventoSubmit();
}

function agregarEventoSubmit() {
    let form = document.querySelector("#frmCrear");
    form.onsubmit = async (e) => {
        e.preventDefault();
        let url = window.location.origin+ "/crudusuarios-MateoUYs/Repositorios/BackEnd/controller/gestionUsuarioController.php?funcion=agregar";
        let formdata = new FormData(form);
        let config = {
            method: "POST",
            body: formdata
        }
        let respuesta = await fetch(url, config);
        let datos = await respuesta.json();
        console.log(datos);
        if (datos) {
            alert("Usuario Creado con éxito");
        } else {
            document.getElementById("alert").textContent = "Ya existe un usuario con la cédula ingresada";
        }
    }
}
