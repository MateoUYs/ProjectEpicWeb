import SessionDAO from "../../../dao/sessionDAO.js";

window.onload = async() => {
    let query = await new SessionDAO().getSession();
    if (query.estado){
        if(query.datos.isAdmin == 1){
        }else{
            window.location.href = "../IndexUsuario/indexUsuario.html";
        }
    }else{
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }
    // addEvents();
}

