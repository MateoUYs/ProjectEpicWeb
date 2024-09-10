import UserDAO from "../../../dao/userDao.js";
import SessionDAO from "../../../dao/sessionDAO.js";

window.onload = () => {
    addEvents(); 
}

function addEvents() {
    let formElement = document.querySelector("#frmCrear"); 
    
    formElement.onsubmit = async (e) => {
        e.preventDefault(); 

        let ci = formElement.ci.value;
        let correo = formElement.correo.value;
        let usuario = formElement.usuario.value;
        let password = formElement.password.value;
        let telefono = formElement.telefono.value;

        addUser(ci, correo, usuario, password, telefono);
    };
}

async function addUser(ci, correo, usuario, password, telefono) {
    let query = await new UserDAO().addUser(ci, correo, usuario, password, telefono);

    if (query.estado) {
        await new SessionDAO().logIn(correo, password);
        window.location.href = "../verificarCuenta/verificarCuenta.html";
    } else {
        alert(`Error al registrar: ${query.mensaje}`);
    }
}
