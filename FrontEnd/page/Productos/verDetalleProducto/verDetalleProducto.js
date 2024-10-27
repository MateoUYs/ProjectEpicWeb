import ProductDAO from "../../../dao/productDao.js";

window.onload = async () => {
    showProduct();
    showImageProduct();
}

async function showProduct() {
    let query = await new ProductDAO().getProducts();
    let products = query.data;
    let tbodyElement = document.querySelector("#infoProduct");
    products.forEach(product => {
        tbodyElement.innerHTML
        let div = document.createElement('div');
        content.innerHTML = `
        <div>${product.name}</div>
        <div>${product.description}</div>
        <div>${product.price}</div>
        <div>${product.stock}</div>
            `;
        tbodyElement.appendChild(content);
      });

}


async function showImageProduct() {
    let query = await new ProductDAO().getProducts();
    let products = query.data;
    let tbodyElement = document.querySelector("#imageProduct");
    products.forEach(product => {
        tbodyElement.innerHTML
        let div = document.createElement('div');
        contentImage.innerHTML = `
      <img src="../../../../backEnd/imgs/${product.productId}.${product.extension}">
            `;
        tbodyElement.appendChild(contentImage);
      });
}




    