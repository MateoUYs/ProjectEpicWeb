<?php
// Se incluye el archivo que contiene la definición de la clase 'consults' y su método 'getConsultsModel'
require_once __DIR__ . "../model/consultDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = $_GET['function'];

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getConsults'
    case 'obtener':
        getConsults();
        break;
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener consultas desde la base de datos y devolverlas en formato JSON
function getConsults(){
    // Se crea una instancia de la clase 'consults' y se llama al método 'getConsultsModel' para obtener las consultas
    $result = (new consults())->getConsultsModel();
    // Se codifica el resultado en formato JSON y se imprime
    echo json_encode($result);
}
?>