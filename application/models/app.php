<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class app extends CI_Model {
	private static $db;
	function __construct(){
		parent::__construct();	
		self::$db = &get_instance()->db;	
	}

	public function db_insert_usuario($correo, $pass, $token) {

		if($correo == "" || $pass == "" || $token == ""){
			return array("resultado" => false, "message" => "Los datos ingresados son erroneos");
		}

		$result = $this->db->query('SELECT * FROM usuarios where correo=?', array($correo));
		$a = $result->result_array();
		$result->free_result();

		if(count($a)>0){
			return array("resultado" => false, "message" => "El correo ingresado ya se encuentra registrado");
		}


		$this->db->query('insert into usuarios (correo, pass, token_email) values(?,?,?)', array($correo, $pass, $token));
		if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "El usuario se ingreso satisfactoriamente, porfavor verifique su correo");
        }
	}

	public function db_setNewPass_usuario($correo, $pass) {

		if($correo == "" || $pass == ""){
			return array("resultado" => false, "message" => "Los datos ingresados son erroneos");
		}

		$result = $this->db->query('SELECT * FROM usuarios where correo=?', array($correo));
		$a = $result->result_array();
		$result->free_result();

		if(count($a) == 0){
			return array("resultado" => false, "message" => "El correo ingresado no se encuentra registrado");
		}

		$this->db->query('UPDATE `usuarios` SET pass=? WHERE correo=?', array($pass, $correo));
		if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Contraseña reestablecida satisfactoriamente, porfavor verifique su correo");
        }
	}

	public function db_get_usuario($correo, $pass) {
		$result = $this->db->query('SELECT * FROM usuarios where correo=? and pass=? and estado=1', array($correo, $pass));
		$a = $result->result_array();
        $result->free_result();
        return $a;
	}
	
	public function db_valid_tokenEmail($token) {
		$result = $this->db->query('select * from usuarios where token_email=?', array($token));
		$a = $result->result_array();
		if(count($a)>0){
			$this->db->query('update usuarios set estado = 1, token_email= "-" where id=?', array($a[0]["id"]));
			return array("resultado" => true, "message" => "El usuario fue validado satisfactoriamente");
		}else{
			return array("resultado" => false, "message" => "Token invalido!");
		}
    }
	

	
}