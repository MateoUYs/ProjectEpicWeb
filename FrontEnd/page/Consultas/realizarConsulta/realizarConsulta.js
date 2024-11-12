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
    let btnCart = document.querySelector("#showCart");
    let cart = document.querySelector("#cartModal");
    let btnComprar = document.querySelector("#confirmarCompra");
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let body = document.querySelector("body");
    let homeBtn = document.querySelector("#homeBtn");
    let viewProductsBtn = document.querySelector("#productsBtn");
    let userModal = document.querySelector("#userModal");
    let contactBtn = document.querySelector("#inquiryBtn");
    let formSumbit = document.querySelector("#consultaForm");


    formSumbit.onsubmit = (e) => {
        e.preventDefault();
        let title = formElement.title.value;
        let message = formSumbit.message.value;
    }


    btnCart.onclick = () => {
        if (cart.classList.contains("modalEnable")) {
            cart.classList.remove("modalEnable");
            cart.classList.add("modalDisable");
        } else {
            cart.classList.remove("modalDisable");
            cart.classList.add("modalEnable");
        }
    }

    viewProductsBtn.onclick = () =>{
        window.location.href = "../../Productos/verProducto/verProducto.html";
    }

    btnComprar.onclick = async() => {
        let query = await new sessionDAO().getSession();
        
        if(query.status){
            window.location.href = "../../Carrito/confirmarCompra/confirmarCompra.html";
        }else{
            window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
        }
    }

    contactBtn.onclick = async() =>{
        let query = await new sessionDAO().getSession();
        
        if(query.status){
            window.location.href = "../../Consultas/realizarConsulta/realizarConsulta.html";
        }else{
            window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
        }
    }

    registerBtn.onclick = () =>{
        window.location.href = "../../Usuarios/registrarse/registrarse.html";
    }

    logInBtn.onclick = () =>{
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }

    userBtn.onclick = () =>{
        if(userModal.classList.contains("modalDisable")){
            userModal.classList.add("modalEnable");
            userModal.classList.remove("modalDisable");
        }else{
            userModal.classList.remove("modalEnable");
            userModal.classList.add("modalDisable");
        }
    }

    homeBtn.onclick = () =>{
        window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
    }

    logOutBtn.onclick = () =>{
        divAlert.classList.add("alertActivated");
        divAlert.classList.remove("alertDeactivated");
        body.classList.add("modalOpen");
        pAlertTitle.innerHTML = "Cerrar Sesión";
        alertQuestion.innerHTML = "¿Estás seguro de que deseas cerrar sesión?";
        frmAlert.submit.value = "Cerrar Sesión";
    }

    alertCancel.onclick = () => {
        divAlert.classList.add("alertDeactivated");
        divAlert.classList.remove("alertActivated");
        body.classList.remove("modalOpen");
        alertQuestion.innerHTML = "";
        pAlertTitle.innerHTML = "";
        frmAlert.submit.value = "";
    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async () => {
                confirmationAlert.innerHTML = "";
                logOut();
            }, 3000);
        }
    }
}

async function addInquiry(title, message){
    let respuesta = await new CarritoDAO().confirmarCompra(direccion,metodoEnvio,metodoPago);
    console.log(respuesta.message);


}

