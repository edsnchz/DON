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

    public function db_aud_anuncios($idAnuncio, $accion) {
        $this->db->trans_start(); 
		$this->db->query('INSERT INTO acciones_anuncios (`id_anuncio`, tipo, `fecha_accion`) VALUES(?,?,NOW());', array($idAnuncio, $accion));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Auditoria guardada correctamente");
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
    
    public function db_set_imagenesLocal($string, $idAnuncio) {
        $this->db->trans_start(); 

        $data = (array) json_decode($string, true);

        foreach ($data["imagenes"] as $key => $imagen) {
            $this->db->query('INSERT INTO imagenes_anuncios (id_anuncio, url, `fecha_creacion`)
                        SELECT ?, url, NOW() FROM `imagenes_anuncios` WHERE id=?', array($idAnuncio, $imagen));
        }

        $this->db->trans_complete();
	}
	

    public function db_get_anuncios($idCategoria, $idDepartamento, $idCiudad, $idEtiqueta, $text) {
        $this->db->trans_start();

        $querySelect = "SELECT a.id, `titulo`, `descripcion`, `id_tipo`,  ciu.nombre ciudad, cate.nombre categoria, (SELECT COUNT(*) FROM `imagenes_anuncios` i WHERE i.id_anuncio=a.id) countImagenes 
        FROM anuncios a JOIN ciudades ciu ON a.`id_ciudad`=ciu.`id` JOIN categorias cate ON a.`id_categoria`=cate.`id`";

        if($idEtiqueta <> "NaN"){
            if($idDepartamento <> "NaN"){
                if($idCiudad <> "NaN"){
                    $query = "WHERE `id_ciudad`=? AND `id_categoria`=? 
                    AND a.id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?) ORDER BY a.fecha_creacion DESC";
                    $params = array($idCiudad, $idCategoria, $idEtiqueta);
                }else{
                    $query = "WHERE id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) AND `id_categoria`=?  AND id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?) ORDER BY a.fecha_creacion DESC";
                    $params = array($idDepartamento, $idCategoria, $idEtiqueta);
                }
            }else{
                $query = "WHERE `id_categoria`=? AND a.id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?) ORDER BY a.fecha_creacion DESC";
                $params = array($idCategoria, $idEtiqueta);
            }
        }else{
            if($idCategoria <> "NaN"){
                if($idDepartamento <> "NaN"){
                    if($idCiudad <> "NaN"){
                        $query = "WHERE `id_ciudad`=? AND `id_categoria`=? ORDER BY a.fecha_creacion DESC";
                        $params = array($idCiudad, $idCategoria);
                    }else{
                        $query = "WHERE id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) AND `id_categoria`=? ORDER BY a.fecha_creacion DESC";
                        $params = array($idDepartamento, $idCategoria);
                    }
                }else{
                    $query = "WHERE `id_categoria`=? ORDER BY a.fecha_creacion DESC";
                    $params = array($idCategoria);
                }
            }else{
                if($idDepartamento <> "NaN"){
                    if($idCiudad <> "NaN"){
                        $query = "WHERE `id_ciudad`=? ORDER BY a.fecha_creacion DESC";
                        $params = array($idCiudad);
                    }else{
                        $query = "WHERE id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) ORDER BY a.fecha_creacion DESC";
                        $params = array($idDepartamento);
                    }
                }else{
                    $query = "ORDER BY a.fecha_creacion DESC";
                    $params = array();
                }
            }
            
        }
        
		$resultAnuncios = $this->db->query($querySelect.$query, $params);
		$anuncios = $resultAnuncios->result_array();
        $resultAnuncios->free_result();

        foreach ($anuncios as $key => $anuncio) {
            $resultEtiqueta = $this->db->query('SELECT eti.`nombre` FROM etiquetas_anuncios e
            JOIN etiquetas eti ON e.`id_etiqueta`=eti.`id` WHERE e.`id_anuncio`=?', array($anuncio["id"]));
            $etiquetas = $resultEtiqueta->result_array();
            $resultEtiqueta->free_result();
            $anuncio['etiquetas'] = $etiquetas;
            // *************************************
            $resultImagenes = $this->db->query('SELECT url FROM `imagenes_anuncios` WHERE `id_anuncio`=?', array($anuncio["id"]));
            $imagenes = $resultImagenes->result_array();
            $resultImagenes->free_result();
            $anuncio['imagenes'] = $imagenes;
            // *************************************
            $resultCelulares = $this->db->query('SELECT celu.`celular` FROM `celulares_anuncios` celua
            JOIN `celulares` celu ON celua.`id_celular`=celu.id WHERE celua.`id_anuncio`=?', array($anuncio["id"]));
            $celulares = $resultCelulares->result_array();
            $resultCelulares->free_result();
            $anuncio['celulares'] = $celulares;

            $anuncios[$key] = $anuncio;
        }

        // FILTRO POR PALABRAS CLAVE
        if($text <> "NaN"){
            $anunciosNew = [];
            foreach ($anuncios as $key => $anuncio) {
                if(stripos($anuncio["titulo"], $text) !== false){
                    $anunciosNew[] = $anuncio;
                }elseif (stripos($anuncio["descripcion"], $text) !== false){
                    $anunciosNew[] = $anuncio;
                }else{
                    foreach ($anuncio["celulares"] as $keyC => $celular) {
                        if(stripos($celular["celular"], $text) !== false){
                            $anunciosNew[] = $anuncio;
                            break;
                        }
                    }
                }
            }
            $anuncios = $anunciosNew;
        }


        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $anuncios);
        }
    }

    public function db_get_anuncioById($id) {
        $this->db->trans_start();
        
		$resultAnuncio = $this->db->query("SELECT a.*, cate.`nombre` categoria, ciu.`nombre` ciudad, 
                                dep.id id_departamento, dep.`nombre` departamento, 
                                DATE(a.fecha_creacion) fecha, date_format(a.`fecha_creacion`, '%d/%m/%Y %r') fechaCreacionFormat,
                                ifnull(date_format(a.`fecha_ultima_edicion`, '%d/%m/%Y %r'), 'Sin ediciones') fechaUltEdicionFormat
                                    FROM anuncios a 
                                    JOIN categorias cate ON a.`id_categoria`=cate.id
                                    JOIN ciudades ciu ON a.`id_ciudad`=ciu.`id`
                                    JOIN `departamentos` dep ON ciu.`idDepartamento`=dep.`id`
                                    WHERE a.`id`=?", array($id));
		$anuncio = $resultAnuncio->result_array();
        $resultAnuncio->free_result();

        $resultCelulares = $this->db->query('SELECT celua.*, celu.`celular` FROM `celulares_anuncios` celua
                                JOIN `celulares` celu ON celua.`id_celular`=celu.id
                                WHERE celua.`id_anuncio`=?', array($id));
        $celulares = $resultCelulares->result_array();
        $resultCelulares->free_result();
        $anuncio['celulares'] = $celulares;
        
        $resultCondiciones = $this->db->query('SELECT ca.*, t.`valor` tiempo, r.`valor` relaciones FROM `condiciones_anuncios` ca
                                    JOIN `tiempos_servicios` t ON ca.`id_tiempo`=t.`id`
                                    JOIN `tipos_relaciones` r ON ca.`id_relaciones`=r.`id`
                                    WHERE ca.`id_anuncio`=?', array($id));
        $condiciones = $resultCondiciones->result_array();
        $resultCondiciones->free_result();
        $anuncio['condiciones'] = $condiciones;
        
        $resultEtiquetas = $this->db->query('SELECT eti.`nombre` FROM etiquetas_anuncios e
                            JOIN etiquetas eti ON e.`id_etiqueta`=eti.`id` WHERE e.`id_anuncio`=?', array($id));
        $etiquetas = $resultEtiquetas->result_array();
        $resultEtiquetas->free_result();
        $anuncio['etiquetas'] = $etiquetas;
        
        $resultImagenes = $this->db->query('SELECT url FROM `imagenes_anuncios` WHERE `id_anuncio`=?', array($id));
        $imagenes = $resultImagenes->result_array();
        $resultImagenes->free_result();
        $anuncio['imagenes'] = $imagenes;

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $anuncio);
        }
    }

    public function db_get_AuditoriaByAnuncio($id) {
        $this->db->trans_start(); 
		$result = $this->db->query('SELECT "HOY" clase, COUNT(*) valor, tipo FROM acciones_anuncios
                                    WHERE id_anuncio=? AND DATE(`fecha_accion`) = DATE(NOW())
                                    GROUP BY tipo
                                    UNION
                                    SELECT "TOTAL" clase, COUNT(*) valor, tipo FROM acciones_anuncios
                                    WHERE id_anuncio=?
                                    GROUP BY tipo;', array($id, $id));
		$a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_AuditoriaGraficoByAnuncio($id) {
        $this->db->trans_start(); 

        $dias_ES = array("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo");
        $dias_EN = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");

        $rtn = [];

        $fechaNow = date('Y-m-d');

        $fechaIni = new DateTime($fechaNow);
        $fechaIni->sub(new DateInterval('P6D'));

        $fechaFin = new DateTime($fechaNow);
        $fechaFin->add(new DateInterval('P1D'));

        $period = new DatePeriod(
            new DateTime($fechaIni->format('Y-m-d')),
            new DateInterval('P1D'),
            new DateTime($fechaFin->format('Y-m-d'))
        );
    
        foreach ($period as $key => $value) {
            $dia = str_replace($dias_EN, $dias_ES, $value->format('l'));
            $dia = substr($dia,0,3);
            
            $rtnTemp = array("dia" => $dia,
                            "vistas" => "0",
                            "cwhat" => "0",
                            "ccall" => "0");

            $result = $this->db->query('SELECT tipo, COUNT(*) valor FROM acciones_anuncios
                                        WHERE id_anuncio=? AND DATE(`fecha_accion`) = ?
                                        GROUP BY tipo ORDER BY tipo', array($id, $value->format('Y-m-d')));
            $datos = $result->result_array();
            $result->free_result();

            foreach ($datos as $keyD => $dato) {
                if($dato["tipo"] == "VISTA"){
                    $rtnTemp["vistas"] = $dato["valor"];
                }
                if($dato["tipo"] == "CLICK_WHAT"){
                    $rtnTemp["cwhat"] = $dato["valor"];
                }
                if($dato["tipo"] == "CLICK_CALL"){
                    $rtnTemp["ccall"] = $dato["valor"];
                }
            }  

            $rtn[] = $rtnTemp;
        }

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $rtn);
        }
    }

    public function db_send_menssage($idAnuncio, $correo, $mensaje) {
        $this->db->trans_start(); 
		$this->db->query('INSERT INTO `mensajes_privados` (correo, idUsuario, mensaje, `fecha_accion`) VALUES(?, (SELECT id_usuario FROM anuncios WHERE id=?), ?, NOW());', array($correo, $idAnuncio, $mensaje));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Mensaje enviado correctamente");
        }
    }
    
    public function db_get_UsuariosMensajesByUser($idUsuario) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT correo FROM `mensajes_privados` WHERE idUsuario=? GROUP BY correo ORDER BY `fecha_accion` DESC', array($idUsuario));
		$a = $result->result_array();
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_MensajesByUser($idUsuario, $correo) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT mensaje, DATE_FORMAT(fecha_accion, "%d/%m/%Y %r") fecha FROM `mensajes_privados` WHERE idUsuario=? AND correo=? ORDER BY `fecha_accion` DESC', array($idUsuario, $correo));
		$a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_AlarmMensajesByUser($idUsuario) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT COUNT(*) mensajes FROM `mensajes_privados` 
                            WHERE `fecha_accion` BETWEEN (SELECT ultimaVistaMensajes FROM usuarios WHERE id=?) AND NOW()
                            AND `idUsuario`=?', array($idUsuario, $idUsuario));
		$a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_set_ultimaVistaMensaje($idUsuario) {
        $this->db->trans_start(); 
		$this->db->query('UPDATE usuarios SET `ultimaVistaMensajes` = NOW() WHERE id=?', array($idUsuario));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Dato guardado satisfactoriamente");
        }
    }

    public function db_get_conceptosDenuncias() {
        $this->db->trans_start();

        $result = $this->db->query('SELECT * FROM `conceptos_denuncias`');
		$a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_add_denuncia($idAnuncio, $concepto, $text) {
        $this->db->trans_start(); 
		$this->db->query('INSERT INTO `denuncias_anuncios` (`idAnuncio`, `concepto`, motivo, `fecha_accion`) VALUES(?,?,?,NOW());', array($idAnuncio, $concepto, $text));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Denuncia gestionada satisfactoriamente");
        }
    }

    public function db_get_preciosCreditos() {
        $this->db->trans_start();

        $result = $this->db->query('SELECT * FROM `precios_creditos`');
		$a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_creditosByUser($idUsuario) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT cantidad FROM `movimientos` WHERE idUsuario=?', array($idUsuario));
		$a = $result->result_array();
        $result->free_result();
        
        if(count($a) == 0){
            $a[0]["cantidad"] = "0"; 
        }

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_fotosByUser($idUsuario) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT i.id, url, a.`id_usuario` FROM `imagenes_anuncios` i
                                    JOIN anuncios a ON i.`id_anuncio`= a.`id`
                                    WHERE id_usuario=?
                                    GROUP BY url', array($idUsuario));
		$a = $result->result_array();
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }


    
}