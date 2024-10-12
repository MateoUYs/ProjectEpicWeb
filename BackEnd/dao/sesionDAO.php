<?php

session_start();
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";


class SesionDAO
{
    public $ci;
    public $nombre;


    public function logIn($email, $password)
    {
        $connection = connection();
        $sql = "SELECT * FROM `users` WHERE  email = '$email'";
        $answer = $connection->query($sql);
        $fila = $answer->fetch_assoc();
        if ($fila != null) {
            if (password_verify($password, $fila['password'])) {
                $_SESSION['sesion'] = ["userCi" => $fila['userCi'], "usuario" => $fila['userName'], "email" => $fila['email'], "isAdmin" => $fila['isAdmin'] == 1 ? true : false, "isVerified" => $fila['isVerified'] == 1 ? true : false, "phone" => $fila['phone'], "pass" => $fila['password']];
                $query = new query(true, "Sesion iniciada", $_SESSION['sesion']);     
            } else {
                $query = new query(false, "Contraseña incorrecta", null);
                $_SESSION['sesion'] = null;
            }
        } else {
            $query = new query(false, "Email incorrecto", null);
            $_SESSION['sesion'] = null;
        }

        return $query;
    }

    public function getSession()
    {

        if (isset($_SESSION['sesion'])) {
            $query = new query(true, "Sesion obtenida ", $_SESSION['sesion']);
        } else {
            $query = new query(false, "No se encuentra una  sesion", null);
        }
        return $query;
    }

    public function logOut()
    {
        $_SESSION['sesion'] = null;
        $query = new query(true, "Sesion cerrada", null);
        return $query;
    }

}



?>