import UserDAO from "../../../dao/userDao.js";
import SessionDAO from "../../../dao/sessionDAO.js";

window.onload = () => {
    showMessage();
    addEvent();
}

async function showMessage() {
    let query = await new SessionDAO().getSession();
    let pMessage = document.querySelector("#description");
    pMessage.innerHTML = `Te hemos enviado un correo con un código de verificación a ${query.data.email}. Por favor, revisa tu bandeja de entrada e ingresa el código en el campo de abajo para continuar.`;
}

function addEvent() {
    let frmElement = document.querySelector("#frmVerify");

    frmElement.onsubmit = async (e) => {
        e.preventDefault();

        let code = frmElement.code.value;

        verifyUser(code);
    }
}

async function verifyUser(code) {
    let query = await new SessionDAO().getSession();
    let verifyQuery = await new UserDAO().verifyUser(query.data.email, code);
    if (verifyQuery.status) {
        window.location.href = "../IndexUsuario/indexUsuario.html";
    } else {
        alert(`Error al verificar: ${verifyQuery.message}`);
    }
}
