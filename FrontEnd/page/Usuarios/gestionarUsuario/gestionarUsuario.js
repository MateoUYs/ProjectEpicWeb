import SessionDAO from "../../../dao/sessionDAO.js";
import UserDAO from "../../../dao/userDao.js";

window.onload = () => {
    loadData();
    addEvents();
}

async function loadData() {
    let formElement = document.querySelector("#frmUserSettings");
    let query = await new SessionDAO().getSession();

    if (query.estado) {
        formElement.email.value = query.datos.email;
        formElement.username.value = query.datos.usuario;
        formElement.phoneNumber.value = query.datos.phone;
    } else {
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }
}

function addEvents() {
    let btnModify = document.querySelector("#btnModify");
    let formElement = document.querySelector("#frmUserSettings");
    let btnDelete = document.querySelector("#btnDelete");

    btnModify.onclick = async (e) => {
        e.preventDefault();
        let query = await new SessionDAO().getSession();

        let ci = query.datos.ci;
        let email = formElement.email.value;
        let username = formElement.username.value;
        let password = formElement.password.value;
        let phoneNumber = formElement.phoneNumber.value;

        modifyUser(ci, email, username, password, phoneNumber);
    };

    btnDelete.onclick = async (e) => {
        e.preventDefault();
        let query = await new SessionDAO().getSession();

        let ci = query.datos.ci;

        deleteUser(ci);
    }
}

async function modifyUser(ci, email, username, password, phoneNumber) {
    let query = await new UserDAO().modifyUser(ci, email, username, password, phoneNumber);
    let pAlert = document.querySelector("#modifyAlert");

    if (query.status) {
        pAlert.innerHTML = "¡Usuario modificado con éxito!";
    } else {
        pAlert.innerHTML = `¡Error al modificar el usuario: ${query.message}!`;
    }
}

async function deleteUser(ci) {
    let query = await new UserDAO().deleteUser(ci);
    let pAlert = document.querySelector("#deleteAlert");
    if (query.status) {
        pAlert.innerHTML = "¡Usuario eliminado con éxito!";
        setTimeout(async () => {
            await new SessionDAO().logOut();
            window.location.href = "../iniciarSesion/iniciarSesion.html";
        }, 3000);
    } else {
        pAlert.innerHTML = `¡Error al eliminar el usuario: ${query.message}!`;
    }
}
