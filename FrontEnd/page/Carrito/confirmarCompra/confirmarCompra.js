import CarritoDAO from "../../../dao/carritoDAO.js";
import sessionDAO from '../../../dao/sessionDAO.js'

window.onload = async() =>{
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let manageUserBtn = document.querySelector("#manageUserBtn");
    let logOutBtn = document.querySelector("#logOutBtn");
    let query = await new sessionDAO().getSession();

    if (query.status) {
        registerBtn.classList.remove("userUnlogged");
        logInBtn.classList.remove("userUnlogged");
        manageUserBtn.classList.add("userLogged");
        logOutBtn.classList.add("userLogged");

    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html"
    }

    addEvent();
}

function addEvent(){
    let metodoEnvio = document.querySelector("#metodoEnvio");
    let confirmarCompraElement = document.querySelector("#confirmarCompra");
   
    metodoEnvio.onchange = () => {
        let valor = metodoEnvio.value;
        console.log(valor);
        if(valor == "Envio"){
            confirmarCompraElement.classList.add("tipoEnvio");
        }else{
            confirmarCompraElement.classList.remove("tipoEnvio");
        }   
    }


    confirmarCompraElement.onsubmit = (e) => {
        e.preventDefault();
        let metodoEnvio = confirmarCompraElement.metodoEnvio.value;
        let metodoPago = confirmarCompraElement.metodoPago.value;
        let direccion = confirmarCompraElement.direccion.value;
        confirmarCompra(metodoEnvio,metodoPago,direccion);

        
    }
}

async function confirmarCompra(metodoEnvio,metodoPago,direccion){
    let respuesta = await new CarritoDAO().confirmarCompra(direccion,metodoEnvio,metodoPago);
    console.log(respuesta.message);


}
