import CarritoDAO from "../../../dao/carritoDAO.js";
import sessionDAO from '../../../dao/sessionDAO.js'

window.onload = async() =>{
    let query = await new sessionDAO().getSession();
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");

    if (query.status) {
        registerBtn.classList.remove("userUnlogged");
        logInBtn.classList.remove("userUnlogged");
        userBtn.classList.add("userLogged");
        logOutBtn.classList.add("userLogged");
        
    } else {
        registerBtn.classList.add("userUnlogged");
        logInBtn.classList.add("userUnlogged");
        userBtn.classList.remove("userLogged");
        logOutBtn.classList.remove("userLogged");
    }
    addEvent();
}

function addEvent(){
    let metodoEnvio = document.querySelector("#metodoEnvio");
    let confirmarCompraElement = document.querySelector("#confirmarCompra");
    let homeBtn = document.querySelector("#homeBtn");
   
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

    homeBtn.onclick = () =>{
        window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
    }
}

async function confirmarCompra(metodoEnvio,metodoPago,direccion){
    let respuesta = await new CarritoDAO().confirmarCompra(direccion,metodoEnvio,metodoPago);
    console.log(respuesta.message);


}
