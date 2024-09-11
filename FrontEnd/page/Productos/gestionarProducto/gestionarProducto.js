import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDao.js";
import SizeDAO from "../../../dao/sizeDAO.js";

let action = null; 
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
    loadData();
    addEvents();
    insertSize();
}

async function loadData() {
    let query = await new ProductDAO().getProducts();
    if (query.estado) {
        showProducts(query.datos);
    }
}

async function showProducts(products) {
    let tbodyElement = document.querySelector("#productData");
    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        console.log(JSON.stringify(product));
        tbodyElement.innerHTML += `
        <tr>
             <td>${product.nombre}</td>
             <td>${product.descripcion}</td>
             <td>${product.precio}</td>
             <td>${product.color}</td>
             <td class="tdImg"><img class="imgTd" src="../../../../backEnd/imgs/${product.idProducto}.${product.extension}"></td>
             <td><div id="actionsTd"><button class="btnTd" onclick="loadInputs('${JSON.stringify(product)}')"><img src="../../../assets/modifyIcon.png"></button>
             <button class="btnTd" onclick="deleteProduct('${product.idProducto}')"><img src="../../../assets/deleteIcon.png"></button></div></td>
        </tr>`;

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

    addBtn.onclick = () => {
        divFrm.classList.remove("frmDesactivado");
        divFrm.classList.add("frmActivado");
        action = "add";
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
        logOut();

    }

    frmProduct.onsubmit = (e) => {
        e.preventDefault()
        let idProduct = id;
        let precio = frmProduct.precio.value;
        let descripcion = frmProduct.descripcion.value;
        let imagen = frmProduct.imagen.files[0];
        let nombre = frmProduct.nombre.value;
        let color = frmProduct.color.value;

        if(action == "add"){
            addProduct(precio, descripcion, imagen, nombre, color);
        }else if(action == "modify"){
            modifyProduct(idProduct, precio, descripcion, imagen, nombre, color);
        }
        
    }
}

async function insertSize() {
    let requestSizes = await new SizeDAO().getSizes();
    if (requestSizes.estado) {
        let sizes = requestSizes.datos;
        let inputSize = document.querySelector("#inputSize");
        inputSize.innerHTML = "";
        sizes.forEach((size) => {
            inputSize.innerHTML += `
                <option value="${size.tipo}">${size.tipo}</option>
            `;
        })

    }
    console.log(requestSizes);
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
        loadData();
    } else {
        alert("Error");
    }
}

function loadInputs(product) {
    let parsedProduct = JSON.parse(product);
    let idProducto = parsedProduct.idProducto;
    let precio = parsedProduct.precio;
    let descripcion = parsedProduct.descripcion;
    let imagen = parsedProduct.extension;
    let nombre = parsedProduct.nombre;
    let color = parsedProduct.color;
    let divFrm = document.querySelector("#frmProducto");
    let frmProduct = document.querySelector("#frmProducto form");
    let imgPreview = document.querySelector("#imgPreview");

    divFrm.classList.remove("frmDesactivado");
    divFrm.classList.add("frmActivado");

    frmProduct.precio.value = precio;
    frmProduct.descripcion.value = descripcion;
    imgPreview.src = `../../../../BackEnd/imgs/${idProducto}.${imagen}`;
    frmProduct.nombre.value = nombre;
    frmProduct.color.value = color;
    id = idProducto;
    action = "modify";
}

async function modifyProduct(idProduct, precio, descripcion, imagen, nombre, color){
    let query = await new ProductDAO().modifyProduct(idProduct, precio, descripcion, imagen, nombre, color);
    let frmProduct = document.querySelector("#frmProducto form");
    let divFrm = document.querySelector("#frmProducto");

    if (query.estado) {
        alert("Modificado con éxito");
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmProduct.reset();
        imgPreview.src = "../../../assets/noImage.png";
        loadData();
    } else {
        alert("Error");
    }
}

async function deleteProduct(idProducto){
    let query = await new ProductDAO().deleteProduct(idProducto);

    if(query.estado){
        alert("Producto eliminado");
        loadData();
    }else{
        alert("Error");
    }
}
