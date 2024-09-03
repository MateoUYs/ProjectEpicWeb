<?php

// Requiere el archivo userDAO.php que contiene la definición de la clase 'user' y sus métodos
require_once __DIR__ . "../model/userDAO.php";

// Obtiene el parámetro 'function' de la URL
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Realiza una acción diferente dependiendo del valor de '$funcion'
switch ($funcion) {
    case 'iniciarSesion':
        // Si el valor de '$funcion' es 'iniciarSesion', se llama a la función iniciarSesion()
        iniciarSesion();
        break;
    default:
        // Si el valor de '$funcion' no coincide con ningún caso, se puede manejar aquí
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

function iniciarSesion(){
    
}

?>