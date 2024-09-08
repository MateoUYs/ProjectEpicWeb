import SessionDAO from "../../../dao/sesionDAO.js";
import UserDAO from "../../../dao/userDao.js";

window.onload = () => {
    addEvents(); 
}

function addEvents() {
    let btnModify = document.querySelector("#btnModificar");
    
    btnModify.onsubmit = async (e) => {
        e.preventDefault(); 

        let ci = formElement.ci.value;
        let correo = formElement.correo.value;
        let usuario = formElement.usuario.value;
        let password = formElement.password.value;
        let telefono = formElement.telefono.value;

        addUser(ci, correo, usuario, password, telefono);
    };
}