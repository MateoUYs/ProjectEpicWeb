import SessionDAO from "../../../dao/sessionDAO.js";
import ProductDAO from "../../../dao/productDao.js";
import SizeDAO from "../../../dao/sizeDAO.js";

let id = null;
let oldSizes = [];

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
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    tbodyElement.innerHTML = "";
    products.forEach((product) => {
        console.log(JSON.stringify(product));
        let tr = document.createElement("tr");
        let sizeText = "";
        product.size.forEach((size,index) =>{
           
            if(index == product.size.length - 1){
                sizeText += ` ${size.tipoTalle}`;
            }else{
                sizeText += ` ${size.tipoTalle} , `;
            }
        });
        tr.innerHTML += `
             <td>${product.idProducto}</td>
             <td>${product.nombre}</td>
             <td>${product.descripcion}</td>
             <td>${product.precio}</td>
             <td><div style="background-color: ${product.color}; color: ${product.color}"}>..</div></td>
             <td>${sizeText}</td>
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
            divAlert.classList.add("alertActivado");
            divAlert.classList.remove("alertDesactivado");
            pAlertTitle.innerHTML = "Eliminar Producto";
            alertQuestion.innerHTML = "¿Estás seguro de que deseas eliminar el producto? Si eliminas el producto, no se podrá deshacer los cambios";
            frmAlert.submit.value = "Eliminar Producto";
            frmAlert.setAttribute("dataProductId", product.idProducto);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function addEvents() {
    let addBtn = document.querySelector("#addBtn");
    let divFrm = document.querySelector("#frmProducto");
    let cancelarBtn = document.querySelector("#btnCancelar");
    let frmProduct = document.querySelector("#frmProducto form");
    let inputFile = document.querySelector("#imagenInput");
    let imgPreview = document.querySelector("#imgPreview");
    let consultationBtn = document.querySelector("#btnConsulta");
    let listConsultation = document.querySelector("#listaConsultas");
    let homeBtn = document.querySelector("#homeBtn");
    let btnLogOut = document.querySelector("#btnLogOut");
    let pTitle = document.querySelector("#title");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = document.querySelector(".alertDesactivado form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let message = document.querySelector("#message");
    let confirmationAlert = document.querySelector("#confirmationAlert");


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
        message.innerHTML = "";
        oldSizes = "";
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
        let size = Array.from(frmProduct.querySelectorAll("input[name='talle']:checked")).map(input => input.value);
        

        if (frmProduct.submit.value == "Agregar") {
            addProduct(precio, descripcion, imagen, nombre, color, size);

        } else if (frmProduct.submit.value == "Modificar") {
            modifyProduct(idProduct, precio, descripcion, imagen, nombre, color, size);
        }

    }

    frmAlert.onsubmit = (e) => {
        e.preventDefault();
        if (frmAlert.submit.value == "Cerrar Sesión") {
            setTimeout(async () => {
                confirmationAlert.innerHTML = "";
                logOut();
            }, 3000);
        } else if (frmAlert.submit.value == "Eliminar Producto") {
            let idProduct = frmAlert.getAttribute("dataProductId");
            deleteProduct(idProduct);
            setTimeout(async () => {
                divAlert.classList.add("alertDesactivado");
                divAlert.classList.remove("alertActivado");
                confirmationAlert.innerHTML = "";
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

async function insertSize() {
    let requestSizes = await new SizeDAO().getSizes();
    if (requestSizes.estado) {
        let sizes = requestSizes.datos;
        let inputSize = document.querySelector("#inputSize");
        inputSize.innerHTML = "";
        sizes.forEach((size) => {
            inputSize.innerHTML += `
                <div class="check"><input class="inputCheck" type="checkbox" name="talle" value="${size.tipo}"><label class="checkText">${size.tipo}</label></div>
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
    let frmProduct = document.querySelector("#frmProducto form");
    let divFrm = document.querySelector("#frmProducto");
    let message = document.querySelector("#message");

    if (query.estado) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Producto Agregado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDesactivado");
            divFrm.classList.remove("frmActivado");
            frmProduct.reset();
            imgPreview.src = "../../../assets/noImage.png";
            message.innerHTML = "";
            showProducts();
        }, 3000);
    } else {
        if (message.classList.contains("confirmation")) {
            message.classList.add("error");
            message.classList.remove("confirmation");
        }
        message.innerHTML = `Error al agregar el producto ${query.mensaje}`;
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
    setProductSize(product.size);
}

async function modifyProduct(idProduct, precio, descripcion, imagen, nombre, color, sizes) {
    let query = await new ProductDAO().modifyProduct(idProduct, precio, descripcion, imagen, nombre, color, sizes);
    let frmProduct = document.querySelector("#frmProducto form");
    let divFrm = document.querySelector("#frmProducto");
    let message = document.querySelector("#message");

    if (query.estado) {
        if (message.classList.contains("error")) {
            message.classList.remove("error");
            message.classList.add("confirmation");
        }
        message.innerHTML = "Producto Modificado con éxito";
        setTimeout(async () => {
            divFrm.classList.add("frmDesactivado");
            divFrm.classList.remove("frmActivado");
            frmProduct.reset();
            imgPreview.src = "../../../assets/noImage.png";
            message.innerHTML = "";
            oldSizes = "";
            showProducts();
        }, 3000);
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

    if (query.estado) {
        if (confirmationAlert.classList.contains("error")) {
            confirmationAlert.classList.remove("error");
            confirmationAlert.classList.add("confirmation");
        }
        confirmationAlert.innerHTML = "Producto Eliminado con éxito";
        showProducts();
    } else {
        if (confirmationAlert.classList.contains("confirmation")) {
            confirmationAlert.classList.add("error");
            confirmationAlert.classList.remove("confirmation");
        }
        confirmationAlert.innerHTML = `Error al eliminar el producto ${query.mensaje}`;
    }
}

async function setProductSize(sizes) {
    let frmProduct = document.querySelector("#frmProducto form");
    Array.from(frmProduct.querySelectorAll("input[name='talle']")).forEach((input)=>{
        if(sizes.some(sp => sp.tipoTalle == input.value)){
            let size = input.value;
            oldSizes += {"oldSize": size};
            input.checked=true;
        }
    });
}
