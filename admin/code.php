<?php
    header("Cache-Control: max-age=1, s-maxage=1, no-cache, must-revalidate");
	header("Content-type: image/png;charset=utf-8");
    $num = $_GET['n'];
    $size = $_GET['s'];
    $width = $_GET['w'];
    $height = $_GET['h'];
    $space = $width / $num * 4 / 5;
    $str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW";
    $code = [];
    for($i=0;$i<$num;$i++){
        $code[]=$str[mt_rand(0,strlen($str)-1)];
    }
    $image = imagecreatetruecolor($width,$height);
    $bg_color = imagecolorallocate($image,233,233,233);
    imagefilledrectangle($image,0,0,$width,$height,$bg_color);
    for($i=0;$i<$num;$i++){
		$txt_color = imagecolorallocate($image, mt_rand(0, 120), mt_rand(0, 120), mt_rand(0, 120));
		$ang = mt_rand(-30, 30);
		imagettftext($image, $size, $ang, ($i+1)*$space, $size + 5, $txt_color, 'c:\WINDOWS\Fonts\consola.ttf', $code[$i]);
	}
	//干扰线
	for ($i = 0; $i < 5; $i++) {
		$font_color = imagecolorallocate($image, mt_rand(0, 255), mt_rand(0, 255), mt_rand(0, 255));
		imagearc($image, mt_rand(-$width, $width), mt_rand(-$height, $height), mt_rand(30, $width * 2), mt_rand(20, $height * 2), mt_rand(0, 360), mt_rand(0, 360), $font_color);
	}
	// 画干扰点
	for ($i = 0; $i < 50; $i++) {
		$font_color = imagecolorallocate($image, mt_rand(0, 255), mt_rand(0, 255), mt_rand(0, 255));
		imagesetpixel($image, mt_rand(0, $width), mt_rand(0, $height), $font_color);
	}
	
	
	//生成图片
	imagepng($image);
	//销毁图片
	imagedestroy($image);
	
	//使用session保存验证码
	session_start();
	$_SESSION["code"] = implode("", $code);

?>