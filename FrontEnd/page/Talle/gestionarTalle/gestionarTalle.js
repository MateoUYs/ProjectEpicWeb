import SessionDAO from "../../../dao/sessionDAO.js";
import sizeDAO from "../../../dao/sizeDAO.js";

let sizeType = null;

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    if (query.estado) {
        if (query.datos.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showSizes();
    addEvents();
}

async function showSizes() {
    let query = await new sizeDAO().getSizes();
    let sizes = query.datos;
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
             <td>${size.tipo}</td>
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
            divAlert.classList.add("alertActivado");
            divAlert.classList.remove("alertDesactivado");
            pAlertTitle.innerHTML = "Eliminar Talle";
            alertQuestion.innerHTML = "¿Estás seguro de que deseas eliminar el talle? Si eliminas el talle, no se podrá deshacer los cambios";
            frmAlert.submit.value = "Eliminar Talle";
            sizeType = size.tipo;
        }
        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#frmSizes");
    let cancelarBtn = document.querySelector("#btnCancelar");
    let frmSizes = document.querySelector("#frmSizes form");
    let consultationBtn = document.querySelector("#btnConsulta");
    let listConsultation = document.querySelector("#listaConsultas");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let pTitle = document.querySelector("#title");
    let divAlert = document.querySelector(".alertDesactivado");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = document.querySelector(".alertDesactivado form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let message = document.querySelector("#message");
    let confirmationAlert = document.querySelector("#confirmationAlert");

    addBtn.onclick = () => {
        divFrm.classList.remove("frmDesactivado");
        divFrm.classList.add("frmActivado");
        pTitle.innerHTML = "Agregando Producto";
        frmSizes.submit.value = "Agregar";
    }

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmSizes.reset();
        message.innerHTML = "";
    }

    consultationBtn.onclick = () => {
        if (listConsultation.classList.contains("desactivado")) {
            listConsultation.classList.add("activado");
            listConsultation.classList.remove("desactivado");
        } else {
            listConsultation.classList.remove("activado");
            listConsultation.classList.add("desactivado");
        }
    }

    homeBtn.onclick = () => {
        window.location.href = "../../Usuarios/indexAdmin/indexAdmin.html";
    }

    btnLogOut.onclick = () => {
        divAlert.classList.add("alertActivado");
        divAlert.classList.remove("alertDesactivado");
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
                divAlert.classList.add("alertDesactivado");
                divAlert.classList.remove("alertActivado");
                confirmationAlert.innerHTML = "";
            }, 500);
        }
    }

    alertCancel.onclick = () => {
        divAlert.classList.add("alertDesactivado");
        divAlert.classList.remove("alertActivado");
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

    if (query.estado) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Talle agregado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDesactivado");
            divFrm.classList.remove("frmActivado");
            frmSizes.reset();
            message.innerHTML = "";
            showSizes();
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al agregar el talle, ${query.mensaje}`;
    }
}

async function deleteSize(size){
    let query = await new sizeDAO().deleteSize(size);
    let confirmationAlert = document.querySelector("#confirmationAlert");

    if (query.estado) {
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
        confirmationAlert.innerHTML = `Error al eliminar el talle, ${query.mensaje}`;
    }
}