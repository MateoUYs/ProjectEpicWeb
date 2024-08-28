<?php
// Se incluye el archivo que contiene la definición de la clase 'stock' y sus métodos
require_once __DIR__ . "/../model/stockDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtenerStock', se llama a la función 'getStock'
    case 'obtenerStock':
        getStock();
        break;
    case 'agregarStock':
        agregarStock();
        break;
    case 'modificarStock':
        modificarStock();
        break;
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener stock desde la base de datos y devolverlo en formato JSON
function getStock() {
   
}

// Función para agregar stock
function agregarStock() {
    // Implementación pendiente
}

// Función para modificar stock
function modificarStock() {
    // Implementación pendiente
}
?>
