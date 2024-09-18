import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDao.js";
import SizeDAO from "../../../dao/sizeDAO.js";

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
    showProducts();
    addEvents();
    insertSize();
}

async function showProducts() {
    let query = await new ProductDAO().getProducts();
    let products = query.datos;
    let tbodyElement = document.querySelector("#productData");
    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        console.log(JSON.stringify(product));
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${product.nombre}</td>
             <td>${product.descripcion}</td>
             <td>${product.precio}</td>
             <td><div style="background-color: ${product.color}; color: ${product.color}"}>..</div></td>
             <td class="tdImg"><img class="imgTd" src="../../../../backEnd/imgs/${product.idProducto}.${product.extension}"></td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        td.appendChild(div);
        div.appendChild(btn);
        tr.appendChild(td);


        btn.className = "btnTd";
        btn.innerHTML = `<img class="modifyImg" src="../../../assets/modifyIcon.png">`;
        btn.onclick = () => {
            loadInputs(product);
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/deleteIcon.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            deleteProduct(product.idProducto);
        }


        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#frmProducto");
    let cancelarBtn = document.querySelector(".cancelar-btn");
    let frmProduct = document.querySelector("#frmProducto form");
    let inputFile = document.querySelector("#imagenInput");
    let imgPreview = document.querySelector("#imgPreview");
    let consultationBtn = document.querySelector("#btnConsulta");
    let listConsultation = document.querySelector("#listaConsultas");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let pTitle = document.querySelector("#title");
    let divAlert = document.querySelector(".alertDesactivado");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = document.querySelector(".alertDesactivado form");

    addBtn.onclick = () => {
        divFrm.classList.remove("frmDesactivado");
        divFrm.classList.add("frmActivado");
        pTitle.innerHTML = "Agregando Producto";
        frmProduct.submit.value = "Agregar";
    }

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmProduct.reset();
        imgPreview.src = "../../../assets/noImage.png";
    }

    inputFile.onchange = () => {
        let rutaTemporal = URL.createObjectURL(inputFile.files[0]);
        imgPreview.src = rutaTemporal;
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
            showProducts();
        } else if (frmProduct.submit.value == "Modificar") {
            modifyProduct(idProduct, precio, descripcion, imagen, nombre, color);
            showProducts();
        }

    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async() => {
                logOut();
            }, 3000);
        } else if (frmAlert.submit.value == "Eliminar Producto") {

        }
    }
}

async function insertSize() {
    let requestSizes = await new SizeDAO().getSizes();
    if (requestSizes.estado) {
        let sizes = requestSizes.datos;
        let inputSize = document.querySelector("#inputSize");
        inputSize.innerHTML = "";
        inputSize.innerHTML += `<option value="" disabled selected>Selecciona el talle del producto</option>`;
        sizes.forEach((size) => {
            inputSize.innerHTML += `
                <option value="${size.tipo}">${size.tipo}</option>
            `;
        })
    }
}

async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}

async function addProduct(precio, descripcion, imagen, nombre, color) {
    let query = await new ProductDAO().addProducts(precio, descripcion, imagen, nombre, color);
    let frmProduct = document.querySelector("#frmProducto form");
    let divFrm = document.querySelector("#frmProducto");


    if (query.estado) {
        alert("Agregado con éxito");
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmProduct.reset();
        imgPreview.src = "../../../assets/noImage.png";
        showProducts();
    } else {
        alert("Error");
    }
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

async function modifyProduct(idProduct, precio, descripcion, imagen, nombre, color) {
    let query = await new ProductDAO().modifyProduct(idProduct, precio, descripcion, imagen, nombre, color);
    let frmProduct = document.querySelector("#frmProducto form");
    let divFrm = document.querySelector("#frmProducto");

    if (query.estado) {
        alert("Modificado con éxito");
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmProduct.reset();
        imgPreview.src = "../../../assets/noImage.png";
        showProducts();
    } else {
        alert("Error");
    }
}

async function deleteProduct(idProducto) {
    console.log(idProducto);
    let query = await new ProductDAO().deleteProduct(idProducto);

    if (query.estado) {
        alert("Producto eliminado");
        showProducts();
    } else {
        alert("Error");
    }
}
