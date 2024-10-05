import SessionDAO from "../../../dao/sessionDAO.js";

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin === 1) {
            window.location.href = "../indexAdmin/indexAdmin.html";
        } else {
            window.location.href = "../indexUsuario/indexUsuario.html";
        }
    }
    addEvents();
}

function addEvents() {
    let formElement = document.querySelector("#frmLogIn");
    formElement.onsubmit = (e) => {
        e.preventDefault();
        let email = formElement.email.value;
        let password = formElement.password.value;

        logIn(email, password);
    }
}

async function logIn(email, password) {
    let loggedQuery = await new SessionDAO().logIn(email, password);
    if (loggedQuery.status) {
        if (loggedQuery.data.isVerified) {
            if (loggedQuery.data.isAdmin) {
                window.location.href = "../indexAdmin/indexAdmin.html";
            } else {
                window.location.href = "../indexUsuario/indexUsuario.html";
            }
        }else{
            window.location.href = "../verificarCuenta/verificarCuenta.html";
        }

    } else {
        alert(loggedQuery.message);
    }
}
