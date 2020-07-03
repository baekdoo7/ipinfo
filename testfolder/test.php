<?php



$tmp = "/Users/baekdoo/Documents/workspace/IPINFO/testfolder/123/1234.json";


echo preg_match("/\.json/",$tmp,$tmpaa)."<br />\n";

var_dump(is_dir($tmp));

exit("\n exit");
$tmp = explode("/","data/123/문어/tiger/lion.txt");

var_dump($tmp);
array_shift($tmp);
array_shift($tmp);
$test = implode($tmp,"/");
echo $test;
//saveFile("kkk/test.txt"," 문어");

//디렉토리 생성

$user = array("name" => "userId",
    "password" => "userPwd",
    "emailAddress" => "user@example.com",
    "displayName" => "< USER DISPLAY NAME >",
    "notification" => "true");

$json = json_encode($user);
print("$json\n");


$http_status = 0;

$url = "http://15.164.238.2/awsSnsListener.php";
$ret = Curl($url, $json, $http_status) ;
var_dump($ret);

function saveFile($path,$conts){
    $logFile = fopen($path, "w") or die("Unable to open file!");
    fwrite($logFile,$conts);
    fclose($logFile);
}
?>


sudo /usr/bin/rsync -av -e "ssh -i /Data/adop-platon-korea.pem" ec2-user@172.31.4.60:/Data/ /Data/
