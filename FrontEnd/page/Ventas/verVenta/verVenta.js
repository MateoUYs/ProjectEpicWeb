import saleDao from "../../../dao/saleDAO.js";
import sessionDAO from '../../../dao/sessionDAO.js'

let allSales = [];

window.onload = async () => {
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let manageUserBtn = document.querySelector("#manageUserBtn");
    let logOutBtn = document.querySelector("#logOutBtn");
    let query = await new sessionDAO().getSession();
    let queryResponse = await new saleDao().getUserSales();
    allSales = queryResponse.data;

    if (query.status) {
        registerBtn.classList.remove("userUnlogged");
        logInBtn.classList.remove("userUnlogged");
        manageUserBtn.classList.add("userLogged");
        logOutBtn.classList.add("userLogged");

    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html"
    }

    console.log(allSales);
    showSales(allSales);
    addEvents();
}

async function showSales(sales) {
    let tbodyElement = document.querySelector("#saleData");


    tbodyElement.innerHTML = "";
    sales.forEach((sale) => {
        let totalPrice = 0;
        sale.product.forEach((product) => {
            totalPrice = parseInt(product.totalPrice) + totalPrice;
        });
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${sale.saleId}</td>
             <td>${sale.paymentMethod}</td>
             <td>${sale.paymentStatus}</td>
             <td>${sale.saleStatus}</td>
             <td>${sale.shippingMethod}</td>
             <td>${sale.shippingAddress}</td>
             <td>${sale.trackingNumber}</td>
             <td>$${totalPrice}</td>
             <td>${sale.saleDate}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        td.appendChild(div);
        tr.appendChild(td);

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/view.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            loadInputs(sale);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}


function addEvents() {
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
    let homeBtn = document.querySelector("#homeBtn");
    let cancelarBtn = document.querySelector("#cancelBtn");
    let divFrm = document.querySelector("#saleFrm");
    let frmSale = divFrm.querySelector("form");


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

    registerBtn.onclick = () => {
        window.location.href = "../../Usuarios/registrarse/registrarse.html";
    }

    logInBtn.onclick = () => {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }

    manageUserBtn.onclick = () => {
        window.location.href = "../../Usuarios/gestionarUsuario/gestionarUsuario.html";
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

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDeactivated");
        divFrm.classList.remove("frmActivated");
        body.classList.remove("modalOpen");
        frmSale.reset();
        message.innerHTML = "";
    }
}


function loadInputs(sale) {
    let divFrm = document.querySelector("#saleFrm");
    let frmSale = divFrm.querySelector("form");
    let body = document.querySelector("body");
    let productsList = document.querySelector(".ProductList");
    let products = sale.product;
    divFrm.classList.remove("frmDeactivated");
    divFrm.classList.add("frmActivated");
    body.classList.add("modalOpen");

    frmSale.saleId.value = sale.saleId;
    frmSale.paymentMethod.value = sale.paymentMethod;
    Array.from(frmSale.paymentStatus.options).forEach((option, index) => {
        if (option.text == sale.paymentStatus) {
            frmSale.paymentStatus.selectedIndex = index;
        }
    });
    Array.from(frmSale.saleStatus.options).forEach((option, index) => {
        if (option.text == sale.saleStatus) {
            frmSale.saleStatus.selectedIndex = index;
        }
    });
    frmSale.shippingMethod.value = sale.shippingMethod;
    frmSale.shippingAddress.value = sale.shippingAddress;
    frmSale.trackingNumber.value = sale.trackingNumber;
    frmSale.userName.value = sale.userName;
    frmSale.saleDate.value = sale.saleDate;

    productsList.innerHTML = "";
    products.forEach((product) => {
        let divElement = document.createElement("div");
        divElement.innerHTML += `
            <img src="../../../../BackEnd/imgs/${product.productId}.${product.extension}" class="imgProductCart">
            <p>${product.name}</p>
            <p>Talle: ${product.size}</p>
            <p class="quantity">Cantidad: ${product.quantity}</p>
           `;
        productsList.appendChild(divElement);
    });
}
