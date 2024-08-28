
<?php
// Se incluye el archivo que contiene la definición de la clase 'offers' y su método 'getOffersModel'
require_once __DIR__ . "../model/offerDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = $_GET['function'];

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    // Si el valor de 'function' es 'obtener', se llama a la función 'getOffers'
    case 'obtener':
        getOffers();
        break;
    // Si el valor de 'function' no es reconocido, se devuelve un mensaje de error en formato JSON
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener ofertas desde la base de datos y devolverlas en formato JSON
function getOffers(){
    // Se crea una instancia de la clase 'offers' y se llama al método 'getOffersModel' para obtener las ofertas
    $result = (new offers())->getOffersModel();
    // Se codifica el resultado en formato JSON y se imprime
    echo json_encode($result);
}
?>