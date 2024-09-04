import SesionDAO from "../../../dao/sesionDAO.js";

window.onload = () => {
    agregarEventos();
}


function agregarEventos(){
    let formElement = document.querySelector("#frmCrear");
    formElement.onsubmit = (e)=>{
        e.preventDefault();
        let email  = formElement.email.value;
        let password =formElement.password.value;
        
        iniciarSesion(email,password);
    }
}

async function iniciarSesion(email,password){
    let respuesta = await new SesionDAO().iniciarSesion(email,password);
    if(respuesta.estado){
        let respuesta = await new SesionDAO().obtenerSesion();
        console.log(respuesta);
      //  window.location.href = "../";
    }else{
        alert(respuesta.mensaje);
    }
  
}
