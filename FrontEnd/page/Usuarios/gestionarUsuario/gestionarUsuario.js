import SessionDAO from "../../../dao/sessionDAO.js";
import UserDAO from "../../../dao/userDao.js";

window.onload = async() => {
    let query = await new SessionDAO().getSession();
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
    loadData();
    addEvents();
}

async function loadData() {
    let formElement = document.querySelector("#frmUserSettings");
    let query = await new SessionDAO().getSession();

    if (query.status) {
        formElement.email.value = query.data.email;
        formElement.username.value = query.data.usuario;
        formElement.phoneNumber.value = query.data.phone;
    } else {
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }
}

function addEvents() {
    let btnModify = document.querySelector("#btnModify");
    let formElement = document.querySelector("#frmUserSettings");
    let btnDelete = document.querySelector("#btnDelete");
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
    let manageUser = document.querySelector("#manageUser");
    let viewSales = document.querySelector("#viewSales");
    let offerBtn = document.querySelector("#offerBtn");

    offerBtn.onclick = () =>{
        window.location.href = "../../Ofertas/verOferta/verOferta.html";
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

    manageUser.onclick = () => {
        window.location.href = "../../Usuarios/gestionarUsuario/gestionarUsuario.html";
    }

    viewSales.onclick = () => {
        window.location.href = "../../Ventas/verVenta/verVenta.html";
    }

    viewProductsBtn.onclick = () => {
        window.location.href = "../../Productos/verProducto/verProducto.html";
    }

    btnComprar.onclick = async () => {
        let query = await new sessionDAO().getSession();

        if (query.status) {
            window.location.href = "../../Carrito/confirmarCompra/confirmarCompra.html";
        } else {
            window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
        }
    }

    contactBtn.onclick = async () => {
        let query = await new sessionDAO().getSession();

        if (query.status) {
            window.location.href = "../../Consultas/realizarConsulta/realizarConsulta.html";
        } else {
            window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
        }
    }

    registerBtn.onclick = () => {
        window.location.href = "../../Usuarios/registrarse/registrarse.html";
    }

    logInBtn.onclick = () => {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }

    userBtn.onclick = () => {
        if (userModal.classList.contains("modalDisable")) {
            userModal.classList.add("modalEnable");
            userModal.classList.remove("modalDisable");
        } else {
            userModal.classList.remove("modalEnable");
            userModal.classList.add("modalDisable");
        }
    }

    homeBtn.onclick = () => {
        window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
    }

    logOutBtn.onclick = () => {
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

    btnModify.onclick = async (e) => {
        e.preventDefault();
        let query = await new SessionDAO().getSession();

        let ci = query.data.ci;
        let email = formElement.email.value;
        let username = formElement.username.value;
        let password = formElement.password.value;
        let phoneNumber = formElement.phoneNumber.value;

        modifyUser(ci, email, username, password, phoneNumber);
    };

    btnDelete.onclick = async (e) => {
        e.preventDefault();
        let query = await new SessionDAO().getSession();

        let ci = query.datos.ci;

        deleteUser(ci);
    }
}

async function modifyUser(ci, email, username, password, phoneNumber) {
    let query = await new UserDAO().modifyUser(ci, email, username, password, phoneNumber);
    let pAlert = document.querySelector("#modifyAlert");

    if (query.status) {
        pAlert.innerHTML = "¡Usuario modificado con éxito!";
    } else {
        pAlert.innerHTML = `¡Error al modificar el usuario: ${query.message}!`;
    }
}

async function deleteUser(ci) {
    let query = await new UserDAO().deleteUser(ci);
    let pAlert = document.querySelector("#deleteAlert");
    if (query.status) {
        pAlert.innerHTML = "¡Usuario eliminado con éxito!";
        setTimeout(async () => {
            await new SessionDAO().logOut();
            window.location.href = "../iniciarSesion/iniciarSesion.html";
        }, 3000);
    } else {
        pAlert.innerHTML = `¡Error al eliminar el usuario: ${query.message}!`;
    }
}

async function logOut() {
    await new sessionDAO().logOut();
    window.location.href = "../indexUsuario/indexUsuario.html";
}