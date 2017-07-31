<?php
    $file = file_get_contents("user.json");
    $obj = json_decode($file);
    if(isset($obj->userinfo)){
        foreach($obj->userinfo as $item){
            if($item->user === $_POST['u']){
                echo '{"type":"error","code":"0"}';//代表用户名重复
                exit;
            }
        }
    }
    $user = ["user"=>$_POST['u'],'pwd'=>$_POST['p']];
    $obj->userinfo[]=$user;
    $objstr = json_encode($obj);
    file_put_contents('user.json',$objstr);
    echo '{"type":"success","code":"1","userinfo":'.$objstr.'}';
?>