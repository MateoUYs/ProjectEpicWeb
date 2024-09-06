<?php
// Requiere el archivo connection.php que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/answer.php";

class userDAO
{
    // Método para obtener los usuarios desde el modelo (base de datos)
    function getUsers()
    {
        // Establece la conexión a la base de datos utilizando la función connection() del archivo connection.php
        $connection = connection();

        // Define la consulta SQL para seleccionar todos los registros de la tabla 'users'
        $sql = "SELECT * FROM usuario";

        // Ejecuta la consulta SQL y almacena el resultado en la variable $result
        $result = $connection->query($sql);

        // Recupera todos los registros de la consulta como un array de arrays asociativos
        // Cada array asociativo representa una fila de la tabla 'users'
        $users = $result->fetch_all(MYSQLI_ASSOC);

        // Devuelve el array de arrays asociativos con los registros de la tabla 'users'
        $answer = new answer(true,"Usuarios obtenidos",$users);
        return $answer;
    }

    function addUser($ci, $correo, $usuario, $password, $telefono)
    {
        $codigoUnico=uniqid();
        $sql = "INSERT INTO `usuario` (`email`, `ci`, `username`, `password`, `telefono`,codigoVerificacion,isVerficada,isAdmin) VALUES ('$correo', '$ci' ,'$usuario', '$password', '$telefono','$codigoUnico',0,0);";
        $connection = connection();
        try {
            $connection->query($sql);
            $answer = new answer(true,"Usuario agregado con exito",null);
        } catch (Exception $e) {
            $answer = new answer(false,"No se pudo agregar el usuario (ci ya existe)",null);
        }

        $para= $correo;
        $asunto = 'Codigo de validacion';
        $descripcion   = ''.$codigoUnico;
        $de = 'projectEpicWeb@gmail.com';

        if (!mail($para, $asunto, $descripcion, $de)){
            $answer = new answer(false,"No se pudo enviar el correo de verificacion",null);
            return $answer;
        }
        return $answer;
    }

    // Función para eliminar un usuario
    function deleteUser($ci)
    {
        $sql = "DELETE FROM usuario WHERE ci = '$ci'";
        $connection = connection();
        try {
            $connection->query($sql);
            $answer = new answer(true, "Usuario eliminado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "No se pudo eliminar el usuario (ci incorrecta)", null);
        }
        return $answer;
    }

    // Función para modificar un usuario
    function modifyUser($ci, $email, $usuario, $password, $telefono)
    {
        $sql = "UPDATE usuario SET email ='$email', username = '$usuario', password ='$password', telefono ='$telefono' WHERE ci = '$ci'";
        $connection = connection();
        try {
            $connection->query($sql);
            $answer = new answer(true, "Usuario modificado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "No se pudo modificar el usuario (ci incorrecta)", null);
        }
        return $answer;
    }

    // Función para verificar un usuario
    function verifyUser($email,$codigoVerificacion)
    {
        $connection = connection();
        $sql = "SELECT * FROM `usuario` WHERE  email = '$email' AND codigoVerificacion  = '$codigoVerificacion'";
        $answer = $connection->query($sql);
        $fila = $answer->fetch_assoc();
        
        if($fila != null){
            $answer = new answer(true,"cuenta verificada",null);
            $ci = $fila['ci'];
            $sql = "UPDATE usuario SET isVerficada = 1 WHERE ci = '$ci'";
            try{
               $connection->query($sql); 
               $answer = new answer(true, "Usuario verificado", null);
            }catch (Exception $e){
                $answer = new answer(true, "Codigo de verificación de Usuario incorrecto", null);
                return $answer;
            }
            
        }else{
            $answer = new answer(false,"Email de Usuario incorrecto",null);
            return $answer;
        }
    
        return $answer ;
    }

}

?>