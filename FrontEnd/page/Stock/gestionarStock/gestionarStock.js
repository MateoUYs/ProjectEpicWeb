import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDao.js";

let id = null;

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    if (query.estado) {
        if (query.datos.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showStock();
    addEvents();
}

async function showStock() {
    let query = await new ProductDAO().getStock();
    let products = query.datos;
    let tbodyElement = document.querySelector("#productData");
    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        console.log(JSON.stringify(product));
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${product.idProducto}</td>
             <td>${product.nombre}</td>
             <td>${product.stock}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        td.appendChild(div);
        div.appendChild(btn);
        tr.appendChild(td);


        btn.className = "btnTd";
        btn.innerHTML = `<img src="../../../assets/addStock.png">`;
        btn.onclick = () => {
            loadInfo(product, "Agregar");
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/updateStock.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            loadInputs(product, "Actualizar");
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let divFrm = document.querySelector("#frmStock");
    let cancelarBtn = document.querySelector("#btnCancelar");
    let frmStock = document.querySelector("#frmStock form");
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


    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmStock.reset();
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

    frmStock.onsubmit = (e) => {
        e.preventDefault()
        let idProduct = id;
        let stock = frmStock.stock.value;

        if (frmStock.submit.value == "Agregar") {
            addStock();

        } else if (frmStock.submit.value == "Actualizar") {
            updateStock(idProduct);
            setTimeout(async () => {

            }, 3000);
        }

    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async () => {
                confirmationAlert.innerHTML = "";
                logOut();
            }, 3000);
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



async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}



function loadInputs(product, use) {
    let nombre = product.nombre;
    let divFrm = document.querySelector("#frmStock");
    let frmStock = document.querySelector("#frmStock form");
    let pTitle = document.querySelector("#title");
    let pStock = document.querySelector("#stockActual");


    divFrm.classList.remove("frmDesactivado");
    divFrm.classList.add("frmActivado");

    frmStock.nombre.value = nombre;
    id = idProducto;

    if(use == "Agregar"){
        pTitle.innerHTML = "Agregando Stock";
        frmStock.submit.value = "Agregar";
        pStock.innerHTML = `Stock Actual: ${product.stock}`;
    }else if (use == "Actualizar"){
        pTitle.innerHTML = "Actualizando Stock";
        frmStock.submit.value = "Actualizar";
    }
}



