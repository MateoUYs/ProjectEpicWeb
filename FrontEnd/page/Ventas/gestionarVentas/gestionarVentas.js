import SessionDAO from "../../../dao/sessionDAO.js";
import SaleDAO from "../../../dao/saleDAO.js";


let actualUserCi = null;
let filter = "";
let allSales = [];

window.onload = async () => {
    let queryResponse = await new SaleDAO().getAll();
    allSales = queryResponse.data;
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showSales(allSales);
    addEvents();
}

async function showSales(sales) {
    let tbodyElement = document.querySelector("#saleData");

    tbodyElement.innerHTML = "";
    sales.forEach((sale) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${sale.saleId}</td>
             <td>${sale.paymentMethod}</td>
             <td>${sale.paymentStatus}</td>
             <td>${sale.saleStatus}</td>
             <td>${sale.shippingMethod}</td>
             <td>${sale.shippingAddress}</td>
             <td>${sale.trackingNumber}</td>
             <td>${sale.userName}</td>
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
            actualUserCi = sale.userCi;
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let body = document.querySelector("body");
    let divFrm = document.querySelector("#saleFrm");
    let cancelarBtn = document.querySelector("#cancelBtn");
    let frmSale = divFrm.querySelector("form");
    let consultationBtn = document.querySelector("#inquiryBtn");
    let listConsultation = document.querySelector("#inquiryList");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let message = document.querySelector("#message");
    let confirmationAlert = document.querySelector("#confirmationAlert");
    let menuBtn = document.querySelector("#menuBtn");
    let navDiv = document.querySelector("#navDiv");
    let nav = document.querySelector("nav");
    let searchInput = document.querySelector("#searchInput");

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDeactivated");
        divFrm.classList.remove("frmActivated");
        body.classList.remove("modalOpen");
        frmSale.reset();
        message.innerHTML = "";
    }

    consultationBtn.onclick = () => {
        if (listConsultation.classList.contains("deactivated")) {
            listConsultation.classList.add("activated");
            listConsultation.classList.remove("deactivated");
        } else {
            listConsultation.classList.remove("activated");
            listConsultation.classList.add("deactivated");
        }
    }

    homeBtn.onclick = () => {
        window.location.href = "../../Usuarios/indexAdmin/indexAdmin.html";
    }

    btnLogOut.onclick = () => {
        divAlert.classList.add("alertActivated");
        divAlert.classList.remove("alertDeactivated");
        pAlertTitle.innerHTML = "Cerrar Sesión";
        alertQuestion.innerHTML = "¿Estás seguro de que deseas cerrar sesión? Si cierras sesión, serás redirigido al Inicio de Sesión";
        frmAlert.submit.value = "Cerrar Sesión";
    }

    frmSale.onsubmit = (e) => {
        e.preventDefault()
        let saleId = frmSale.saleId.value;
        let paymentMethod = frmSale.paymentMethod.value;
        let isPaid = (frmSale.paymentStatus.value === "Pago") ? 1 : 0;
        let saleStatus = frmSale.saleStatus.value;
        let shippingMethod = frmSale.shippingMethod.value;
        let shippingAddress = (frmSale.shippingAddress.value === "No aplica") ? null : frmSale.shippingAddress.value;
        let trackingNumber = (frmSale.trackingNumber.value === "No aplica") ? null : frmSale.trackingNumber.value;
        let userCi = actualUserCi;
        let saleDate = frmSale.saleDate.value;

        updateSale(saleId, isPaid, shippingAddress, saleStatus, paymentMethod, shippingMethod, saleDate, trackingNumber, userCi);
    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();

        setTimeout(async () => {
            confirmationAlert.innerHTML = "";
            logOut();
        }, 500);

    }

    alertCancel.onclick = () => {
        divAlert.classList.add("alertDeactivated");
        divAlert.classList.remove("alertActivated");
        body.classList.remove("modalOpen");
        alertQuestion.innerHTML = "";
        pAlertTitle.innerHTML = "";
        frmAlert.submit.value = "";
    }

    menuBtn.onclick = () => {
        if (menuBtn.classList.contains("hide")) {
            navDiv.classList.add("deactivatedDiv");
            navDiv.classList.remove("activatedDiv");
            nav.classList.add("deactivatedNav");
            nav.classList.remove("activatedNav");
            menuBtn.src = "../../../assets/menu.png";
        } else {
            menuBtn.classList.remove("show");
            menuBtn.classList.add("hide");
            menuBtn.src = "../../../assets/closeIcon.png";
        }
    }

    searchInput.onkeyup = () => {
        filter = searchInput.value;
        searchSales(filter);
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

async function updateSale(saleId, isPaid, shippingAddress, saleStatus, paymentMethod, shippingMethod, saleDate, trackingNumber, userCi) {
    let query = await new SaleDAO().updateSale(saleId, isPaid, shippingAddress, saleStatus, paymentMethod, shippingMethod, saleDate, trackingNumber, userCi);
    let divFrm = document.querySelector("#saleFrm");
    let saleFrm = divFrm.querySelector("form");
    let message = document.querySelector("#message");
    let body = document.querySelector("body");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Venta Modificada con éxito";
        let querySales = await new SaleDAO().getAll();
        let sales = querySales.data;
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            body.classList.remove("modalOpen");
            saleFrm.reset();
            message.innerHTML = "";
            showSales(sales);
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al modificar el producto ${query.mensaje}`;
    }
}

function searchSales(){
    let filteredSales = allSales.filter(sale => (sale.saleId + sale.paymentMethod + sale.userName +"").includes(filter));
    showSales(filteredSales);
}