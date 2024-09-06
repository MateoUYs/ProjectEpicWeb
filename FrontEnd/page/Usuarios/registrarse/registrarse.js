import UserDAO from "../../../dao/userDao.js";

window.onload = () => {
    agregarEventos();
    
}

function agregarEventos() {
    let formElement = document.querySelector("#frmCrear"); 
    
    formElement.onsubmit = async (e) => {
        e.preventDefault(); 

        let ci = formElement.ci.value;
        let correo = formElement.correo.value;
        let usuario = formElement.usuario.value;
        let password = formElement.password.value;
        let telefono = formElement.telefono.value;

        registrarUsuario(ci, correo, usuario, password, telefono);

    };
}

async function registrarUsuario(ci, correo, usuario, password, telefono) {
    let respuesta = await new UserDAO().registrarUsuario(ci, correo, usuario, password, telefono);

    if (respuesta.estado) {
        alert("Usuario registrado con exito.");
    } else {
        alert(`Error al registrar: ${respuesta.mensaje}`);
    }
}
