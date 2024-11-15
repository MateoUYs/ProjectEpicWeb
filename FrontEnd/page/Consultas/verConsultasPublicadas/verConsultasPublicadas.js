import SessionDAO from "../../../dao/sessionDAO.js";
import InquiryDAO from "../../../dao/InquiryDAO.js";

let inquirySelected = null;

window.onload = async () => {
    let queryResponse = await new InquiryDAO().getInquiry();
    console.log(queryResponse);
    let allInquiry = queryResponse.data;
    showInquiry(allInquiry);
    addEventModal();

}


async function showInquiry(inquirys) {
    let tbodyElement = document.querySelector("#inquiryData");
    tbodyElement.innerHTML = "";
    inquirys.forEach((inquiry) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
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
        message.innerHTML += `<p>Pregunta usuario:</p><p>${msj.content}</p>`;
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


