<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class utiles extends CI_Model {

    function __construct() {
        parent::__construct();	
    }

    public function generateRandomString($length = 5) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function generateSignaturePayment($apiKey, $MerchantId, $Reference, $valor) {
       $rtn = $apiKey."~".$MerchantId."~".$Reference."~".$valor."~"."COP";
       $rtn = md5($rtn); 
       return $rtn;
    }
    




}