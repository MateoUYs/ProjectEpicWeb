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
    showInquiry(allInquiry);
    addEventModal();
    sumbitQuestion();
    sumbitPublicQuestion();
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