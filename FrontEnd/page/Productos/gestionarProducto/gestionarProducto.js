import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDao.js";
import SizeDAO from "../../../dao/sizeDAO.js";

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    if (query.estado) {
        if (query.datos.isAdmin == 1) {
        } else {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    loadData();
    addProductEvent();
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
        let btnModify = document.createElement("button")
        let btnDelete = document.createElement("button");
        let productImg = document.createElement("img");
        let deleteImg = document.createElement("img");
        btnModify.className = "btnModify";
        btnDelete.className = "btnDelete";
        productImg.className = "productImg";
        deleteImg.className = "deleteImg";
        deleteImg.src = "../../../assets/deleteIcon.png";
        productImg.src = `../../../../backEnd/imgs/${product.idProducto}${product.extension}`;
        btnDelete.appendChild(deleteImg);
        tbodyElement.innerHTML += `
        <tr>
             <td>${product.nombre}</td>
             <td>${product.descripcion}</td>
             <td>${product.precio}</td>
             <td>${product.color}</td>
             <td>${productImg}</td>
             <td>${btnModify}</td>      
             <td>${btnDelete}</td>       
        </tr>`;
    });
}

function addProductEvent() {
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#frmProducto");
    let cancelarBtn = document.querySelector(".cancelar-btn");
    let frmProduct = document.querySelector("#frmProducto form");

    addBtn.onclick = () => {
        divFrm.classList.remove("frmDesactivado");
        divFrm.classList.add("frmActivado");
    }

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDesactivado");
        divFrm.classList.remove("frmActivado");
        frmProduct.reset();
    }

    let inputFile = document.querySelector("#imagenInput");
    let imgPreview = document.querySelector("#imgPreview");
    inputFile.onchange = ()=>{
        let rutaTemporal = URL.createObjectURL(inputFile.files[0]);
        imgPreview.src = rutaTemporal;
    }
}

async function insertSize(){
    let requestSizes = await new SizeDAO().getSizes();
    if(requestSizes.estado){
        let sizes = requestSizes.datos;
        let inputSize = document.querySelector("#inputSize");
        inputSize.innerHTML="";
        sizes.forEach((size)=>{
            inputSize.innerHTML += `
                <option value="${size.tipo}">${size.tipo}</option>
            `;
        })

    }
    console.log(requestSizes);
}