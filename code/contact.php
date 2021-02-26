<?php

$jsonResult = $_POST['params'];
$json = json_decode($jsonResult, true);

foreach ($json as $key => $arr) {
    foreach ($arr as $key2 => $arr2) {
        echo 'Tu nombre es: '.$arr2['name'].'</br>';
        echo 'Tu apellido es: '.$arr2['email'].'</br>';
        echo 'Tu edad es: '.$arr2['subject'].'</br>';
        echo 'Tu edad es: '.$arr2['message'].'</br>';
    }
}

?>