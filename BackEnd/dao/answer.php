<?php
    class answer {
        public $estado;
        public $mensaje;
        public $datos;

        function __construct($estado,$mensaje,$datos){
            $this->estado = $estado;
            $this->mensaje = $mensaje;
            $this->datos=$datos;
        }

    }

?>