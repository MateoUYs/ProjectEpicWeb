import InquiryDAO from "../../../dao/InquiryDAO.js";
import sessionDAO from '../../../dao/sessionDAO.js'
import CarritoDAO from '../../../dao/carritoDao.js'

let inquirySelected = null;
let allInquiry = [];
let answeredInquirys = [];
let filter = null;


window.onload = async () => {
    let queryResponse = await new InquiryDAO().getPublicInquirys();
    allInquiry = queryResponse.data;
    let inquiryQuery = await new InquiryDAO().getAnsweredInquirys();
    answeredInquirys = inquiryQuery.data;
    let query = await new sessionDAO().getSession();
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");

    if (query.status) {
        registerBtn.classList.remove("userUnlogged");
        logInBtn.classList.remove("userUnlogged");
        userBtn.classList.add("userLogged");
        logOutBtn.classList.add("userLogged");

    } else {
        registerBtn.classList.add("userUnlogged");
        logInBtn.classList.add("userUnlogged");
        userBtn.classList.remove("userLogged");
        logOutBtn.classList.remove("userLogged");
    }
    addEvent();
    showInquiry(allInquiry);
    showAnsweredInquirys(answeredInquirys);
    addEventModal();
    addFilterEvent();
}


function showInquiry(inquirys) {
    let tbodyElement = document.querySelector("#inquiryData");
    tbodyElement.innerHTML = "";
    inquirys.forEach((inquiry) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${inquiry.title}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        td.appendChild(div);
        tr.appendChild(td);

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/view.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            inquirySelected = inquiry;
            loadMenssage();
            showModal(true);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function showAnsweredInquirys(inquirys) {
    let tbodyElement = document.querySelector("#answeredInquirys");
    tbodyElement.innerHTML = "";
    inquirys.forEach((inquiry) => {
        let tr = document.createElement("tr");
        tr.innerHTML += `
             <td>${inquiry.title}</td>
        `;
        let td = document.createElement("td");
        let div = document.createElement("div");
        td.appendChild(div);
        tr.appendChild(td);

        let btn2 = document.createElement("button");
        btn2.innerHTML = `<img src="../../../assets/view.png">`;
        div.appendChild(btn2);
        btn2.className = "btnTd";
        btn2.onclick = () => {
            inquirySelected = inquiry;
            loadMenssage();
            showModal(true);
        }

        div.id = "actionsTd";
        tbodyElement.appendChild(tr);

    });
}

function loadMenssage() {
    let title = document.querySelector("#tituloContainer");
    let message = document.querySelector("#contenidoMensajeContainer");
    message.innerHTML = "";
    title.innerHTML = inquirySelected.title;
    inquirySelected.message.forEach((msj) => {
        message.innerHTML += `<p>Pregunta usuario:</p><p>${msj.content}</p>`;
    });
}


function addEventModal() {
    let modal = document.querySelector("#modal");
    modal.onclick = (e) => {
        if (e.target === modal) {
            showModal(false);
        }
    }
}

function showModal(status) {
    if (status) {
        modal.classList.add("show");
    } else {
        modal.classList.remove("show");
    }
}

function addFilterEvent() {
    let searchInput = document.querySelector("#searchInput");

    searchInput.onkeyup = () => {
        filter = searchInput.value;
        searchInquirys(filter);
    }
}

function searchInquirys(filter) {
    let filteredInquirys = allProducts.filter(inquiry => (inquiry.title + "").includes(filter));
    showInquiry(filteredInquirys);
}

function addEvent() {
    let btnCart = document.querySelector("#showCart");
    let cart = document.querySelector("#cartModal");
    let btnComprar = document.querySelector("#confirmarCompra");
    let registerBtn = document.querySelector("#registerBtn");
    let logInBtn = document.querySelector("#logInBtn");
    let userBtn = document.querySelector("#userBtn");
    let logOutBtn = document.querySelector("#logOutBtn");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let alertCancel = document.querySelector("#btnCancelAlert");
    let body = document.querySelector("body");
    let homeBtn = document.querySelector("#homeBtn");
    let viewProductsBtn = document.querySelector("#productsBtn");
    let userModal = document.querySelector("#userModal");
    let contactBtn = document.querySelector("#inquiryBtn");
    let formSumbit = document.querySelector("#consultaForm");
    let offerBtn = document.querySelector("#offerBtn");

    offerBtn.onclick = () => {
        window.location.href = "../../Ofertas/verOferta/verOferta.html";
    }

    formSumbit.onsubmit = (e) => {
        e.preventDefault();
        let title = formSumbit.title.value;
        let message = formSumbit.message.value;

        addInquiry(title, message);
    }


    btnCart.onclick = () => {
        if (cart.classList.contains("modalEnable")) {
            cart.classList.remove("modalEnable");
            cart.classList.add("modalDisable");
        } else {
            cart.classList.remove("modalDisable");
            cart.classList.add("modalEnable");
        }
    }

    viewProductsBtn.onclick = () => {
        window.location.href = "../../Productos/verProducto/verProducto.html";
    }

    btnComprar.onclick = async () => {
        let query = await new sessionDAO().getSession();

        if (query.status) {
            window.location.href = "../../Carrito/confirmarCompra/confirmarCompra.html";
        } else {
            window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
        }
    }

    contactBtn.onclick = async () => {
        let query = await new sessionDAO().getSession();

        if (query.status) {
            window.location.href = "../../Consultas/realizarConsulta/realizarConsulta.html";
        } else {
            window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
        }
    }

    registerBtn.onclick = () => {
        window.location.href = "../../Usuarios/registrarse/registrarse.html";
    }

    logInBtn.onclick = () => {
        window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
    }

    userBtn.onclick = () => {
        if (userModal.classList.contains("modalDisable")) {
            userModal.classList.add("modalEnable");
            userModal.classList.remove("modalDisable");
        } else {
            userModal.classList.remove("modalEnable");
            userModal.classList.add("modalDisable");
        }
    }

    homeBtn.onclick = () => {
        window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
    }

    logOutBtn.onclick = () => {
        divAlert.classList.add("alertActivated");
        divAlert.classList.remove("alertDeactivated");
        body.classList.add("modalOpen");
        pAlertTitle.innerHTML = "Cerrar Sesión";
        alertQuestion.innerHTML = "¿Estás seguro de que deseas cerrar sesión?";
        frmAlert.submit.value = "Cerrar Sesión";
    }

    alertCancel.onclick = () => {
        divAlert.classList.add("alertDeactivated");
        divAlert.classList.remove("alertActivated");
        body.classList.remove("modalOpen");
        alertQuestion.innerHTML = "";
        pAlertTitle.innerHTML = "";
        frmAlert.submit.value = "";
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
}

async function addInquiry(title, message) {
    let respuesta = await new InquiryDAO().addInquiry(title, message);
    if (respuesta.status) {
        message.innerHTML = "";
        message.classList.add("showMessage");
        message.innerHTML += "Consulta Realizada!"
        setTimeout(async () => {
            message.innerHTML = "";
            message.classList.remove("showMessage");
        }, 700);
    }

}

async function logOut() {
    await new sessionDAO().logOut();
    window.location.href = "../../Usuarios/iniciarSesion/iniciarSesion.html";
}

function showCart(cartProduct) {
    let tbodyElement = document.querySelector("#ProductList");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let pTotalPrice = document.querySelector("#totalPrice");
    let totalPrice = 0;
    pTotalPrice.innerHTML = "Precio Total:  ";
    tbodyElement.innerHTML = "";
    cartProduct.forEach(product => {
        let content = document.createElement('div');
        console.log(product.extension);
        content.innerHTML += `
        <img src="../../../../BackEnd/imgs/${product.productId}.${product.extension}" class="imgProductCart">
        <p>${product.name}</p>
        <p>Talle: ${product.size}</p>
        <p>Precio: ${product.price}</p>
        `;
        let divQuantity = document.createElement('div');
        divQuantity.className = "divQuantity";
        let btnAdd = document.createElement('button');
        btnAdd.innerHTML = "+";
        btnAdd.onclick = () => aumentarCantidad(product.productId, product.talle);
        divQuantity.appendChild(btnAdd);
        let quantity = document.createElement('p');
        quantity.innerHTML = product.quantity;
        divQuantity.appendChild(quantity);
        let btnSubstract = document.createElement('button');
        btnSubstract.innerHTML = "-";
        btnSubstract.onclick = () => disminuirCantidad(product.productId, product.talle);
        divQuantity.appendChild(btnSubstract);
        content.appendChild(divQuantity);
        tbodyElement.appendChild(content);
        let btnDelete = document.createElement('img');
        btnDelete.src = "../../../assets/deleteIcon.png";
        btnDelete.onclick = () => {
            divAlert.classList.add("alertActivated");
            divAlert.classList.remove("alertDeactivated");
            pAlertTitle.innerHTML = "Eliminar Producto del carrito";
            alertQuestion.innerHTML = "¿Estás seguro de que deseas eliminar el producto del carrito?";
            frmAlert.submit.value = "Eliminar Producto";
            frmAlert.setAttribute("dataProductId", product.productId);
        }
        content.appendChild(btnDelete);
        totalPrice = totalPrice + product.price * product.quantity;
    });
    pTotalPrice.innerHTML += "$" + totalPrice;
}

function aumentarCantidad(id, talle) {
    new CarritoDAO().aumentarCantidadCarrito(id, talle);
    let cart = new CarritoDAO().obtenerCarrito();
    showCart(cart);

}

function disminuirCantidad(id, talle) {
    new CarritoDAO().disminuirCantidadCarrito(id, talle);
    let cart = new CarritoDAO().obtenerCarrito();
    showCart(cart);
}
