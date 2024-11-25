import ProductDAO from "../../../dao/productDao.js";
import sessionDAO from '../../../dao/sessionDAO.js'

let allProducts = [];
let filter = [];

window.onload = async () => {
    let query = await new ProductDAO().getProducts();
    allProducts = query.data;
    let queryUser = await new sessionDAO().getSession();
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");

    if (queryUser.status) {
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

    showProduct(allProducts);
    addEvents();
};

function addEvents() {
    let imgButtons = document.querySelectorAll("#productContainer img");
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
    let searchInput = document.querySelector("#searchInput");
    let contactBtn = document.querySelector("#inquiryBtn");
    let offerBtn = document.querySelector("#offerBtn");

    offerBtn.onclick = () =>{
        window.location.href = "../../Ofertas/verOferta/verOferta.html";
    }

    imgButtons.forEach(imgBtn => {
        imgBtn.onclick = () => {
            let productId = imgBtn.getAttribute("data-product-id");
            localStorage.setItem("selectedProductId", productId);
            window.location.href = `../../Productos/verDetalleProducto/verDetalleProducto.html?id=${productId}`;
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

    userBtn.onclick = () => {
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

    searchInput.onkeyup = () =>{
        filter = searchInput.value;
        console.log(filter);
        searchProducts(filter);
    }
}


async function showProduct(products) {
    let containerElement = document.querySelector("#productContainer");
    containerElement.innerHTML = "";
    products.forEach(product => {
        let div = document.createElement('div');
        div.innerHTML = `
                <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}" class="imgProduct" data-product-id="${product.productId}"></img>
                <p class="price">$${product.price}</p>
                <div class="info">
                    <p >${product.name}</p>
               </div>
            `;
        div.onclick = () => {
            activarVerDetalle(product.productId);
        }
        containerElement.appendChild(div);
    });
}

function searchProducts(){
    let filteredProducts = allProducts.filter(product => (product.productId + product.name+"").includes(filter));
    showProduct(filteredProducts);
}

async function logOut() {
    await new sessionDAO().logOut();
    window.location.href = "../../Usuarios/indexUsuario/indexUsuario.html";
}
