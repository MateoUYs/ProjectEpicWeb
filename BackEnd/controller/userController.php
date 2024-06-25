<?php

// Requiere el archivo userDAO.php que contiene la definición de la clase 'user' y sus métodos
require_once __DIR__ . "../model/userDAO.php";

// Obtiene el parámetro 'function' de la URL
$funcion = $_GET['function'];

// Realiza una acción diferente dependiendo del valor de '$funcion'
switch ($funcion) {
    case 'obtener':
        // Si el valor de '$funcion' es 'obtener', se llama a la función getUsers()
        getUsers();
        break;
    // Puedes agregar más casos aquí para manejar otras funciones
    default:
        // Si el valor de '$funcion' no coincide con ningún caso, se puede manejar aquí
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener los usuarios de la base de datos
function getUsers(){
    // Crea una instancia de la clase 'user' y llama al método 'getUsersModel()' para obtener los usuarios
    $result = (new user())->getUsersModel();
    
    // Convierte el resultado a formato JSON y lo imprime
    echo json_encode($result);
}

?>