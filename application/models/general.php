<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class general extends CI_Model {
	private static $db;
	function __construct(){
		parent::__construct();	
		self::$db = &get_instance()->db;	
	}


	public function db_get_categorias() {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from categorias');
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }
    
    public function db_get_tiemposServicios() {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from tiempos_servicios');
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }
    
    public function db_get_relacionesServicios() {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from tipos_relaciones');
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
	}

	public function db_get_etiquetasByCategoria($idCategoria) {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from etiquetas where id_categoria=? order by nombre', array($idCategoria));
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }
    
    public function db_get_etiquetas() {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from etiquetas order by id_categoria, nombre');
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
	}
    
    public function db_get_departamentos() {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from departamentos');
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }
    
    public function db_get_ciudadesByDepartamento($idDepartamento) {
        $this->db->trans_start(); 
		$result = $this->db->query('select * from ciudades where idDepartamento=?', array($idDepartamento));
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }
    
    public function db_get_celularesByUser($idUsuario) {
        $this->db->trans_start(); 
		$result = $this->db->query('SELECT * FROM `celulares` WHERE idUsuario=?', array($idUsuario));
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }
    
    public function db_add_number($number, $idUsuario) {
        $this->db->trans_start(); 
        $resultValid = $this->db->query('SELECT * FROM `celulares` WHERE celular=?', array($number));
		$valid = $resultValid->result_array();
        $resultValid->free_result();

        if(count($valid)>0){
            return array("resultado" => false, "message" => "Este numero ya se encuentra registrado");
        }

		$this->db->query('insert INTO celulares (idUsuario, celular, fecha_creacion, estado) VALUES(?,?,NOW(),1)', array($idUsuario, $number));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Numero agregado correctamente");
        }
    }
    
    public function db_delete_number($idNumero) {
        $this->db->trans_start(); 
		$this->db->query('DELETE FROM celulares WHERE id=?', array($idNumero));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Numero eliminado correctamente");
        }
    }
    
    public function db_add_anuncio($string, $idUsuario) {
        $this->db->trans_start(); 

        $data = (array) json_decode($string, true);

        $this->db->query('INSERT INTO `anuncios`(`titulo`, `descripcion`, `id_categoria`, `id_ciudad`, `id_usuario`, `fecha_creacion`, `id_tipo`)
        VALUES (?,?,?,?,?,NOW(),"1")', array($data["titulo"], $data["descripcion"], $data["idCategoria"], $data["idCiudad"], $idUsuario));
        
        $idAnuncio = $this->db->insert_id();

        foreach ($data["etiquetas"] as $key => $etiqueta) {
            $this->db->query('INSERT INTO `etiquetas_anuncios`(`id_anuncio`,`id_etiqueta`,`fecha_creacion`) VALUES (?,?,NOW());', array($idAnuncio, $etiqueta));    
        }

        foreach ($data["condiciones"] as $key => $condicion) {
            $this->db->query('INSERT INTO `condiciones_anuncios`(`id_anuncio`, `precio`, `id_tiempo`, `id_relaciones`, `fecha_creacion`) VALUES (?,?,?,?,NOW());', array($idAnuncio, $condicion["precio"], $condicion["tiempo"], $condicion["relaciones"]));    
        }
        
        foreach ($data["telefonos"] as $key => $telefono) {
            $this->db->query('INSERT INTO `celulares_anuncios`(`id_anuncio`, `id_celular`, `opcion_1_wp`, `opcion_2_call`, `fecha_creacion`) VALUES (?,?,?,?,NOW());', array($idAnuncio, $telefono["idNum"], $telefono["optionW"], $telefono["optionC"]));    
        }


        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Anuncio publicado correctamente", "id" => $idAnuncio);
        }
    }
    
    public function db_set_imagenes($idAnuncio, $url) {
        $this->db->trans_start(); 

        $this->db->query('INSERT INTO `imagenes_anuncios`(`id_anuncio`,`url`,`fecha_creacion`) 
        VALUES (?,?,NOW());', array($idAnuncio, $url));

        $this->db->trans_complete();
	}
	

    public function db_get_anunciosVistaCuadricula($idCategoria, $idCiudad, $idEtiqueta) {
        $this->db->trans_start();
        
		$resultAnuncios = $this->db->query('SELECT id, `titulo`, `descripcion`, `id_tipo`, (SELECT i.url FROM `imagenes_anuncios` i WHERE i.id_anuncio=a.id LIMIT 1) imagen  FROM anuncios a
        WHERE `id_ciudad`=? AND `id_categoria`=? 
        AND id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?) ORDER BY a.fecha_creacion DESC', array($idCiudad, $idCategoria, $idEtiqueta));
		$anuncios = $resultAnuncios->result_array();
        $resultAnuncios->free_result();

        foreach ($anuncios as $key => $anuncio) {
            $resultEtiqueta = $this->db->query('SELECT eti.`nombre` FROM etiquetas_anuncios e
            JOIN etiquetas eti ON e.`id_etiqueta`=eti.`id` WHERE e.`id_anuncio`=?', array($anuncio["id"]));
            $etiquetas = $resultEtiqueta->result_array();
            $resultEtiqueta->free_result();
            array_push($anuncios[$key], $etiquetas);
        }

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $anuncios);
        }
    }


	
}