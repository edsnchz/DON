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
    
    public function consumeRest($url, $key, $postData) {                
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
            CURLOPT_POST => 10,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_COOKIEFILE => 'cookie.txt',
            CURLOPT_COOKIEJAR => 'cookie.txt',
            CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'Authorization: Bearer ' . $key),
            CURLOPT_POSTFIELDS =>  $postData,
        ));
        // Send the request
        $response = curl_exec($ch);
        // Check for errors
        if($response === FALSE){
         die(curl_error($ch));
        }
        // Decode the response
        $responseData = json_decode($response, TRUE);            
        return $responseData;          
    }  

    public function encryptIt($q) {
        $cryptKey = 'qJB0rGtIn5UB1xG03efyCp';
        $qEncoded = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($cryptKey), $q, MCRYPT_MODE_CBC, md5(md5($cryptKey))));
        return $qEncoded;
    }

    public function decryptIt($q) {
        $cryptKey = 'qJB0rGtIn5UB1xG03efyCp';
        $qDecoded = rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, md5($cryptKey), base64_decode($q), MCRYPT_MODE_CBC, md5(md5( $cryptKey))), "\0");
        return $qDecoded;
    }

}