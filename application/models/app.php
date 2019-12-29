<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class app extends CI_Model {
	private static $db;
	function __construct(){
		parent::__construct();	
		$this->load->model('utiles');	
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

		$encrypterPass = $this->utiles->encryptIt($pass);
		$this->db->query('insert into usuarios (correo, pass, token_email) values(?,?,?)', array($correo, $encrypterPass, $token));
		
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

		$encrypterPass = $this->utiles->encryptIt($pass);
		$this->db->query('UPDATE `usuarios` SET pass=? WHERE correo=?', array($encrypterPass, $correo));

		if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Contraseña reestablecida satisfactoriamente, porfavor verifique su correo");
        }
	}

	public function db_user_getPass($idUsuario) {

		$result = $this->db->query('SELECT pass FROM usuarios where id=?', array($idUsuario));
		$a = $result->result_array();
		$result->free_result();

		$a[0]["pass"] = $this->utiles->decryptIt($a[0]["pass"]);

		if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "data" => $a);
        }
	}

	public function db_user_changePass($idUsuario, $lastpass, $newpass) {

		if($newpass == ""){
			return array("resultado" => false, "message" => "Los datos ingresados son erroneos");
		}

		$this->db->query('INSERT INTO `auditoria_cambio_pass` (idUsuario, `lastpass`, `newpass`, `fecha_accion`) VALUES(?,?,?,NOW());', array($idUsuario, $this->utiles->encryptIt($lastpass), $this->utiles->encryptIt($newpass)));

		$encrypterPass = $this->utiles->encryptIt($newpass);
		$this->db->query('UPDATE `usuarios` SET pass = ? WHERE id=?', array($encrypterPass, $idUsuario));


		if ($this->db->_error_number()) {
            return array("resultado" => false, "message" => $this->db->_error_message());
        } else {
            $this->db->trans_complete();
            return array("resultado" => true, "message" => "Se cambio la contraseña satisfactoriamente");
        }
	}

	public function db_get_usuario($correo, $pass) {
		$encrypterPass = $this->utiles->encryptIt($pass);
		$result = $this->db->query('SELECT * FROM usuarios where correo=? and pass=? and estado=1', array($correo, $encrypterPass));
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