import SessionDAO from "../../../dao/sessionDAO.js";
import OfferDAO from "../../../dao/offerDAO.js";
import ProductDAO from "../../../dao/productDAO.js";

let id = null;
let filter = "";
let allOfers = [];
let allProducts = [];

window.onload = async () => {
    let queryResponse = await new OfferDAO().getOffers();
    let productQuery = await new ProductDAO().getProducts();
    allOfers = queryResponse.data;
    allProducts = productQuery.data;
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    loadProducts(allProducts);
    showOffers(allOfers);
    addEvents();
}

async function showOffers(offers) {
    let tbodyElement = document.querySelector("#offerData");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let body = document.querySelector("body");

    tbodyElement.innerHTML = "";
    offers.forEach((offer) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${offer.offerId}</td>
             <td>${offer.title}</td>
             <td>${offer.description}</td>
             <td>${offer.startDate}</td>
             <td>${offer.endDate}</td>
             <td>${offer.discount}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        td.appendChild(div);
        div.appendChild(btn);
        tr.appendChild(td);


        btn.className = "btnTd";
        btn.innerHTML = `<img class="modifyImg" src="../../../assets/modifyIcon.png">`;
        btn.onclick = () => {
            loadInputs(offer);
            id = offer.offerId;
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/deleteIcon.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            divAlert.classList.add("alertActivated");
            divAlert.classList.remove("alertDeactivated");
            body.classList.add("modalOpen");
            pAlertTitle.innerHTML = "Eliminar Oferta";
            alertQuestion.innerHTML = "¿Estás seguro de que deseas eliminar la Oferta? Si eliminas la oferta, no se podrá deshacer los cambios";
            frmAlert.submit.value = "Eliminar Oferta";
            frmAlert.setAttribute("dataOfferId", offer.offerId);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let body = document.querySelector("body");
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#offerFrm");
    let cancelarBtn = document.querySelector("#cancelBtn");
    let frmOffer = divFrm.querySelector("form");
    let consultationBtn = document.querySelector("#inquiryBtn");
    let listConsultation = document.querySelector("#inquiryList");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let pTitle = document.querySelector("#title");
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


    addBtn.onclick = () => {
        divFrm.classList.remove("frmDeactivated");
        divFrm.classList.add("frmActivated");
        body.classList.add("modalOpen");
        pTitle.innerHTML = "Agregando Oferta";
        frmOffer.submit.value = "Agregar";
    }

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDeactivated");
        divFrm.classList.remove("frmActivated");
        body.classList.remove("modalOpen");
        frmOffer.reset();
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
        body.classList.add("modalOpen");
        pAlertTitle.innerHTML = "Cerrar Sesión";
        alertQuestion.innerHTML = "¿Estás seguro de que deseas cerrar sesión? Si cierras sesión, serás redirigido al Inicio de Sesión";
        frmAlert.submit.value = "Cerrar Sesión";
    }

    frmOffer.onsubmit = (e) => {
        e.preventDefault()
        let offerId = id;
        let title = frmOffer.title.value;
        let description = frmOffer.description.value;
        let startDate = frmOffer.startDate.value;
        let endDate = frmOffer.endDate.value;
        let discount = frmOffer.discount.value;
        let products = Array.from(document.querySelectorAll("#products input[type='checkbox']:checked")).map(checkbox => checkbox.value);
        console.log(products);

        if (frmOffer.submit.value == "Agregar") {
            add(title, description, startDate, endDate, discount, products);

        } else if (frmOffer.submit.value == "Modificar") {
            modify(offerId, title, description, endDate, startDate, discount, products);
        }

    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async () => {
                confirmationAlert.innerHTML = "";
                logOut();
            }, 500);
        } else if (frmAlert.submit.value == "Eliminar Oferta") {
            let offerId = frmAlert.getAttribute("dataOfferId");
            deleteOffer(offerId);
            setTimeout(async () => {
                divAlert.classList.add("alertDeactivated");
                divAlert.classList.remove("alertActivated");
                confirmationAlert.innerHTML = "";
            }, 500);
        }
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
        searchOffers(filter);
    }
}

async function loadProducts(products) {
    let selectProducts = document.querySelector("#products");
    selectProducts.innerHTML = "";
    products.forEach((product) => {
        selectProducts.innerHTML += `
                <div class="check"><input class="inputCheck" type="checkbox" name="product" value="${product.productId}"><label class="checkText">${product.productId}- ${product.name}</label></div>
            `;
    })
}

async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}

async function add(title, description, startDate, endDate, discount, products) {
    let query = await new OfferDAO().addOffer(title, description, endDate, startDate, discount, products);
    let frmOffer = document.querySelector("#offerFrm form");
    let divFrm = document.querySelector("#offerFrm");
    let message = document.querySelector("#message");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        let queryOffers = await new OfferDAO().getOffers();
        let offers = queryOffers.data;
        message.innerHTML = "Oferta Agregada con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmOffer.reset();
            message.innerHTML = "";
            showOffers(offers);
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al agregar la oferta: ${query.message}`;
    }
}

function loadInputs(offer) {
    let divFrm = document.querySelector("#offerFrm");
    let frmOffer = document.querySelector("#offerFrm form");
    let pTitle = document.querySelector("#title");
    let body = document.querySelector("body");
    let startDate = offer.startDate.split(" ")[0];
    let endDate = offer.endDate.split(" ")[0];

    body.classList.add("modalOpen");
    divFrm.classList.remove("frmDeactivated");
    divFrm.classList.add("frmActivated");

    pTitle.innerHTML = "Modificando Oferta";
    frmOffer.submit.value = "Modificar";
    frmOffer.title.value = offer.title;
    frmOffer.description.value = offer.description;
    frmOffer.startDate.value = startDate;
    frmOffer.endDate.value = endDate;
    frmOffer.discount.value = offer.discount;

    selectProducts(offer.product);
}

function selectProducts(products){
    let checkProducts = document.querySelectorAll("#products input[type='checkbox']");
    checkProducts.forEach(check => {
        if (products.some(p => p.productId == check.value)) {
            check.checked = true;
        }
    });
}

async function modify(offerId, title, description, endDate, startDate, discount, products) {
    let query = await new OfferDAO().modifyOffer(offerId, title, description, endDate, startDate, discount, products);
    let frmOffer = document.querySelector("#offerFrm form");
    let divFrm = document.querySelector("#offerFrm");
    let message = document.querySelector("#message");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        let queryOffers = await new OfferDAO().getOffers();
        let offers = queryOffers.data;
        message.innerHTML = "Oferta Modificada con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmOffer.reset();
            message.innerHTML = "";
            showOffers(offers);
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al modificar la oferta: ${query.mensaje}`;
    }
}

async function deleteOffer(offerId) {
    let query = await new OfferDAO().deleteOffer(offerId);
    let confirmationAlert = document.querySelector("#confirmationAlert");

    if (query.status) {
        if (confirmationAlert.classList.contains("error")) {
            confirmationAlert.classList.remove("error");
            confirmationAlert.classList.add("confirmation");
        }
        let queryOffers = await new OfferDAO().getOffers();
        let offers = queryOffers.data;
        confirmationAlert.innerHTML = "Oferta Eliminada con éxito";
        showOffers(offers);
    } else {
        if (confirmationAlert.classList.contains("confirmation")) {
            confirmationAlert.classList.add("error");
            confirmationAlert.classList.remove("confirmation");
        }
        confirmationAlert.innerHTML = `Error al eliminar la oferta: ${query.mensaje}`;
    }
}

function searchOffers() {
    let filteredOffers = allOfers.filter(offer => (offer.offerId + offer.title + "").includes(filter));
    showOffers(filteredOffers);
}
