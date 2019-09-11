<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class fechaSpanish 
{
	  
    function __construct()
    {

    }



    function fechaCorta($fecha){
    	 $dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		 $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		return date('d',strtotime($fecha))." de ".$meses[date('n',strtotime($fecha))-1]. " de ".date('Y',strtotime($fecha)) ;		
    }

	function fechaConDia($fecha){
    	 $dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		 $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		return $dias[date('w',strtotime($fecha))]." ".date('d',strtotime($fecha))." de ".$meses[date('n',strtotime($fecha))-1]. " de ".date('Y',strtotime($fecha)) ;		
    }    
}