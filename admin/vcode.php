<?php
    $code = $_GET['code'];
    session_start();
    $vcode = $_SESSION['code'];
    if(strtolower($code) === strtolower($vcode)){
        echo '{"result":"success"}';
    }else{
        echo '{"result":"fail"}';
    }
?>