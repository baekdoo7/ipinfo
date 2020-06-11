<?php

//메모리사이즈와 실행시간 프리...
ini_set("max_execution_time",3000);
ini_set("memory_limit",-1);
date_default_timezone_set('Asia/Seoul');

require '../vendor/autoload.php';

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$bucket = 'adop-amp-test';
$keyname = 'test/300x250.jpg';

$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'ap-northeast-2'
]);

try {
    // Get the object.
    $result = $s3->getObject([
        'Bucket' => $bucket,
        'Key'    => $keyname
    ]);

    // Display the object in the browser.
    header("Content-Type: {$result['ContentType']}");
    echo $result['Body'];
} catch (S3Exception $e) {
    echo $e->getMecssage() . PHP_EOL;
}





$rawData = file_get_contents("php://input");
$rawObj = json_decode($rawData,false);

if(!empty($rawData)){
    flog($rawData);
}

 if(!empty($rawObj)){
     //var_dump($rawObj->Records[0]->s3->object->key);
     if(!empty($rawObj->Records[0]->s3->object->key)){
         flog(date("Y-m-d H:i:s")."\t". $rawObj->Records[0]->s3->object->key);
     }
     //var_dump($rawObj);
 }

//if($rawData != ""){
//    flog($rawData);
//}

//echo "현재날짜 : ".date("Y-m-d H:i:s");

//flog("001 : test");

function flog($conts){
    $logFile = fopen("baekdoo.log", "a") or die("Unable to open file!");
    fwrite($logFile,$conts);
    fwrite($logFile,"\n");
    fclose($logFile);
}


?>