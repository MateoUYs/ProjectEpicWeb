window.onload = async () => {
    agregarEventoSubmit();
}

function agregarEventoSubmit() {
    let form = document.querySelector("#frmCrear");
    form.onsubmit = async (e) => {
        e.preventDefault();
        let url = window.location.origin+ "/projectepicweb/BackEnd/controller/UserController.php?function=agregarUsuario";
        let formdata = new FormData(form);
        let config = {
            method: "POST",
            body: formdata
        }
        let respuesta = await fetch(url, config);
        let datos = await respuesta.json();
        console.log(datos);
        if (datos) {
            alert("Usuario logeado con exito");
        } else {
            document.getElementById("alert").textContent = "La contraseña o el mail es erroneo";
        }
    }
}
