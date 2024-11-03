import CarritoDAo from "../../../dao/carritoDao.js";
import ProductDAO from "../../../dao/productDao.js";

let productDetail;

window.onload = async () => {
    let cartProduct = new CarritoDAo().obtenerCarrito();
    showCart(cartProduct);
    let id = new URLSearchParams(window.location.search).get("id");
    let product = await getProductById(id);
    productDetail = product;

    addEventShowCart();
    addEventaddProductCart();


    showProduct(product);
    //   showImageProduct(product);


    console.log(id);

}

function addEventaddProductCart() {
    let btnAddProductCart = document.querySelector("#btnAddProductCart");
    btnAddProductCart.onclick = () => {
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
        new CarritoDAo().agregarProductoCarrito(productCart);
        showCart(new CarritoDAo().obtenerCarrito());

    }

}

function addEventShowCart() {
    let btnCart = document.querySelector("#showCart");
    let cart = document.querySelector("#cartModal");
    btnCart.onclick = () => {
        if (cart.classList.contains("modalEnable")) {
            cart.classList.remove("modalEnable");
            cart.classList.add("modalDisable");
        } else {
            cart.classList.remove("modalDisable");
            cart.classList.add("modalEnable");
        }
    }

    let btnComprar = document.querySelector("#confirmarCompra");
    btnComprar.onclick = () => {
        window.location.href = "../../Carrito/confirmarCompra/confirmarCompra.html";
    }
}

function showCart(cartProduct) {
    let tbodyElement = document.querySelector("#ProductList");
    let divAlert = document.querySelector("#alertDiv");
    let pAlertTitle = document.querySelector("#alertTitle");
    let alertQuestion = document.querySelector("#question");
    let frmAlert = divAlert.querySelector("form");
    let pTotalPrice = document.querySelector("#totalPrice");
    let totalPrice = 0;
    console.log("el carrito es", cartProduct);
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
        btnDelete.onclick = () =>{
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
    new CarritoDAo().aumentarCantidadCarrito(id, talle);
    let cart = new CarritoDAo().obtenerCarrito();
    showCart(cart);

}
function disminuirCantidad(id, talle) {
    new CarritoDAo().disminuirCantidadCarrito(id, talle);
    let cart = new CarritoDAo().obtenerCarrito();
    showCart(cart);
}

async function getProductById(id) {
    let query = await new ProductDAO().getProductDetails(id);
    let product = query.data;
    return product;

}

function showProduct(product) {
    let tbodyElement = document.querySelector("#infoProduct");
    let content = document.createElement('div');
    content.innerHTML = `
        <div>${product.name}</div>
        <div>${product.description}</div>
        <div>${product.price}</div>
        <div>${product.stock}</div>
            `;
    tbodyElement.appendChild(content);

}


// async function showImageProduct(product) {
//     let tbodyElement = document.querySelector("#imageProduct");

//         tbodyElement.innerHTML
//         let div = document.createElement('div');
//         contentImage.innerHTML = `
//       <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}">
//             `;
//         tbodyElement.appendChild(contentImage);

// }




