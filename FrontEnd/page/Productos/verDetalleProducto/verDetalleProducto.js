import ProductDAO from "../../../dao/productDao.js";

window.onload = async () => {
    showProduct();
}

async function showProduct() {
    let query = await new ProductDAO().getProducts();
    let products = query.data;
    let tbodyElement = document.querySelector("#infoProduct");
    products.forEach(product => {
        tbodyElement.innerHTML
        let div = document.createElement('div');
        div.innerHTML = `
        <div>${product.name}</div>
        <div>${product.description}</div>
        <div>${product.price}</div>
        <div>${product.stock}</div>
            `;
        tbodyElement.appendChild(div);
      });

}


    