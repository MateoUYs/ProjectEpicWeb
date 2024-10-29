<?php
// Se incluye el archivo que contiene la definición de la clase 'favorites' y su método 'getFavoritesModel'
require_once __DIR__ . "/../dao/favoriteDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getFavorites'
    case 'get':
        get();
        break;
    case 'add':
        add();
        break;
    case 'delete':
        delete();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener favoritos desde la base de datos y devolverlos en formato JSON
function get(){
    $userCi = ['userCi'];

    $query = (new favoritesDAO())->getUserFavorites($userCi);
    echo json_encode($query);
}

function add(){
    $userCi = ['userCi'];
    $productsIds = ['productsIds'];

    $query = (new favoritesDAO())->addUserFavorites($userCi, $productsIds);
    echo json_encode($query);
}

function delete(){
    $userCi = ['userCi'];
    $productId = ['productId'];

    $query = (new favoritesDAO())->deleteUserFavorite($userCi, $productId);
    echo json_encode($query);
}
?>