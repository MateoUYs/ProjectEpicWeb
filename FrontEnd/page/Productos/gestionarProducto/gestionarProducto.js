import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDAO.js";
import SizeDAO from "../../../dao/sizeDAO.js";

let id = null;
let filter = "";
let allProducts = [];

window.onload = async () => {
    let queryResponse = await new ProductDAO().getProducts();
    allProducts = queryResponse.data;
    let query = await new SessionDAO().getSession();
    if (query.status) {
        if (query.data.isAdmin == 0) {
            window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
        }
    } else {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }
    showProducts(allProducts);
    addEvents();
    insertSize();
}

async function showProducts(products) {
    let tbodyElement = document.querySelector("#productData");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let body = document.querySelector("body");

    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        let tr = document.createElement("tr");
        let sizeText = "";
        product.size.forEach((size, index) => {

            if (index == product.size.length - 1) {
                sizeText += ` ${size.sizeType}`;
            } else {
                sizeText += ` ${size.sizeType} , `;
            }
        });
        tr.innerHTML += `
             <td>${product.productId}</td>
             <td>${product.name}</td>
             <td>${product.description}</td>
             <td>${product.price}</td>
             <td><div style="background-color: ${product.color}; color: ${product.color}"}>..</div></td>
             <td>${sizeText}</td>
             <td class="tdImg"><img class="imgTd" src="../../../../backEnd/imgs/${product.productId}.${product.extension}"></td>
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
            divAlert.classList.add("alertActivated");
            divAlert.classList.remove("alertDeactivated");
            body.classList.add("modalOpen");
            pAlertTitle.innerHTML = "Eliminar Producto";
            alertQuestion.innerHTML = "¿Estás seguro de que deseas eliminar el producto? Si eliminas el producto, no se podrá deshacer los cambios";
            frmAlert.submit.value = "Eliminar Producto";
            frmAlert.setAttribute("dataProductId", product.productId);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let body = document.querySelector("body");
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#productFrm");
    let cancelarBtn = document.querySelector("#cancelBtn");
    let frmProduct = document.querySelector("#productFrm form");
    let inputFile = document.querySelector("#imagenInput");
    let imgPreview = document.querySelector("#imgPreview");
    let consultationBtn = document.querySelector("#inquiryBtn");
    let listConsultation = document.querySelector("#inquiryList");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let pTitle = document.querySelector("#title");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let message = document.querySelector("#message");
    let confirmationAlert = document.querySelector("#confirmationAlert");
    let menuBtn = document.querySelector("#menuBtn");
    let navDiv = document.querySelector("#navDiv");
    let nav = document.querySelector("nav");
    let searchInput = document.querySelector("#searchInput");


    addBtn.onclick = () => {
        divFrm.classList.remove("frmDeactivated");
        divFrm.classList.add("frmActivated");
        body.classList.add("modalOpen");
        pTitle.innerHTML = "Agregando Producto";
        frmProduct.submit.value = "Agregar";
    }

    cancelarBtn.onclick = () => {
        divFrm.classList.add("frmDeactivated");
        divFrm.classList.remove("frmActivated");
        body.classList.remove("modalOpen");
        frmProduct.reset();
        imgPreview.src = "../../../assets/noImage.png";
        message.innerHTML = "";
        oldSizes = "";
    }

    inputFile.onchange = () => {
        let rutaTemporal = URL.createObjectURL(inputFile.files[0]);
        imgPreview.src = rutaTemporal;
    }

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
        body.classList.add("modalOpen");
        pAlertTitle.innerHTML = "Cerrar Sesión";
        alertQuestion.innerHTML = "¿Estás seguro de que deseas cerrar sesión? Si cierras sesión, serás redirigido al Inicio de Sesión";
        frmAlert.submit.value = "Cerrar Sesión";
    }

    frmProduct.onsubmit = (e) => {
        e.preventDefault()
        let productId = id;
        let price = frmProduct.price.value;
        let description = frmProduct.description.value;
        let image = frmProduct.image.files[0];
        let name = frmProduct.name.value;
        let color = frmProduct.color.value;
        let size = Array.from(frmProduct.querySelectorAll("input[name='size']:checked")).map(input => input.value);


        if (frmProduct.submit.value == "Agregar") {
            addProduct(price, description, image, name, color, size);

        } else if (frmProduct.submit.value == "Modificar") {
            modifyProduct(productId, price, description, image, name, color, size);
        }

    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async () => {
                confirmationAlert.innerHTML = "";
                logOut();
            }, 500);
        } else if (frmAlert.submit.value == "Eliminar Producto") {
            let idProduct = frmAlert.getAttribute("dataProductId");
            deleteProduct(idProduct);
            setTimeout(async () => {
                divAlert.classList.add("alertDeactivated");
                divAlert.classList.remove("alertActivated");
                confirmationAlert.innerHTML = "";
            }, 500);
        }
    }

    alertCancel.onclick = () => {
        divAlert.classList.add("alertDeactivated");
        divAlert.classList.remove("alertActivated");
        body.classList.remove("modalOpen");
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

    searchInput.onkeyup = () =>{
        filter = searchInput.value;
        console.log(filter);
        searchProducts(filter);
    }
}

async function insertSize() {
    let requestSizes = await new SizeDAO().getSizes();
    if (requestSizes.status) {
        let sizes = requestSizes.data;
        let inputSize = document.querySelector("#inputSize");
        inputSize.innerHTML = "";
        sizes.forEach((size) => {
            inputSize.innerHTML += `
                <div class="check"><input class="inputCheck" type="checkbox" name="size" value="${size.type}"><label class="checkText">${size.type}</label></div>
            `;
        })
    }
}

async function logOut() {
    await new SessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}

async function addProduct(precio, descripcion, imagen, nombre, color, size) {
    let query = await new ProductDAO().addProducts(precio, descripcion, imagen, nombre, color, size);
    let frmProduct = document.querySelector("#productFrm form");
    let divFrm = document.querySelector("#productFrm");
    let message = document.querySelector("#message");
    let body = document.querySelector("body");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        let queryProducts = await new ProductDAO().getProducts();
        let products = queryProducts.data;
        message.innerHTML = "Producto Agregado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmProduct.reset();
            imgPreview.src = "../../../assets/noImage.png";
            message.innerHTML = "";
            showProducts(products);
            body.classList.remove("modalOpen");
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al agregar el producto ${query.message}`;
    }
}

function loadInputs(product) {
    let productId = product.productId;
    let price = product.price;
    let description = product.description;
    let image = product.extension;
    let name = product.name;
    let color = product.color;
    let divFrm = document.querySelector("#productFrm");
    let frmProduct = document.querySelector("#productFrm form");
    let imgPreview = document.querySelector("#imgPreview");
    let pTitle = document.querySelector("#title");
    let body = document.querySelector("body");

    body.classList.add("modalOpen");
    divFrm.classList.remove("frmDeactivated");
    divFrm.classList.add("frmActivated");

    pTitle.innerHTML = "Modificando Producto";
    frmProduct.submit.value = "Modificar";
    frmProduct.price.value = price;
    frmProduct.description.value = description;
    imgPreview.src = `../../../../BackEnd/imgs/${productId}.${image}`;
    frmProduct.name.value = name;
    frmProduct.color.value = color;
    id = productId;
    setProductSize(product.size);
}

async function modifyProduct(idProduct, precio, descripcion, imagen, nombre, color, sizes) {
    let query = await new ProductDAO().modifyProduct(idProduct, precio, descripcion, imagen, nombre, color, sizes);
    let frmProduct = document.querySelector("#productFrm form");
    let divFrm = document.querySelector("#productFrm");
    let message = document.querySelector("#message");
    let body = document.querySelector("body");

    if (query.status) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Producto Modificado con éxito";
        let queryProducts = await new ProductDAO().getProducts();
        let products = queryProducts.data;
        setTimeout(async () => {
            divFrm.classList.add("frmDeactivated");
            divFrm.classList.remove("frmActivated");
            frmProduct.reset();
            imgPreview.src = "../../../assets/noImage.png";
            message.innerHTML = "";
            body.classList.remove("modalOpen");
            showProducts(products);
        }, 500);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al modificar el producto ${query.mensaje}`;
    }
}

async function deleteProduct(idProducto) {
    let query = await new ProductDAO().deleteProduct(idProducto);
    let confirmationAlert = document.querySelector("#confirmationAlert");
    let body = document.querySelector("body");

    if (query.status) {
        if (confirmationAlert.classList.contains("error")) {
            confirmationAlert.classList.remove("error");
            confirmationAlert.classList.add("confirmation");
        }
        let queryProducts = await new ProductDAO().getProducts();
        let products = queryProducts.data;
        confirmationAlert.innerHTML = "Producto Eliminado con éxito";
        body.classList.remove("modalOpen");
        showProducts(products);
    } else {
        if (confirmationAlert.classList.contains("confirmation")) {
            confirmationAlert.classList.add("error");
            confirmationAlert.classList.remove("confirmation");
        }
        confirmationAlert.innerHTML = `Error al eliminar el producto ${query.mensaje}`;
    }
}

async function setProductSize(sizes) {
    let frmProduct = document.querySelector("#productFrm form");
    Array.from(frmProduct.querySelectorAll("input[name='size']")).forEach((input) => {
        if (sizes.some(sp => sp.sizeType == input.value)) {
            input.checked = true;
        }
    });
}

function searchProducts(){
    let filteredProducts = allProducts.filter(product => (product.productId + product.name+"").includes(filter));
    showProducts(filteredProducts);
}
