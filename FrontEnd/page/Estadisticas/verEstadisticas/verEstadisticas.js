import SessionDAO from "../../../dao/sessionDAO.js";
import statsDAO from "../../../dao/statsDAO.js";

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    let queryStats = await new statsDAO().getBestSellings();
    let stats = queryStats.data;
    let type = "sale";
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showSats(stats, type)
    addEvents();
}

async function showSats(stats, type) {
    console.log(stats);
    let theadElement = document.querySelector("#columnData");
    let tbodyElement = document.querySelector("#productData");

    let trHead = document.createElement("tr");
    theadElement.innerHTML = "";
    tbodyElement.innerHTML = "";
    if (type == "sale") {
        trHead.innerHTML += `
         <th>Nombre Producto</th>
         <th>Cantidad de veces Vendido</th>
    `;
    } else if (type == "favorite") {
        trHead.innerHTML += `
        <th>Nombre Producto</th>
        <th>Cantidad de veces Guardado</th>
   `;
    }
    stats.forEach((product) => {

        let trBody = document.createElement("tr");
        if (type == "sale") {
            trBody.innerHTML += `
             <td>${product.name}</td>
             <td>${product.saleQuantity}</td>
        `;
        } else if (type == "favorite") {
            trBody.innerHTML += `
            <td>${product.name}</td>
            <td>${product.timesFavorited}</td>
       `;
        }

        theadElement.appendChild(trHead);
        tbodyElement.appendChild(trBody);
    });
}

function addEvents() {
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
    let selectView = document.querySelector("#selectView");


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

    selectView.onchange = async () => {
        if (selectView.value == "bestSales") {
            let queryStats = await new statsDAO().getBestSellings();
            let type = "sale";
            showSats(queryStats.data, type);
        } else if (selectView.value == "lessSales") {
            let queryStats = await new statsDAO().getLeastSold();
            let type = "sale";
            showSats(queryStats.data, type);
        } else if (selectView.value == "bestFavorites") {
            let queryStats = await new statsDAO().getMostSaved();
            let type = "favorite";
            showSats(queryStats.data, type);
        }
    }
}

