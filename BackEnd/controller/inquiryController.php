<?php
// Se incluye el archivo que contiene la definición de la clase 'consults' y su método 'getConsultsModel'
require_once __DIR__ . "../model/consultDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = $_GET['function'];

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    case 'get':
        get();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener consultas desde la base de datos y devolverlas en formato JSON
function get(){
    $result = (new consults())->get();
    echo json_encode($result);
}


?>