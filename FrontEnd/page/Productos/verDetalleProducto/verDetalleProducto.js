import CarritoDAo from "../../../dao/carritoDao.js";
import ProductDAO from "../../../dao/productDao.js";

let estadoCarrito = "carritoOculto";
let productDetail;

window.onload = async () => {
    let cartProduct  =  new CarritoDAo().obtenerCarrito();
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

function addEventaddProductCart(){
    let btnAddProductCart = document.querySelector("#btnAddProductCart");
    btnAddProductCart.onclick = () => {
        let quantity = document.querySelector("#inputCantidad").value;
        let talle = document.querySelector("#talle").value;
        let productCart ={
            productId: productDetail.productId,
            quantity: parseInt(quantity),
            name:  productDetail.name,
            size: talle,
            price: productDetail.price,
            discount:0
        }
        new CarritoDAo().agregarProductoCarrito(productCart);
        showCart(new CarritoDAo().obtenerCarrito());

    }

}

function addEventShowCart(){
    let btnCart = document.querySelector("#showCart");
    let cart = document.querySelector("#cartModal");
    btnCart.onclick = () => {
        if(cart.classList.contains("modalEnable")){
            cart.classList.remove("modalEnable");
            cart.classList.add("modalDisable");
        }else{
            cart.classList.remove("modalDisable");
            cart.classList.add("modalEnable");
        }
    }

    let btnComprar = document.querySelector("#confirmarCompra");
    btnComprar.onclick = () => {
        window.location.href = "../../Carrito/confirmarCompra/confirmarCompra.html";
    }
}

function getCart(){
 return carrito;
}

function showCart(cartProduct){
    let tbodyElement = document.querySelector("#ProductList");
    console.log("el carrito es", cartProduct);
    tbodyElement.innerHTML = "";
    cartProduct.forEach(product => {
        let content = document.createElement('div');
        content.innerHTML = `
        
        <div>${product.name}</div>
        `;
        let btnAdd = document.createElement('button');
        btnAdd.innerHTML = "+";
        btnAdd.onclick = () => aumentarCantidad(product.productId,product.talle);
        content.appendChild(btnAdd);
        let quantity = document.createElement('div');
        quantity.innerHTML = product.quantity;
        content.appendChild(quantity);
        let btnSubstract = document.createElement('button');
        btnSubstract.innerHTML = "-";
        btnSubstract.onclick = () => disminuirCantidad(product.productId,product.talle);
        content.appendChild(btnSubstract);
        tbodyElement.appendChild(content);
    });

}
function aumentarCantidad(id,talle){
    console.log("aumentar", id);
    console.log("talle", talle);
    new CarritoDAo().aumentarCantidadCarrito(id,talle);
    let cart = new CarritoDAo().obtenerCarrito();
    showCart(cart);

}
function disminuirCantidad(id,talle){
    console.log("aumentar", id);
    console.log("talle", talle);
    new CarritoDAo().disminuirCantidadCarrito(id,talle);
    let cart = new CarritoDAo().obtenerCarrito();
    showCart(cart);
}

async function getProductById(id) {
    let query = await new ProductDAO().getProductDetails(id);
    console.log("aa",query);
    let product = query.data;
    return product;

}

function showProduct(product) {
    console.log("el producto es", product);
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




    