<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


if (!function_exists('load_img_url'))
{
    function load_img_url($src){
        
        return base_url().$src;
    }   
    
}