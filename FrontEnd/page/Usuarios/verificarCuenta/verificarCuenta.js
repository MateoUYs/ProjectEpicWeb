import UserDAO from "../../../dao/userDao.js";
import SessionDAO from "../../../dao/sesionDAO.js";

window.onload = async() => {
    mostrarMensaje();
}

async function mostrarMensaje() {
    let query = await new SessionDAO().getSession();
    let pMensaje = document.querySelector("#descripcion");
    console.log(query.datos);
    pMensaje.innerHTML = `Te hemos enviado un correo con un código de verificación a ${query.datos.email} Por favor, revisa tu bandeja de entrada e ingresa el código en el campo de abajo para continuar.`;
}
