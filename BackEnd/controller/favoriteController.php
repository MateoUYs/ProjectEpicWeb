<?php
// Se incluye el archivo que contiene la definición de la clase 'favorites' y su método 'getFavoritesModel'
require_once __DIR__ . "/../model/favoriteDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = $_GET['function'];

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getFavorites'
    case 'obtener':
        getFavorites();
        break;
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener favoritos desde la base de datos y devolverlos en formato JSON
function getFavorites(){
    // Se crea una instancia de la clase 'favorites' y se llama al método 'getFavoritesModel' para obtener los favoritos
    $result = (new favorites())->getFavoritesModel();
    // Se codifica el resultado en formato JSON y se imprime
    echo json_encode($result);
}
?>