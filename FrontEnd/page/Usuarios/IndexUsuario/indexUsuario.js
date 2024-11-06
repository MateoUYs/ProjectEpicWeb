import ProductDAO from "../../../dao/productDAO.js";
import statsDAO from '../../../dao/statsDAO.js';
import sessionDAO from '../../../dao/sessionDAO.js';

window.onload = async () => {
    let query = await new sessionDAO().getSession();
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let manageUserBtn = document.querySelector("#manageUserBtn");
    let logOutBtn = document.querySelector("#logOutBtn");

    if (query.status) {
        registerBtn.classList.remove("userUnlogged");
        logInBtn.classList.remove("userUnlogged");
        manageUserBtn.classList.add("userLogged");
        logOutBtn.classList.add("userLogged");
        
    } else {
        registerBtn.classList.add("userUnlogged");
        logInBtn.classList.add("userUnlogged");
        manageUserBtn.classList.remove("userLogged");
        logOutBtn.classList.remove("userLogged");
    }
    showProduct();
    addEvents();
};


function addEvents() {
    let imgButtons = document.querySelectorAll("#productContainer img");
    let btnCart = document.querySelector("#showCart");
    let cart = document.querySelector("#cartModal");
    let btnComprar = document.querySelector("#confirmarCompra");
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let manageUserBtn = document.querySelector("#manageUserBtn");
    let logOutBtn = document.querySelector("#logOutBtn");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let body = document.querySelector("body");

    imgButtons.forEach(imgBtn => {
        imgBtn.onclick = () => {
            let productId = imgBtn.getAttribute("data-product-id");
            localStorage.setItem("selectedProductId", productId);
            window.location.href = `verDetalleProducto.html?id=${productId}`;
        };
    });

    btnCart.onclick = () => {
        if (cart.classList.contains("modalEnable")) {
            cart.classList.remove("modalEnable");
            cart.classList.add("modalDisable");
        } else {
            cart.classList.remove("modalDisable");
            cart.classList.add("modalEnable");
        }
    }


    btnComprar.onclick = () => {
        window.location.href = "../../Carrito/confirmarCompra/confirmarCompra.html";
    }

    registerBtn.onclick = () =>{
        window.location.href = "../registrarse/registrarse.html";
    }

    logInBtn.onclick = () =>{
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }

    manageUserBtn.onclick = () =>{
        window.location.href = "../gestionarUsuario/gestionarUsuario.html";
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


async function showProduct() {
    let query = await new statsDAO().getBestSellings();
    let products = query.data;
    let tbodyElement = document.querySelector("#productContainer");
    products.forEach(product => {
        let div = document.createElement('div');
        div.innerHTML = `
                <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}" class="imgProduct" data-product-id="${product.productId}"></img>
                <p class="price">${product.price}</p>
                <div class="info">
                    <p >${product.name}</p>
               </div>
            `;
        div.onclick = () => {
            activarVerDetalle(product.productId);
        }
        tbodyElement.appendChild(div);
    });
}


function activarVerDetalle(id) {
    window.location.href = `../../Productos/verDetalleProducto/verDetalleProducto.html?id=${id}`;
}

async function logOut() {
    await new sessionDAO().logOut();
    window.location.href = "../indexUsuario/indexUsuario.html";
}

