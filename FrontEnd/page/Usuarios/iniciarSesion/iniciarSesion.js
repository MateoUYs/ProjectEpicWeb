import SessionDAO from "../../../dao/sesionDAO.js";

window.onload = async() => {
    let query = await new SessionDAO().getSession();
    if (query.estado){
        if(query.datos.isAdmin == 1){
            window.location.href = "../indexAdmin/indexAdmin.html";
        }else{
            window.location.href = "../IndexUsuario/indexUsuario.html";
        }
    }
    addEvents();
}


function addEvents(){
    let formElement = document.querySelector("#frmLogIn");
    formElement.onsubmit = (e)=>{
        e.preventDefault();
        let email  = formElement.email.value;
        let password =formElement.password.value;
        
        logIn(email,password);
    }
}

async function logIn(email,password){
    let loggedQuery = await new SessionDAO().logIn(email,password);
    console.log(loggedQuery.datos);
    if(loggedQuery.estado){
        if(loggedQuery.datos.isAdmin == 1){
            window.location.href = "../indexAdmin/indexAdmin.html";
        }else{
            window.location.href = "../IndexUsuario/indexUsuario.html";
        }
    }else{
        alert(loggedQuery.mensaje);
    }
  
}


