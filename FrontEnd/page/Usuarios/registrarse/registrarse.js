import UserDAO from "../../../dao/userDao.js";
import SessionDAO from "../../../dao/sesionDAO.js";

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

        addUser(ci, correo, usuario, password, telefono);
    };
}

async function addUser(ci, correo, usuario, password, telefono) {
    let query = await new UserDAO().addUser(ci, correo, usuario, password, telefono);

    if (query.estado) {
        let query = await new SessionDAO().logIn(correo, password);
        console.log(query.datos);
        //
    } else {
        alert(`Error al registrar: ${query.mensaje}`);
    }
}
