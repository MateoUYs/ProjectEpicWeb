import CarritoDAO from "../../../dao/carritoDao.js";
import ProductDAO from "../../../dao/productDao.js";
import sessionDAO from '../../../dao/sessionDAO.js';

let productDetail;

window.onload = async () => {
    let cartProduct = new CarritoDAO().obtenerCarrito();
    showCart(cartProduct);
    let id = new URLSearchParams(window.location.search).get("id");
    let product = await getProductById(id);
    productDetail = product;

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

    addEvents();
    console.log(product);
    showProduct(product);
    showImageProduct(product);
    console.log(id);
}

async function addEvents() {
    let btnAddProductCart = document.querySelector("#btnAddProductCart");
    let btnCart = document.querySelector("#showCart");
    let cart = document.querySelector("#cartModal");
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
    let btnComprar = document.querySelector("#confirmarCompra");
    let homeBtn = document.querySelector("#homeBtn");
    let contactBtn = document.querySelector("#inquiryBtn");
    let offerBtn = document.querySelector("#offerBtn");
    let manageUser = document.querySelector("#manageUser");
    let viewSales = document.querySelector("#viewSales");
    let productsBtn = document.querySelector("#productsBtn");

    productsBtn.onclick = () =>{
        window.location.href = "../../Productos/verProducto/verProducto.html";
    }

    manageUser.onclick = () =>{
        window.location.href = "../../Usuarios/gestionarUsuario/gestionarUsuario.html";
    }

    viewSales.onclick = () =>{
        window.location.href = "../../Ventas/verVenta/verVenta.html";
    }

    offerBtn.onclick = () => {
        window.location.href = "../../Ofertas/verOferta/verOferta.html";
    }


    btnAddProductCart.onclick = () => {
        let message = document.querySelector("#confirmMessage");
        let quantity = document.querySelector("#inputCantidad").value;
        let talle = document.querySelector("#talle").value;
        let productCart = {
            productId: productDetail.productId,
            quantity: parseInt(quantity),
            name: productDetail.name,
            size: talle,
            price: productDetail.price,
            discount: 0,
            extension: productDetail.extension
        }
        new CarritoDAO().agregarProductoCarrito(productCart);
        showCart(new CarritoDAO().obtenerCarrito());
        message.innerHTML = "";
        message.classList.add("showMessage");
           message.innerHTML += "Producto Agregado al Carrito!" 
        setTimeout(async () => {
            message.innerHTML = "";
            message.classList.remove("showMessage");
        }, 700);
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
            }, 500);
        } else if (frmAlert.submit.value == "Eliminar Producto") {
            let idProducto = frmAlert.getAttribute("dataProductId");
            let talle = frmAlert.getAttribute("dataProductTalle");
            removeProductCar(idProducto, talle);
            setTimeout(async () => {
                divAlert.classList.add("alertDeactivated");
                divAlert.classList.remove("alertActivated");
                confirmationAlert.innerHTML = "";
            }, 500);
        }
    }

    homeBtn.onclick = () => {
        window.location.href = "../../Usuarios/IndexUsuario/indexUsuario.html";
    }
}

function removeProductCar(idProducto, talle) {
    let carritoDAO = new CarritoDAO().eliminarProductoCarrito(idProducto, talle);
    let cartProduct = new CarritoDAO().obtenerCarrito();
    showCart(cartProduct);
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
        btnAdd.onclick = () => aumentarCantidad(product.productId, product.size);
        divQuantity.appendChild(btnAdd);
        let quantity = document.createElement('p');
        quantity.innerHTML = product.quantity;
        divQuantity.appendChild(quantity);
        let btnSubstract = document.createElement('button');
        btnSubstract.innerHTML = "-";
        btnSubstract.onclick = () => disminuirCantidad(product.productId, product.size);
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
            frmAlert.setAttribute("dataProductTalle", product.size);


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

async function getProductById(id) {
    let query = await new ProductDAO().getProductDetails(id);
    let product = query.data;
    return product;

}

function showProduct(product) {
    let tbodyElement = document.querySelector(".productDetails");
    let selectSize = document.querySelector("#talle");
    let content = document.createElement('div');
    content.innerHTML = `
        <div>${product.name}</div>
        <div>Descripción: ${product.description}</div>
        <div>Precio: $${product.price}</div>
        <div>Stock Disponible: ${product.stock}</div>
            `;
    tbodyElement.appendChild(content);

    product.size.forEach(talle => {
        let option = document.createElement("option");
        option.value = talle.sizeType;
        option.innerHTML = talle.sizeType;
        selectSize.appendChild(option);
    });

}


async function showImageProduct(product) {
    let tbodyElement = document.querySelector("#imageProduct");

    console.log(`${product.productId}.${product.extension}`);
    tbodyElement.innerHTML = "";
    tbodyElement.innerHTML += `
      <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}">
            `;

}

async function logOut() {
    await new sessionDAO().logOut();
    window.location.href = "../../Usuarios/indexUsuario/indexUsuario.html";
}
