import SessionDAO from "../../../dao/sessionDAO.js";
import SaleDAO from "../../../dao/saleDAO.js";
import inquiryDAO from '../../../dao/InquiryDAO.js'


let actualUserCi = null;
let allSales = [];

window.onload = async () => {
    let queryResponse = await new SaleDAO().getLastSales();
    allSales = queryResponse.data;
    
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    
    let inquiryResponse = await new inquiryDAO().getNewInquirys();
    let newInquirys = inquiryResponse.data;
    if (newInquirys.length === 0) {
        showInquiryMessage();
    } else {
        showInquirys(newInquirys);
    }

    if (allSales.length === 0) {
        showMessage();
    } else {
        showSales(allSales);
    }
    addEvents();
}

function showSales(sales) {
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
            localStorage.setItem("saleSelected", JSON.stringify(sale));
            window.location.href = "../../Ventas/gestionarVentas/gestionarVentas.html";
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function showMessage() {
    let recentPurchases = document.querySelector(".recentPurchases");
    let pMessage = document.createElement("p");
    pMessage.innerHTML = "No hay ventas Recientes"
    pMessage.className = "subTitle";
    recentPurchases.appendChild(pMessage);
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
    if(notify.classList.contains("notify")){
        notify.classList.add("empty");
        notify.classList.remove("notify");
    }
}

function showInquirys(newInquirys) {
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

function addEvents() {
    let body = document.querySelector("body");
    let consultationBtn = document.querySelector("#inquiryBtn");
    let listConsultation = document.querySelector("#inquiryList");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let confirmationAlert = document.querySelector("#confirmationAlert");
    let menuBtn = document.querySelector("#menuBtn");
    let navDiv = document.querySelector("#navDiv");
    let nav = document.querySelector("nav");

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
}

async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../indexUsuario/indexUsuario.html";
}

