<?php

    session_start();
    require_once __DIR__ . "/../controller/connection.php";
    require_once __DIR__ . "/respuesta.php";


    class SesionDAO{
        public $ci;
        public $nombre;


        public function iniciarSesion($email , $password){
            

            $connection = connection();
            $sql = "SELECT * FROM `usuario` WHERE  email = '$email' AND password  = '$password'";
            $answer = $connection->query($sql);
            $fila = $answer->fetch_assoc();
            
            if($fila != null){
                $answer = new answer(true,"sesion iniciada",null);
                $_SESSION['sesion'] = ["usuario"=>$fila['username'],"email"=>$fila['email'],"isAdmin"=>$fila['isAdmin']==1 ? true:false];
            }else{
                $answer = new answer(false,"Credenciales incorrectas",null);
                $_SESSION['sesion'] = null;

            }
        
            return $answer ;
        }

        public function obtenerSesion(){
           
            if(isset($_SESSION['sesion'])){
                $answer = new answer(true,"sesion obtenida ",$_SESSION['sesion']);
            }else{
                $answer = new answer(false,"no se encuentra una  sesion",null);
            }
            return $answer;
        }

        public function cerrarSession(){
            $_SESSION['sesion'] = null;
            $answer = new answer(true,"sesion cerrada",null);
            return $answer;
        }

    }



?>
