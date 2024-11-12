import SessionDAO from "../../../dao/sessionDAO.js";
import InquiryDAO from "../../../dao/InquiryDAO.js";

window.onload = async () => {
    let queryResponse = await new InquiryDAO().getInquiry();
    allInquiry = queryResponse.data;
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showInquiry(allInquiry);
    addEvents();

    async function showInquiry(inquirys) {
        let tbodyElement = document.querySelector("#inquiryData");
        tbodyElement.innerHTML = "";
        inquirys.forEach((inquiry) => {
            let tr = document.createElement("tr");
            tr.innerHTML += `
                 <td>${inquiry.inquiryID}</td>
                 <td>${inquiry.userName}</td>
                 <td>${inquiry.title}</td>
                 <td>${inquiry.messageContent}</td>
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
                loadInputs(inquiry);
                actualUserCi = sale.userCi;
            }
    
            div.id = "actionsTd";
            tbodyElement.appendChild(tr);
    
        });
    }
    
}
