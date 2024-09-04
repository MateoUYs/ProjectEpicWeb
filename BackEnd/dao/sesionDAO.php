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
            $respuesta = $connection->query($sql);
            $fila = $respuesta->fetch_assoc();
            
            if($fila != null){
                $respuesta = new Respuesta(true,"sesion iniciada",null);
                $_SESSION['sesion'] = ["usuario"=>$fila['username'],"email"=>$fila['email'],"isAdmin"=>$fila['isAdmin']==1 ? true:false];
            }else{
                $respuesta = new Respuesta(false,"Credenciales incorrectas",null);
                $_SESSION['sesion'] = null;

            }
        
            return $respuesta ;
        }

        public function obtenerSesion(){
           
            if(isset($_SESSION['sesion'])){
                $respuesta = new Respuesta(true,"sesion obtenida ",$_SESSION['sesion']);
            }else{
                $respuesta = new Respuesta(false,"no se encuentra una  sesion",null);
            }
            return $respuesta;
        }

        public function cerrarSession(){
            $_SESSION['sesion'] = null;
            $respuesta = new Respuesta(true,"sesion cerrada",null);
            return $respuesta;
        }

    }



?>
