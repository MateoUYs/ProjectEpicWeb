import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDAO.js";
import InquiryDAO from "../../../dao/InquiryDAO.js";

let id = null;

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    let inquiryResponse = await new InquiryDAO().getNewInquirys();
    let newInquirys = inquiryResponse.data;
    if (newInquirys.length === 0) {
        showInquiryMessage();
    } else {
        showInquirysList(newInquirys);
    }
    showStock();
    addEvents();
}

function showInquiryMessage() {
    let inquiryList = document.querySelector("#inquiryList");
    let notify = document.querySelector("#countConsults");
    let pMessage = document.createElement("p");
    inquiryList.innerHTML = "";
    pMessage.innerHTML = "No hay consultas sin responder"
    pMessage.className = "message";
    inquiryList.appendChild(pMessage);
    let manageBtn = document.createElement("button");
    manageBtn.className = "manageBtn";
    manageBtn.onclick = () => {
        window.location.href = "../../Consultas/gestionarConsultas/gestionarConsultas.html";
    }
    manageBtn.innerHTML = "Gestionar Consultas";
    inquiryList.appendChild(manageBtn);
    notify.innerHTML = 0;
    console.log(notify.classList);
    if (notify.classList.contains("notify")) {
        notify.classList.add("empty");
        notify.classList.remove("notify");
    }
}

function showInquirysList(newInquirys) {
    let inquiryList = document.querySelector("#inquiryList");
    let notify = document.querySelector("#countConsults");
    inquiryList.innerHTML = "";
    newInquirys.forEach((inquiry) => {
        let div = document.createElement("div");
        div.className = "newInquiry";
        div.innerHTML += `
            <p>${inquiry.title}</p>
            <p>${inquiry.userName}</p>
        `;
        let img = document.createElement("img");
        img.src = "../../../assets/view.png";
        img.onclick = () => {
            window.location.href = "../../Consultas/gestionarConsultas/gestionarConsultas.html";
            localStorage.setItem("inquirySelected", JSON.stringify(inquiry));
        }
        div.appendChild(img);
        inquiryList.appendChild(div);
    });
    let manageBtn = document.createElement("button");
    manageBtn.className = "manageBtn";
    manageBtn.innerHTML = "Gestionar Consultas";
    manageBtn.onclick = () => {
        window.location.href = "../../Consultas/gestionarConsultas/gestionarConsultas.html";
    }
    inquiryList.appendChild(manageBtn);
    notify.innerHTML = newInquirys.length;
    notify.classList.remove("empty");
    notify.classList.add("notify");
}

async function showStock() {
    let query = await new ProductDAO().getStock();
    let products = query.data;
    let tbodyElement = document.querySelector("#productData");
    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        console.log(JSON.stringify(product));
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${product.productId}</td>
             <td>${product.name}</td>
             <td>${product.stock}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        td.appendChild(div);
        div.appendChild(btn);
        tr.appendChild(td);


        btn.className = "btnTd";
        btn.innerHTML = `<img src="../../../assets/addStock.png" alt="Agregar Stock">`;
        btn.onclick = () => {
            loadInfo(product, "Agregar");
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/updateStock.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            loadInfo(product, "Actualizar");
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let divFrm = document.querySelector("#frmStock");
    let cancelarBtn = document.querySelector("#cancelBtn");
    let frmStock = document.querySelector("#frmStock form");
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


    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDeactivated");
        divFrm.classList.remove("frmActivated");
        frmStock.reset();
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

    frmStock.onsubmit = (e) => {
        e.preventDefault()
        let idProduct = id;
        let stock = frmStock.stock.value;

        if (frmStock.submit.value == "Agregar") {
            addStock(idProduct, stock);
        } else if (frmStock.submit.value == "Actualizar") {
            updateStock(idProduct, stock);
        }

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

    alertCancel.onclick = () => {
        divAlert.classList.add("alertDeactivated");
        divAlert.classList.remove("alertActivated");
        alertQuestion.innerHTML = "";
        pAlertTitle.innerHTML = "";
        frmAlert.submit.value = "";
    }
}



async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}



function loadInfo(product, use) {
    let name = product.name;
    let divFrm = document.querySelector("#frmStock");
    let frmStock = document.querySelector("#frmStock form");
    let pTitle = document.querySelector("#title");
    let pStock = document.querySelector("#stockActual");


    divFrm.classList.remove("frmDeactivated");
    divFrm.classList.add("frmActivated");

    frmStock.name.value = name;
    id = product.productId;

    if (use == "Agregar") {
        pTitle.innerHTML = "Agregando Stock";
        frmStock.submit.value = "Agregar";
        pStock.innerHTML = `Stock Actual: ${product.stock}`;
    } else if (use == "Actualizar") {
        pTitle.innerHTML = "Actualizando Stock";
        pStock.innerHTML = `Stock Actual: ${product.stock}`;
        frmStock.submit.value = "Actualizar";
    }
}

async function addStock(productId, stock) {
    let query = await new ProductDAO().addStock(productId, stock);
    let frmProduct = document.querySelector("#frmStock form");
    let divFrm = document.querySelector("#frmStock");
    let message = document.querySelector("#message");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Stock agregado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmProduct.reset();
            message.innerHTML = "";
            showStock();
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al agregar el stock ${query.message}`;
    }
}

async function updateStock(productId, stock) {
    let query = await new ProductDAO().updateStock(productId, stock);
    let frmProduct = document.querySelector("#frmStock form");
    let divFrm = document.querySelector("#frmStock");
    let message = document.querySelector("#message");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Stock actualizado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmProduct.reset();
            message.innerHTML = "";
            showStock();
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al actualizar el stock ${query.message}`;
    }
}

