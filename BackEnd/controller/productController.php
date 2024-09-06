<?php
// Se incluye el archivo que contiene la definición de la clase 'products' y su método 'getProductsModel'
require_once __DIR__ . "/../dao/productDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getProducts'
    case 'getProducts':
        getProducts();
        break;
    case 'addProduct':
        addProduct();
        break;
    case 'deleteProduct':
        deleteProduct();
        break;
    case 'modifyProduct':
        modifyProduct();
        break;
    case 'getProductDetails':
        getProductDetails();
        break;            
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener productos desde la base de datos y devolverlos en formato JSON
function getProducts() {
    // Se crea una instancia de la clase 'products' y se llama al método 'getProductsModel' para obtener los productos
    $result = (new productsDAO())->getProductsModel();
    // Se codifica el resultado en formato JSON y se imprime
    echo json_encode($result);
}

// Función para agregar un producto
function addProduct() {
    $precio = $_POST["precio"];
    $descripcion = $_POST["descripcion"];
    $imagen = $_FILES['imagen'];
    $nombre = $_POST["nombre"];
    $color = $_POST["color"];
    $result = (new productsDAO())->addProducts($precio, $descripcion, $imagen, $nombre, $color); 
    echo json_encode($result);
}

// Función para eliminar un producto
function deleteProduct() {
    $id = $_POST["id"];
    $result = (new productsDAO())->deleteProducts($id);
    echo json_encode($result);
}

// Función para modificar un producto
function modifyProduct() {
    $idProducto = $_POST["id"];
    $precio = $_POST["precio"];
    $descripcion = $_POST["descripcion"];
    $nombre = $_POST["nombre"];
    $color = $_POST["color"];
    $result = (new productsDAO())->modifyProducts($idProducto,$precio, $descripcion, $nombre, $color); 
    echo json_encode($result);
}

// Función para obtener detalles de un producto específico
function getProductDetails() {
    $idProducto = $_POST["id"];
    $result = (new productsDAO())->getProductDetails($idProducto);
    echo json_encode($result);
}
?>
