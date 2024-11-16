import SessionDAO from "../../../dao/sessionDAO.js";
import InquiryDAO from "../../../dao/InquiryDAO.js";

let inquirySelected = null;
let allInquiry = [];
let filter = null;

window.onload = async () => {
    let queryResponse = await new InquiryDAO().getInquiry();
    allInquiry = queryResponse.data;
    let query = await new SessionDAO().getSession();
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");

    if (query.status) {
        registerBtn.classList.remove("userUnlogged");
        logInBtn.classList.remove("userUnlogged");
        userBtn.classList.add("userLogged");
        logOutBtn.classList.add("userLogged");

    } else {
        registerBtn.classList.add("userUnlogged");
        logInBtn.classList.add("userUnlogged");
        userBtn.classList.remove("userLogged");
        logOutBtn.classList.remove("userLogged");
    }
    showInquiry(allInquiry);
    addEventModal();
    addFilterEvent();
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

function addFilterEvent(){
    let searchInput = document.querySelector("#searchInput");

    searchInput.onkeyup = () =>{
        filter = searchInput.value;
        searchInquirys(filter);
    }
}

function searchInquirys(filter){
    let filteredInquirys = allProducts.filter(inquiry => (inquiry.title+"").includes(filter));
    showInquiry(filteredInquirys);
}   


