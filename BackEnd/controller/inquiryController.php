<?php
// Se incluye el archivo que contiene la definición de la clase 'consults' y su método 'getConsultsModel'
require_once __DIR__ . "/../dao/inquiryDAO.php";

// Se obtiene el valor del parámetro 'function' de la solicitud GET
$funcion = isset($_GET['function']) ? $_GET['function'] : '';

// Se usa un switch para manejar diferentes valores del parámetro 'function'
switch ($funcion) {
    case 'get':
        get();
        break;
    case 'add':
        add();
        break;
    case 'answer':
        answerInquiry();
        break;
    case 'submit':
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
    $query = (new inquirysDAO())->get();
    echo json_encode($query);
}

function add()
{
    $title = $_POST['title'];
    $userCi = $_POST['userCi'];
    $messageContent = $_POST['message'];

    $query = (new inquirysDAO())->add($title, $userCi, $messageContent);
    echo json_encode($query);
}

function answerInquiry()
{
    $inquiryId = $_POST['inquiryId'];
    $userCi = $_POST['userCi'];
    $messageContent = $_POST['message'];

    $query = (new inquirysDAO())->answerInquiry($inquiryId, $messageContent, $userCi);
    echo json_encode($query);
}

function submitInquiry(): void
{
    $inquiryId = $_POST['inquiryId'];

    $query = (new inquirysDAO())->submitInquiry($inquiryId);
    echo json_encode($query);
}

function getPublicInquirys()
{
    $query = (new inquirysDAO())->getPublicInquirys();
    echo json_encode($query);
}

function getAnsweredInquirys()
{
    $query = (new inquirysDAO())->getAnsweredInquirys();
    echo json_encode($query);
}
?>