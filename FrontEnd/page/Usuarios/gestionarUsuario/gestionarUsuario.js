import SessionDAO from "../../../dao/sesionDAO.js";
import UserDAO from "../../../dao/userDao.js";

window.onload = () => {
    loadData();
    addEvents();
}

async function loadData() {
    let pEmail = document.querySelector("#email");
    let pName = document.querySelector("#name");
    let pPhone = document.querySelector("#phone");
    let query = await new SessionDAO().getSession();

    if (query.estado) {
        pEmail.innerHTML = query.datos.email;
        pName.innerHTML = query.datos.usuario;
        pPhone.innerHTML = query.datos.phone;
    } else {
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }
}

function addEvents() {
    let btnModify = document.querySelector("#btnModificar");
    let formElement = document.querySelector("#frmUserSettings");
    let btnDelete = document.querySelector("#btnEliminar");

    btnModify.onclick = async (e) => {
        e.preventDefault();
        let query = await new SessionDAO().getSession();

        let ci = query.datos.ci;
        let correo = formElement.correo.value;
        let usuario = formElement.usuario.value;
        let password = formElement.password.value;
        let telefono = formElement.telefono.value;
    
        let userData = {};
        if (correo) userData.correo = correo;
        if (usuario) userData.usuario = usuario;
        if (password) userData.password = password;
        if (telefono) userData.telefono = telefono;

        console.log(userData);
       //modifyUser(ci, userData);
    };

    btnDelete.onclick = async (e) => {
        e.preventDefault();
        let query = await new SessionDAO().getSession();

        let ci = query.datos.ci;

        deleteUser(ci);
    }
}

async function modifyUser(ci, userData) {
    let query = await new UserDAO().modifyUser(ci, userData);
    let pAlert = document.querySelector("#modifyAlert");
    let pEmail = document.querySelector("#email");
    let pName = document.querySelector("#name");
    let pPhone = document.querySelector("#phone");

    if (query.estado) {
        pAlert.innerHTML = "¡Usuario modificado con éxito!";
        pEmail.innerHTML = correo;
        pName.innerHTML = usuario;
        pPhone.innerHTML = telefono;
    } else {
        pAlert.innerHTML = `¡Error al modificar el usuario ${query.mensaje}!`;
    }
}

async function deleteUser(ci){
    let query = await new UserDAO().deleteUser(ci);
    let pAlert = document.querySelector("#deleteAlert");
    if (query.estado) {
        pAlert.innerHTML = "¡Usuario eliminado con éxito!";
        setTimeout(async() => {
            await new SessionDAO().logOut();
            window.location.href = "../iniciarSesion/iniciarSesion.html"; 
        }, 3000);
    }else{
        pAlert.innerHTML = `¡Error al eliminar el usuario ${query.mensaje}!`;
    }
}