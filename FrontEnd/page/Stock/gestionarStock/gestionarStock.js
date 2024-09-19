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
    let divAlert = document.querySelector(".alertDesactivado");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = document.querySelector(".alertDesactivado form");
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
            loadInputs(product);
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/updateStock.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let divFrm = document.querySelector("#frmProducto");
    let cancelarBtn = document.querySelector("#btnCancelar");
    let frmProduct = document.querySelector("#frmProducto form");
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
    console.log(frmAlert);

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmProduct.reset();
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

    frmProduct.onsubmit = (e) => {
        e.preventDefault()
        let idProduct = id;
        let precio = frmProduct.precio.value;
        let descripcion = frmProduct.descripcion.value;
        let imagen = frmProduct.imagen.files[0];
        let nombre = frmProduct.nombre.value;
        let color = frmProduct.color.value;

        if (frmProduct.submit.value == "Agregar") {
            addProduct(precio, descripcion, imagen, nombre, color);

        } else if (frmProduct.submit.value == "Modificar") {
            modifyProduct(idProduct, precio, descripcion, imagen, nombre, color);
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



function loadInputs(product) {
    let idProducto = product.idProducto;
    let precio = product.precio;
    let descripcion = product.descripcion;
    let imagen = product.extension;
    let nombre = product.nombre;
    let color = product.color;
    let divFrm = document.querySelector("#frmProducto");
    let frmProduct = document.querySelector("#frmProducto form");
    let imgPreview = document.querySelector("#imgPreview");
    let pTitle = document.querySelector("#title");


    divFrm.classList.remove("frmDesactivado");
    divFrm.classList.add("frmActivado");

    pTitle.innerHTML = "Modificando Producto";
    frmProduct.submit.value = "Modificar";
    frmProduct.precio.value = precio;
    frmProduct.descripcion.value = descripcion;
    imgPreview.src = `../../../../BackEnd/imgs/${idProducto}.${imagen}`;
    frmProduct.nombre.value = nombre;
    frmProduct.color.value = color;
    id = idProducto;
}



