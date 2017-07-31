<?php
    $file = file_get_contents('user.json');
    $obj = json_decode($file);
    if(isset($obj->userinfo)){
        $hasUser = 0;
        foreach($obj->userinfo as $item){
            if($item->user === $_POST['u']){
                $hasUser = 1;
                if($item->pwd === $_POST['p']){
                    echo '{"type":"success","code":"2"}';
                    exit;
                }else{
                    echo '{"type":"error","code":"1"}';
                    exit;
                }
            }
        }
        if($hasUser === 0){
            echo '{"type":"error","code":"0"}';
        }
    }else{
        echo '{"type":"error","code":"0"}';
    }


?>