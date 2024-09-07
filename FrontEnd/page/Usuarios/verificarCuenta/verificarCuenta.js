import UserDAO from "../../../dao/userDao.js";
import SessionDAO from "../../../dao/sesionDAO.js";


window.onload = () => {
    mostrarMensaje();
    addEvent();
}

async function mostrarMensaje() {
    let query = await new SessionDAO().getSession();
    let pMensaje = document.querySelector("#descripcion");
    console.log(query.datos);
    pMensaje.innerHTML = `Te hemos enviado un correo con un código de verificación a ${query.datos.email} Por favor, revisa tu bandeja de entrada e ingresa el código en el campo de abajo para continuar.`;
}

function addEvent(){
    let frmElement = document.querySelector("frmVerificar");

    frmElement.onsubmit = async(e) => {
        e.preventDefault();

        let code = frmElement.code.value;

        verifyUser(code);
    }
}

async function verifyUser(code){
    let query = await new SessionDAO().getSession();
    let verifyQuery = new UserDAO().verifyUser(query.datos.email, code);
    if(verifyQuery.estado){
        console.log("llego");
        // window.location.href = "../IndexUsuario/indexUsuario.html";
    }else{
        alert(`Error al verificar ${verifyQuery.mensaje}`)
    }
}