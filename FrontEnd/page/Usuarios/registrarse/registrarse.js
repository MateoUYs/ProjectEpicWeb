import UserDAO from "../../../dao/userDao.js";
import SessionDAO from "../../../dao/sessionDAO.js";

window.onload = () => {
    addEvents(); 
}

function addEvents() {
    let formElement = document.querySelector("#frmCreate"); 
    
    formElement.onsubmit = async (e) => {
        e.preventDefault(); 

        let ci = formElement.ci.value;
        let email = formElement.email.value;
        let userName = formElement.userName.value;
        let password = formElement.password.value;
        let phone = formElement.phoneNumber.value;

        addUser(ci, email, userName, password, phone);
    };
}

async function addUser(ci, email, userName, password, phone) {
    let query = await new UserDAO().addUser(ci, email, userName, password, phone);
    console.log(query);
    if (query.status) {
        await new SessionDAO().logIn(email, password);
        window.location.href = "../verificarCuenta/verificarCuenta.html";
    } else {
        alert(`Error al registrar: ${query.message}`);
    }
}
