<?php
// Se incluye el archivo que contiene la definición de la clase 'carrito' y sus métodos
require_once __DIR__ . "/../model/carritoDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {

    case 'confirmarCompra':
        confirmarCompra();
        break;

    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}



// Función para confirmar una compra
function confirmarCompra() {
    // Implementación pendiente
}

?>
