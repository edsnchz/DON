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

        $titulo = strtolower($data["titulo"]);
        $titulo = ucfirst($titulo);
        
        $this->db->query('INSERT INTO `anuncios`(`titulo`, `descripcion`, `descripcionFormat`, `id_categoria`, `id_ciudad`, `id_usuario`, `fecha_creacion`)
        VALUES (?,?,?,?,?,?,NOW())', array($titulo, $data["descripcion"], $data["descripcionFormat"], $data["idCategoria"], $data["idCiudad"], $idUsuario));
        
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

    public function db_edit_anuncio($string, $idUsuario) {
        $this->db->trans_start(); 

        $data = (array) json_decode($string, true);

        $titulo = strtolower($data["titulo"]);
        $titulo = ucfirst($titulo);

        $this->db->query('UPDATE `anuncios` SET titulo=?, `descripcion`=?, `descripcionFormat`=?, `fecha_ultima_edicion`=NOW() WHERE id=?;', array($titulo, $data["descripcion"], $data["descripcionFormat"], $data["id"]));

        $this->db->query('DELETE FROM `etiquetas_anuncios` WHERE id_anuncio=?;', array($data["id"]));
        foreach ($data["etiquetas"] as $key => $etiqueta) {
            $this->db->query('INSERT INTO `etiquetas_anuncios`(`id_anuncio`,`id_etiqueta`,`fecha_creacion`) VALUES (?,?,NOW());', array($data["id"], $etiqueta));    
        }

        $this->db->query('DELETE FROM `condiciones_anuncios` WHERE id_anuncio=?;', array($data["id"]));
        foreach ($data["condiciones"] as $key => $condicion) {
            $this->db->query('INSERT INTO `condiciones_anuncios`(`id_anuncio`, `precio`, `id_tiempo`, `id_relaciones`, `fecha_creacion`) VALUES (?,?,?,?,NOW());', array($data["id"], $condicion["precio"], $condicion["tiempo"], $condicion["relaciones"]));    
        }
        
        foreach ($data["telefonos"] as $key => $telefono) {
            $this->db->query('UPDATE `celulares_anuncios` SET `opcion_1_wp`=?, `opcion_2_call`=? WHERE id=?;', array($telefono["optionW"], $telefono["optionC"], $telefono["idNum"]));    
        }

        foreach ($data["imgEliminar"] as $key => $imagen) {
            $this->db->query('DELETE FROM `imagenes_anuncios` WHERE id=?;', array($imagen));    
        }
        

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Anuncio editado correctamente");
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

        // ARMO EL WHERE Y LOS PARAMETROS GENERALES
        if($idEtiqueta <> "NaN"){
            if($idDepartamento <> "NaN"){
                if($idCiudad <> "NaN"){
                    $query = "WHERE a.estado=1 AND `id_ciudad`=? AND `id_categoria`=? 
                    AND a.id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?)";
                    $params = array($idCiudad, $idCategoria, $idEtiqueta);
                }else{
                    $query = "WHERE a.estado=1 AND id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) AND `id_categoria`=?  AND id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?)";
                    $params = array($idDepartamento, $idCategoria, $idEtiqueta);
                }
            }else{
                $query = "WHERE a.estado=1 AND `id_categoria`=? AND a.id IN (SELECT e.`id_anuncio` FROM etiquetas_anuncios e WHERE e.`id_etiqueta`=?)";
                $params = array($idCategoria, $idEtiqueta);
            }
        }else{
            if($idCategoria <> "NaN"){
                if($idDepartamento <> "NaN"){
                    if($idCiudad <> "NaN"){
                        $query = "WHERE a.estado=1 AND `id_ciudad`=? AND `id_categoria`=?";
                        $params = array($idCiudad, $idCategoria);
                    }else{
                        $query = "WHERE a.estado=1 AND id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) AND `id_categoria`=?";
                        $params = array($idDepartamento, $idCategoria);
                    }
                }else{
                    $query = "WHERE a.estado=1 AND `id_categoria`=?";
                    $params = array($idCategoria);
                }
            }else{
                if($idDepartamento <> "NaN"){
                    if($idCiudad <> "NaN"){
                        $query = "WHERE a.estado=1 AND `id_ciudad`=?";
                        $params = array($idCiudad);
                    }else{
                        $query = "WHERE a.estado=1 AND id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?)";
                        $params = array($idDepartamento);
                    }
                }else{
                    $query = "WHERE a.estado=1";
                    $params = array();
                }
            }
            
        }
        
        // PARA TRAER TODOS LOS QUE SEAN TOP
                
        $querySelect = "SELECT a.id, `titulo`, `descripcion`,  ciu.nombre ciudad, cate.nombre categoria, (SELECT COUNT(*) FROM `imagenes_anuncios` i WHERE i.id_anuncio=a.id) countImagenes, IFNULL((SELECT pq.`idOpcPaq` FROM `paquetes_anuncios` pq WHERE pq.`idOpcPaq` IN (14, 15) AND DATE(NOW()) BETWEEN pq.`fecha_inicial` AND pq.`fecha_final` AND pq.`estado`='VIGENTE' AND pq.idAnuncio=a.id LIMIT 1), 'NO') tipoDestacado, 1 isTop FROM anuncios a JOIN ciudades ciu ON a.`id_ciudad`=ciu.`id` JOIN categorias cate ON a.`id_categoria`=cate.`id`";

        $queryTop = " AND a.id IN (SELECT `idAnuncio` FROM `paquetes_anuncios` WHERE `idOpcPaq` NOT IN (14, 15) AND DATE(NOW()) BETWEEN `fecha_inicial` AND `fecha_final` AND TIME(NOW()) BETWEEN `hora_inicial` AND `hora_final` AND `estado`='VIGENTE')";

        $resultAnuncios = $this->db->query($querySelect.$query.$queryTop, $params);
        $anuncios = $resultAnuncios->result_array();
        $resultAnuncios->free_result();

        // PARA TRAER TODOS LOS QUE NO SEAN TOP

        $querySelect = "SELECT a.id, `titulo`, `descripcion`,  ciu.nombre ciudad, cate.nombre categoria, (SELECT COUNT(*) FROM `imagenes_anuncios` i WHERE i.id_anuncio=a.id) countImagenes, IFNULL((SELECT pq.`idOpcPaq` FROM `paquetes_anuncios` pq WHERE pq.`idOpcPaq` IN (14, 15) AND DATE(NOW()) BETWEEN pq.`fecha_inicial` AND pq.`fecha_final` AND pq.`estado`='VIGENTE' AND pq.idAnuncio=a.id LIMIT 1), 'NO') tipoDestacado, 0 isTop FROM anuncios a JOIN ciudades ciu ON a.`id_ciudad`=ciu.`id` JOIN categorias cate ON a.`id_categoria`=cate.`id`";

        $queryTop = " AND a.id NOT IN (SELECT `idAnuncio` FROM `paquetes_anuncios` WHERE `idOpcPaq` NOT IN (14, 15) AND DATE(NOW()) BETWEEN `fecha_inicial` AND `fecha_final` AND TIME(NOW()) BETWEEN `hora_inicial` AND `hora_final` AND `estado`='VIGENTE') ORDER BY a.fecha_creacion DESC";

		$resultAnuncios2 = $this->db->query($querySelect.$query.$queryTop, $params);
		$anunciosTemp = $resultAnuncios2->result_array();
        $resultAnuncios2->free_result();

        foreach ($anunciosTemp as $key => $value) {
            array_push($anuncios, $value);
        }

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
            if(count($imagenes)==0){
                $imagenes[0]["url"] = "../../images/default_img.svg";
            }
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

    public function db_get_anunciosCarousel($idCategoria, $idDepartamento) {
        $this->db->trans_start();

        $querySelect = "SELECT a.id, (SELECT i.url FROM `imagenes_anuncios` i WHERE i.id_anuncio=a.id LIMIT 1) url FROM `anuncios` a JOIN `paquetes_anuncios` p ON a.`id`=p.`idAnuncio` ";

        $query = "WHERE `idOpcPaq`=15 AND DATE(NOW()) BETWEEN p.`fecha_inicial` AND p.`fecha_final` AND p.`estado`='VIGENTE' ";
      
        if($idCategoria <> "NaN"){
            if($idDepartamento <> "NaN"){
                $query .= " AND a.estado=1 AND id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) AND `id_categoria`=? ORDER BY a.fecha_creacion DESC";
                $params = array($idDepartamento, $idCategoria);
            }else{
                $query .= " AND a.estado=1 AND `id_categoria`=? ORDER BY a.fecha_creacion DESC";
                $params = array($idCategoria);
            }
        }else{
            if($idDepartamento <> "NaN"){
                $query .= " AND a.estado=1 AND id_ciudad IN (SELECT id FROM ciudades WHERE idDepartamento=?) ORDER BY a.fecha_creacion DESC";
                $params = array($idDepartamento);
            }else{
                $query .= " AND a.estado=1 ORDER BY a.fecha_creacion DESC";
                $params = array();
            }
        }
        
        $resultAnuncios = $this->db->query($querySelect.$query, $params);
        $anuncios = $resultAnuncios->result_array();
        $resultAnuncios->free_result();

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
                                DATE(a.fecha_creacion) fecha, date_format(a.`fecha_creacion`, '%d/%m/%Y - %H:%i') fechaCreacionFormat,
                                ifnull(date_format(a.`fecha_ultima_edicion`, '%d/%m/%Y - %H:%i'), 'Sin ediciones') fechaUltEdicionFormat
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
        
        $resultEtiquetas = $this->db->query('SELECT eti.id, eti.`nombre` FROM etiquetas_anuncios e
                            JOIN etiquetas eti ON e.`id_etiqueta`=eti.`id` WHERE e.`id_anuncio`=?', array($id));
        $etiquetas = $resultEtiquetas->result_array();
        $resultEtiquetas->free_result();
        $anuncio['etiquetas'] = $etiquetas;
        
        $resultImagenes = $this->db->query('SELECT id, url FROM `imagenes_anuncios` WHERE `id_anuncio`=?', array($id));
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

    public function db_get_AuditoriaGraficoByAnuncioAndFecha($id, $fecha1, $fecha2) {
        $this->db->trans_start(); 

        $rtn = [];

        $fechaIni = new DateTime($fecha1);
        $fechaFin = new DateTime($fecha2);
        $fechaFin->add(new DateInterval('P1D'));

        $period = new DatePeriod(
            new DateTime($fechaIni->format('Y-m-d')),
            new DateInterval('P1D'),
            new DateTime($fechaFin->format('Y-m-d'))
        );
    
        foreach ($period as $key => $value) {
            
            $rtnTemp = array("dia" => $value->format('d'),
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

    public function db_get_AuditoriaGraficoTipoVistaByAnuncioAndFecha($id, $fecha1, $fecha2) {
        $this->db->trans_start(); 

        $rtn = [];

        $fechaIni = new DateTime($fecha1);
        $fechaFin = new DateTime($fecha2);
        $fechaFin->add(new DateInterval('P1D'));

        $period = new DatePeriod(
            new DateTime($fechaIni->format('Y-m-d')),
            new DateInterval('P1D'),
            new DateTime($fechaFin->format('Y-m-d'))
        );
    
        foreach ($period as $key => $value) {
            
            $rtnTemp = array("dia" => $value->format('d'),
                            "vistas_pc" => "0",
                            "vistas_movil" => "0");

            $result = $this->db->query('SELECT "VISTA_PC" tipo, COUNT(*) valor FROM acciones_anuncios
                                WHERE id_anuncio=? AND DATE(`fecha_accion`) = ? AND tipo="VISTA_PC"
                                UNION
                                SELECT "VISTA_MOVIL" tipo, COUNT(*) valor FROM acciones_anuncios
                                WHERE id_anuncio=? AND DATE(`fecha_accion`) = ? AND tipo="VISTA_MOVIL"', array($id, $value->format('Y-m-d'), $id, $value->format('Y-m-d')));
            $datos = $result->result_array();
            $result->free_result();

            foreach ($datos as $keyD => $dato) {
                if($dato["tipo"] == "VISTA_PC"){
                    $rtnTemp["vistas_pc"] = $dato["valor"];
                }
                if($dato["tipo"] == "VISTA_MOVIL"){
                    $rtnTemp["vistas_movil"] = $dato["valor"];
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

    public function db_get_GraficoInversionByAnuncioAndFecha($id, $fecha1, $fecha2) {
        $this->db->trans_start(); 

        $result = $this->db->query('SELECT DATE_FORMAT(p.`fecha_inicial`, "%d/%m") fecha, SUM(o.`valor`) valor FROM `paquetes_anuncios` p
                                JOIN `opciones_paquetes` o ON p.`idOpcPaq`=o.`id`
                                WHERE p.`fecha_inicial` BETWEEN ? AND ? AND p.`idAnuncio`=?
                                GROUP BY p.`fecha_inicial`
                                ORDER BY p.`fecha_inicial` ASC;', array($fecha1, $fecha2, $id));
        $datos = $result->result_array();
        $result->free_result();


        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $datos);
        }
    }

    public function db_get_GraficoInversionTotalTipoByAnuncioAndFecha($id) {
        $this->db->trans_start(); 

        $result = $this->db->query('SELECT pa.nombre tipo, SUM(o.`valor`) valor FROM paquetes_anuncios p
                                    JOIN `opciones_paquetes` o ON p.`idOpcPaq`=o.`id`
                                    JOIN `paquetes` pa ON o.`idPaquete`=pa.id
                                    WHERE p.`idAnuncio`=?
                                    GROUP BY pa.nombre
                                    ORDER BY pa.nombre DESC;', array($id));
        $datos = $result->result_array();
        $result->free_result();


        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $datos);
        }
    }

    public function db_get_AuditoriaVistasPorHoras($idAnuncio) {
        $this->db->trans_start(); 

        $rtn = [];

        $fechaIni = new DateTime("2010-10-10 00:00:00");
        $fechaFin = new DateTime("2010-10-10 24:01:00");

        $period = new DatePeriod(
            new DateTime($fechaIni->format('Y-m-d H:i:s')),
            new DateInterval('PT2H'),
            new DateTime($fechaFin->format('Y-m-d H:i:s'))
        );

        $lastHour = "";

        foreach ($period as $key => $value) {
            if(!$lastHour == ""){
                $result = $this->db->query('SELECT COUNT(*) total FROM `acciones_anuncios` WHERE tipo="VISTA" AND 
                                            TIME(`fecha_accion`) BETWEEN ? AND ? AND id_anuncio=?', array($lastHour->format('H:i'), (($value->format('H:i')=="00:00")?"23:59":$value->format('H:i')), $idAnuncio));
                $datos = $result->result_array();
                $result->free_result();

                $arrayTemp["rango"] = $lastHour->format('ga')." / ".$value->format('ga');
                $arrayTemp["vistas"] = $datos[0]["total"];

                $rtn[] = $arrayTemp;
            }

            $lastHour = $value;
        }

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $rtn);
        }
    }

    public function db_get_HistoricoComprasByAnuncioAndFecha($id, $fecha1, $fecha2) {
        $this->db->trans_start(); 

        $result = $this->db->query('SELECT paq.`nombre` tipo, CONCAT(pa.`fecha_inicial`," ", pa.`hora_inicial`) inicio,
                        CONCAT(pa.`fecha_final`," ",pa.`hora_final`) fin, pa.estado, pa.`fecha_compra`, op.`valor` FROM `paquetes_anuncios` pa
                    JOIN `opciones_paquetes` op ON pa.`idOpcPaq`=op.`id`
                    JOIN `paquetes` paq ON op.`idPaquete`=paq.`id`
                    WHERE pa.`idAnuncio`=? AND pa.`fecha_compra` BETWEEN ? AND ?
                    ORDER BY `fecha_compra` ASC', array($id, $fecha1, $fecha2));
        $datos = $result->result_array();
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $datos);
        }
    }

    public function db_get_ConsolidadoTotalPromociones($id) {
        $this->db->trans_start(); 
        $result = $this->db->query('SELECT pa.`nombre` tipo, COUNT(*) total FROM paquetes_anuncios p
                                    JOIN `opciones_paquetes` o ON p.`idOpcPaq`=o.`id`
                                    JOIN `paquetes` pa ON o.`idPaquete`=pa.id
                                    WHERE pa.id = 2 AND p.`idAnuncio`=?
                                    UNION
                                    SELECT pa.`nombre` tipo, COUNT(*) total FROM paquetes_anuncios p
                                    JOIN `opciones_paquetes` o ON p.`idOpcPaq`=o.`id`
                                    JOIN `paquetes` pa ON o.`idPaquete`=pa.id
                                    WHERE pa.id = 3 AND p.`idAnuncio`=?
                                    UNION
                                    SELECT pa.`nombre` tipo, COUNT(*) total FROM paquetes_anuncios p
                                    JOIN `opciones_paquetes` o ON p.`idOpcPaq`=o.`id`
                                    JOIN `paquetes` pa ON o.`idPaquete`=pa.id
                                    WHERE pa.id = 4 AND p.`idAnuncio`=?;', array($id, $id, $id));
        $a = $result->result_array();
        $result->free_result();
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
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

    public function db_save_feedback($idUsuario, $votacion, $estrellas, $mensaje) {
        $this->db->trans_start(); 
        $this->db->query('INSERT INTO `feedback`(`idUsuario`, `votacion`, `estrellas`, `mensaje`, `fecha_creacion`) VALUES (?,?,?,?,NOW())', array($idUsuario, $votacion, $estrellas, $mensaje));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Sugerencia guardada satisfactoriamente");
        }
    }

    public function db_save_ticket_support($idUsuario, $idConcepto, $mensaje) {
        $this->db->trans_start(); 
        $this->db->query('INSERT INTO `soporte`(`idConcepto`, `mensaje`, `idUsuario`, `fechaCreacion`) VALUES (?,?,?,NOW());', array($idConcepto, $mensaje, $idUsuario));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Ticket enviado a soporte satisfactoriamente, Pronto se te respondera via correo electronico.");
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
            return array("resultado" => true, "message" => "Denuncia enviada satisfactoriamente");
        }
    }

    public function db_get_promocionesByTipoAndDia($idPaquete, $dias) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT * FROM `opciones_paquetes` WHERE `idPaquete`=? AND dias =? ORDER BY horas', array($idPaquete, $dias));
        $a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_conceptosSoportes() {
        $this->db->trans_start();

        $result = $this->db->query('SELECT * FROM `conceptos_soporte`');
        $a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_promociones_relojitoActivasByAnuncio($idAnuncio) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT TIME_FORMAT(`hora_inicial`, "%h:%i %p") hora_inicial FROM paquetes_anuncios WHERE idOpcPaq=1 AND (`fecha_final` > DATE(NOW()) OR 
                                ( `fecha_final` = DATE(NOW()) AND `hora_final` > TIME(NOW())))
                                AND `estado`="VIGENTE" AND idAnuncio=?', array($idAnuncio));
        $a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_promociones_diffDiasByAnuncioAndOpcion($idAnuncio, $idOpcion) {
        $this->db->trans_start();

        $result = $this->db->query('SELECT DATEDIFF(`fecha_final`, DATE(NOW())) diff FROM `paquetes_anuncios` 
                        WHERE idAnuncio=? AND `idOpcPaq`=? AND estado="VIGENTE" AND 
                        DATE(NOW()) BETWEEN `fecha_inicial` AND `fecha_final`', array($idAnuncio, $idOpcion));
        $a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
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

    public function db_get_anunciosByUser($idUsuario) {
        $this->db->trans_start();

		$resultAnuncios = $this->db->query("SELECT a.id, `titulo`, `descripcion`,  ciu.nombre ciudad, a.`fecha_creacion`,
        cate.nombre categoria, IFNULL(DATE_FORMAT(a.`fecha_ultima_edicion`, '%d/%m/%Y - %H:%i'), 'Sin ediciones') fechaUltEdicionFormat, 
            IFNULL((SELECT url FROM imagenes_anuncios i WHERE i.id_anuncio=a.id LIMIT 1), '../../images/default_img.svg') url,
            IFNULL((SELECT 1 FROM `paquetes_anuncios` WHERE `idOpcPaq` NOT IN (14, 15) AND DATE(NOW()) 
                BETWEEN `fecha_inicial` AND `fecha_final` AND TIME(NOW()) BETWEEN `hora_inicial` 
                AND `hora_final` AND `estado`='VIGENTE' AND `idAnuncio`=a.id LIMIT 1),0) isTop
            FROM anuncios a 
            JOIN ciudades ciu ON a.`id_ciudad`=ciu.`id`  
            JOIN categorias cate ON a.`id_categoria`=cate.`id` 
            WHERE a.`id_usuario`=? AND a.estado=1 ORDER BY `fecha_creacion` DESC", array($idUsuario));
		$anuncios = $resultAnuncios->result_array();
        $resultAnuncios->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $anuncios);
        }
    }
    
    public function db_delete_anuncio($idAnuncio) {
        $this->db->trans_start(); 
		$this->db->query('UPDATE anuncios SET estado=0 WHERE id=?', array($idAnuncio));
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Anuncio eliminado satisfactoriamente");
        }
    }

    public function db_get_FechasAnuncioById($id) {
        $this->db->trans_start();

        $result = $this->db->query("SELECT DATE_FORMAT(`fecha_creacion`, '%d/%m/%Y - %H:%i') fechaCreacionFormat,
                IFNULL(DATE_FORMAT(`fecha_ultima_edicion`, '%d/%m/%Y - %H:%i'), 'Sin ediciones') fechaUltEdicionFormat
                FROM anuncios WHERE id=?", array($id));
		$a = $result->result_array();
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_paramsPayments() {
        $this->db->trans_start();

        $result = $this->db->query("SELECT * FROM `params_payment`");
		$a = $result->result_array();
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_validIfExist_anuncio($id) {
        $this->db->trans_start();

        $result = $this->db->query("SELECT * FROM `anuncios` WHERE id=? AND estado=1", array($id));
        $a = $result->result_array();
        $result->free_result();
        
        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "result" => (count($a)>0)?true:false);
        }
    }

    public function db_get_dataCreditosById($id) {
        $this->db->trans_start();

        $result = $this->db->query("SELECT * FROM `precios_creditos` WHERE id=?", array($id));
		$a = $result->result_array();
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_get_NextInvoice() {
        $this->db->trans_start();

        $this->db->query("UPDATE `params_payment` SET `lastInvoice`=`lastInvoice`+1;");

        $result = $this->db->query("SELECT lastInvoice FROM `params_payment`");
		$a = $result->result_array()[0]["lastInvoice"];
        $result->free_result();

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
    }

    public function db_insert_compra($ref_payco) {
        $this->db->trans_start();

        $this->db->query("INSERT INTO `historico_movimientos` (`idExterno`) VALUES (?);", array($ref_payco));

        if ($this->db->_error_number()) {
            return false;
        } else {
            $this->db->trans_complete();
            return true;
        }
    }

    public function db_gestion_compras($data) {
        $this->db->trans_start();

        $this->db->query("INSERT INTO `auditoria_compras` (`idExterno`, `idUsuario`, `creditos_comprados`, `valor`, `fecha_transaction`, `estado`, `descripcion`) VALUES (?,?,(SELECT creditos FROM `precios_creditos` WHERE id=?),?,?,?,?)", array($data["ref_payco"], $data["idUsuario"], $data["idCredito"], $data["valor"], $data["fechaTransaction"], $data["resultado"], $data["text_resultado"]));

        if((int) $data["codeResultado"] == 1 || (int) $data["codeResultado"] == 3){

            $resultValid = $this->db->query("SELECT * FROM `historico_movimientos` where idExterno=? and estado=0", array($data["ref_payco"]));
            $valid = $resultValid->result_array();
            $resultValid->free_result();

            if(count($valid)>0){
                $this->db->query("UPDATE `historico_movimientos` SET `invoice`=?, valor=?, `idCredito`=?, `fecha_accion`=NOW(), `idUsuario`=?, `estado`=1 WHERE idExterno=? AND estado=0;", array($data["num_factura"], $data["valor"], $data["idCredito"], $data["idUsuario"], $data["ref_payco"]));

                $result = $this->db->query("SELECT * FROM `movimientos` where idUsuario=?", array($data["idUsuario"]));
                $a = $result->result_array();
                $result->free_result();

                if(count($a)>0){
                    $this->db->query("UPDATE movimientos SET `cantidad` = `cantidad`+(SELECT creditos FROM `precios_creditos` WHERE id=?) WHERE idUsuario=?", array($data["idCredito"], $data["idUsuario"]));
                }else{
                    $this->db->query("INSERT INTO `movimientos`(`idUsuario`, `cantidad`) VALUES (?,(SELECT creditos FROM `precios_creditos` WHERE id=?))", array($data["idUsuario"], $data["idCredito"]));
                }
            }else{
                // ***********************************
            }

        }

        if ($this->db->_error_number()) {
            return array("resultado" => false);
        } else {
            $this->db->trans_complete();
            return array("resultado" => true);
        }
    }

    public function db_insert_promocion_anuncio($idAnuncio, $idOpcion, $fechaHoraI, $fechaHoraF, $idUsuario) {
        $this->db->trans_start(); 
        
        $resultValid = $this->db->query('SELECT IF((`cantidad`-valor)>=0,1,0) rtn FROM (SELECT `cantidad`, (SELECT valor FROM `opciones_paquetes` WHERE id=?) valor FROM `movimientos` WHERE `idUsuario`=?) q', array($idOpcion, $idUsuario));
        $valid = $resultValid->result_array();
        $resultValid->free_result();
        if($valid[0]["rtn"] == "0"){
            return array("resultado" => false, "message" => "No tienes suficientes creditos para la compra");
        }
        

        // VALIDACIONES POR TIPOS DE PAQUETES

        if($idOpcion == 1){
            $resultValid2 = $this->db->query('SELECT * FROM paquetes_anuncios WHERE idOpcPaq=1 AND (`fecha_final` > DATE(NOW()) OR ( `fecha_final` = DATE(NOW()) AND `hora_final` > TIME(NOW()))) AND `estado`="VIGENTE" AND `hora_inicial`=TIME(?) AND idAnuncio=?', array($fechaHoraI, $idAnuncio));
            $valid2 = $resultValid2->result_array();
            $resultValid2->free_result();
            if(count($valid2)>0){
                return array("resultado" => false, "message" => "Ya tienes esta hora escogida");
            }
        }

        if($idOpcion == 14 || $idOpcion == 15){

            if($idOpcion == 14){
                $resultValid3 = $this->db->query('SELECT * FROM `paquetes_anuncios` WHERE idAnuncio=? AND `idOpcPaq`=15 AND estado="VIGENTE" AND DATE(NOW()) BETWEEN `fecha_inicial` AND `fecha_final`', array($idAnuncio));
                $valid3 = $resultValid3->result_array();
                $resultValid3->free_result();
                if(count($valid3)>0){
                    $this->db->query('DELETE FROM paquetes_anuncios where id=?', array($valid3[0]["id"]));  
                }
            }

            if($idOpcion == 15){
                $resultValid4 = $this->db->query('SELECT * FROM `paquetes_anuncios` WHERE idAnuncio=? AND `idOpcPaq`=14 AND estado="VIGENTE" AND DATE(NOW()) BETWEEN `fecha_inicial` AND `fecha_final`', array($idAnuncio));
                $valid4 = $resultValid4->result_array();
                $resultValid4->free_result();
                if(count($valid4)>0){
                    $this->db->query('DELETE FROM paquetes_anuncios where id=?', array($valid4[0]["id"]));  
                }
            }

            $resultValidDes = $this->db->query('SELECT * FROM `paquetes_anuncios` WHERE idAnuncio=? AND `idOpcPaq`=? AND estado="VIGENTE" AND DATE(NOW()) BETWEEN `fecha_inicial` AND `fecha_final`', array($idAnuncio, $idOpcion));
            $validDes = $resultValidDes->result_array();
            $resultValidDes->free_result();
            if(count($validDes)>0){
                $this->db->query('UPDATE `paquetes_anuncios` SET `fecha_final` = DATE_ADD(`fecha_final`, INTERVAL 30 DAY) WHERE id=?', array($validDes[0]["id"]));

                $this->db->query('UPDATE `movimientos` SET `cantidad` = (`cantidad` - (SELECT valor FROM `opciones_paquetes` WHERE id=?)) WHERE `idUsuario`=?', array($idOpcion, $idUsuario));

                $this->db->trans_complete();
                return array("resultado" => true, "message" => "Tiempo adicionado satisfactoriamente");
            }
        }

        $this->db->query('INSERT INTO `paquetes_anuncios`(`idAnuncio`, `idOpcPaq`, `fecha_inicial`, `fecha_final`, `hora_inicial`, `hora_final`, fecha_compra) VALUES(?,?,date(?),date(?),time(?),time(?), NOW())', array($idAnuncio, $idOpcion, $fechaHoraI, $fechaHoraF, $fechaHoraI, $fechaHoraF));

        $this->db->query('UPDATE `movimientos` SET `cantidad` = (`cantidad` - (SELECT valor FROM `opciones_paquetes` WHERE id=?)) WHERE `idUsuario`=?', array($idOpcion, $idUsuario));

        if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Anuncio promocionado satisfactoriamente");
        }
    }



}