import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDao.js";

window.onload = async () => {
    let query = await new SessionDAO().getSession();
    if (query.estado) {
        if (query.datos.isAdmin == 1) {
        } else {
            window.location.href = "../IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../iniciarSesion/iniciarSesion.html";
    }
    loadData();
    addProductEvent();
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
    let divFrm = document.querySelector("#frmDesactivado");
    let frmProduct = document.querySelector();

    addBtn.onclick = () => {
   
            divFrm.classList.remove("frmDesactivado");
            divFrm.classList.add("frmActivado");
        
    }
}