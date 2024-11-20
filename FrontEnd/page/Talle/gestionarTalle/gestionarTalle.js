import SessionDAO from "../../../dao/sessionDAO.js";
import sizeDAO from "../../../dao/sizeDAO.js";
import InquiryDAO from "../../../dao/InquiryDAO.js";

let sizeType = null;

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
    showSizes();
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
    if(notify.classList.contains("notify")){
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

async function showSizes() {
    let query = await new sizeDAO().getSizes();
    let sizes = query.data;
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let tbodyElement = document.querySelector("#sizeData");
    tbodyElement.innerHTML = "";
    sizes.forEach((size) => {
        console.log(JSON.stringify(size));
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${size.type}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        td.appendChild(div);
        div.appendChild(btn);
        tr.appendChild(td);


        btn.className = "deleteSize";
        btn.innerHTML = `<img src="../../../assets/deleteIcon.png">`;
        btn.onclick = () => {
            divAlert.classList.add("alertActivated");
            divAlert.classList.remove("alertDeactivated");
            pAlertTitle.innerHTML = "Eliminar Talle";
            alertQuestion.innerHTML = "¿Estás seguro de que deseas eliminar el talle? Si eliminas el talle, no se podrá deshacer los cambios";
            frmAlert.submit.value = "Eliminar Talle";
            sizeType = size.type;
        }
        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#frmSizes");
    let cancelarBtn = document.querySelector("#cancelBtn");
    let frmSizes = document.querySelector("#frmSizes form");
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

    addBtn.onclick = () => {
        divFrm.classList.remove("frmDeactivated");
        divFrm.classList.add("frmActivated");
        pTitle.innerHTML = "Agregando Producto";
        frmSizes.submit.value = "Agregar";
    }

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDeactivated");
        divFrm.classList.remove("frmActivated");
        frmSizes.reset();
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

    frmSizes.onsubmit = (e) => {
        e.preventDefault();
        let size = frmSizes.size.value;

        addSize(size);

    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async () => {
                confirmationAlert.innerHTML = "";
                logOut();
            }, 500);
        }else if(frmAlert.submit.value == "Eliminar Talle"){
            deleteSize(sizeType);
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
        alertQuestion.innerHTML = "";
        pAlertTitle.innerHTML = "";
        frmAlert.submit.value = "";
    }
}

async function addSize(size){
    let query = await new sizeDAO().addSize(size);
    let divFrm = document.querySelector("#frmSizes");
    let frmSizes = document.querySelector("#frmSizes form");
    let message = document.querySelector("#message");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Talle agregado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmSizes.reset();
            message.innerHTML = "";
            showSizes();
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al agregar el talle, ${query.message}`;
    }
}

async function deleteSize(size){
    let query = await new sizeDAO().deleteSize(size);
    let confirmationAlert = document.querySelector("#confirmationAlert");

    if (query.status) {
        if (confirmationAlert.classList.contains("error")) {
            confirmationAlert.classList.remove("error");
            confirmationAlert.classList.add("confirmation");
        }
        confirmationAlert.innerHTML = "Talle eliminado con éxito";
        showSizes();
    } else {
        if (confirmationAlert.classList.contains("confirmation")) {
            confirmationAlert.classList.add("error");
            confirmationAlert.classList.remove("confirmation");
        }
        confirmationAlert.innerHTML = `Error al eliminar el talle, ${query.message}`;
    }
}

async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}