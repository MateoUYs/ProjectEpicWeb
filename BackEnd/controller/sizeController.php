<?php
// Se incluye el archivo que contiene la definición de la clase 'size' y sus métodos
require_once __DIR__ . "/../dao/sizeDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getProducts'
    case 'getSize':
        getSize();
        break;
    case 'addSize':
        addSize();
        break;
    case 'deleteSize':
        deleteSize();
        break;
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener productos desde la base de datos y devolverlos en formato JSON
function getSize() {
    $result = (new sizeDAO())->getSize();
    echo json_encode($result);
}

// Función para agregar un producto
function addSize() {
    $tipo = $_POST["size"];
    $result = (new sizeDAO())->addSize($tipo); 
    echo json_encode($result);
}

// Función para eliminar un producto
function deleteSize() {
    $tipo = $_POST["size"];
    $result = (new sizeDAO())->deleteSize($tipo);
    echo json_encode($result);
}

?>
