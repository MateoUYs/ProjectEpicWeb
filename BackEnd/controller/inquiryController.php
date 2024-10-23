<?php
// Se incluye el archivo que contiene la definición de la clase 'consults' y su método 'getConsultsModel'
require_once __DIR__ . "/../dao/consultDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = $_GET['function'];

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    case 'get':
        get();
        break;
    case 'add':
        add();
        break;
    case 'answerInquiry':
        answerInquiry();
        break;
    case 'submitInquiry':
        submitInquiry();
        break;
    case 'getPublicInquirys':
        getPublicInquirys();
        break;
    case 'getAnsweredInquirys':
        getAnsweredInquirys();
        break;
    default:
        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

// Función para obtener consultas desde la base de datos y devolverlas en formato JSON
function get()
{
    $query = (new consults())->get();
    echo json_encode($query);
}

function add()
{
    $title = $_POST['title'];
    $userCi = $_POST['userCi'];
    $messageContent = $_POST['message'];

    $query = (new consults())->add($title, $userCi, $messageContent);
    echo json_encode($query);
}

function answerInquiry()
{
    $inquiryId = $_POST['inquiryId'];
    $userCi = $_POST['userCi'];
    $messageContent = $_POST['message'];

    $query = (new consults())->answerInquiry($inquiryId, $messageContent, $userCi);
    echo json_encode($query);
}

function submitInquiry()
{
    $inquiryId = $_POST['inquiryId'];

    $query = (new consults())->submitInquiry($inquiryId);
    echo json_encode($query);
}

function getPublicInquirys()
{
    $query = (new consults())->getPublicInquirys();
    echo json_encode($query);
}

function getAnsweredInquirys()
{
    $query = (new consults())->getPublicInquirys();
    echo json_encode($query);
}
?>