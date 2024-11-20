import SessionDAO from "../../../dao/sessionDAO.js";
import InquiryDAO from "../../../dao/InquiryDAO.js";

let inquirySelected = null;

window.onload = async () => {
    let queryResponse = await new InquiryDAO().getInquiry();
    console.log(queryResponse);
    let allInquiry = queryResponse.data;
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    if (localStorage.getItem("inquirySelected") !== null) {
        inquirySelected = JSON.parse(localStorage.getItem("inquirySelected"));
        loadMenssage();
        showModal(true);
        localStorage.removeItem("inquirySelected");
    }
    let inquiryResponse = await new InquiryDAO().getNewInquirys();
    let newInquirys = inquiryResponse.data;
    if (newInquirys.length === 0) {
        showInquiryMessage();
    } else {
        showInquirysList(newInquirys);
    }

    showInquiry(allInquiry);
    addEventModal();
    sumbitQuestion();
    sumbitPublicQuestion();
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


async function showInquiry(inquirys) {
    let tbodyElement = document.querySelector("#inquiryData");
    tbodyElement.innerHTML = "";
    inquirys.forEach((inquiry) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${inquiry.inquiryId}</td>
             <td>${inquiry.userName}</td>
             <td>${inquiry.title}</td>
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
            inquirySelected= inquiry;
           loadMenssage();
           showModal(true);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function loadMenssage(){
    let title = document.querySelector("#tituloContainer");
    let message = document.querySelector("#contenidoMensajeContainer");
    message.innerHTML = "";
    title.innerHTML = inquirySelected.title;
    inquirySelected.message.forEach((msj)=>{
        message.innerHTML += `<p>${msj.content}</p>`;
    });
}

function addEventModal(){
    let modal = document.querySelector("#modal");
    modal.onclick = (e) => {
        if (e.target === modal) {
          
            showModal(false); 
        }
    }
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
}

function showModal(status){
    if(status){
        modal.classList.add("show");
    }else{
        modal.classList.remove("show");
    }
}

function sumbitQuestion(){
 let btnContestar = document.querySelector("#btnContestar");
 let messageArea = document.querySelector("#contenidoMensaje");
 btnContestar.onclick = () => {
   let messageContent = messageArea.value;
   reponderPreguntaInquiry(inquirySelected, messageContent);
 }
}   

async function reponderPreguntaInquiry(inquiry, messageContent){
  let inquiryId = inquiry.inquiryId;
  let query = await new InquiryDAO().answerInquiry(inquiryId, messageContent);

}

function sumbitPublicQuestion(){
    let btnPublicar = document.querySelector("#btnPublicar");
    btnPublicar.onclick = () =>{
        publicarInquiry(inquirySelected);
    }
}

async function publicarInquiry(inquiry){
    let inquiryId = inquiry.inquiryId;
    let query = await new InquiryDAO().sumbitInquiry(inquiryId);
    console.log(query.status);
}

async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}