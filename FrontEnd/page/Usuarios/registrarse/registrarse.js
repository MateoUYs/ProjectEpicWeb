import userDAO from "../../../dao/userDao.js";

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

        registrarUser(ci, correo, usuario, password, telefono);

    };
}

async function registrarUser(ci, correo, usuario, password, telefono) {
    let userDAO = new userDAO();
    let respuesta = await userDAO.registrarUser(ci, correo, usuario, password, telefono);

    if (respuesta.estado) {
        alert("Usuario registrado con exito.");
    } else {
        alert(`Error al registrar: ${respuesta.mensaje}`);
    }
}
