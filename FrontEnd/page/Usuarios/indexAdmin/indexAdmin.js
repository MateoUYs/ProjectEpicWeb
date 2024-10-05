import SessionDAO from "../../../dao/sessionDAO.js";

window.onload = async() => {
    let query = await new SessionDAO().getSession();
    if (query.status){
        if(query.data.isAdmin){
        }else{
            window.location.href = "../IndexUsuario/indexUsuario.html";
        }
    }else{
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }
    // addEvents();
}

