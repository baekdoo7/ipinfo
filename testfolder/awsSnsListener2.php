<?php
//에러 출력
error_reporting(E_ALL);
ini_set('display_errors', '1');

//메모리사이즈와 실행시간 프리...
ini_set("max_execution_time",3000);
ini_set("memory_limit",-1);
date_default_timezone_set('Asia/Seoul');

define("TARGET_FOLDER","./test"); //타게팅 대상폴더
define("DEBUG_MODE",false); //포스트값으로 넘어온거 파일에 기록
define("LOG_FILE","baekdoo.log"); //로그 파일명
define("ERRORLOG_FILE","baekdoo_error.log"); //로그 파일명

require '../vendor/autoload.php';

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

getNewObject();



//인풋 스트링 처리
function getNewObject(){
    $rawData = file_get_contents("php://input");
    $rawObj = json_decode($rawData,false);



    if(!empty($rawData)){
        //객체로 전달한 내용 저장
        flog($rawData);
    }
    else{//객체로 전달된 내용이 없으면 리턴하고 끝냄.
        return;
    }

    if(!empty($rawObj)){
        //var_dump($rawObj->Records[0]->s3->object->key);
        if(!empty($rawObj->Records[0]->s3->object->key)){
            //flog(date("Y-m-d H:i:s")."\t". $rawObj->Records[0]->s3->bucket->name);
            //flog(date("Y-m-d H:i:s")."\t". $rawObj->Records[0]->s3->object->key);
            $bucketName = $rawObj->Records[0]->s3->bucket->name;
            $fullFileName   = $rawObj->Records[0]->s3->object->key;
            $pathArr = explode("/",$fullFileName);
                if($bucketName == "adop-amp-test"){ // adop-amp-test
                    if(!empty($fullFileName)){
                        $origin      = $fullFileName;
                        $fileName = array_pop($pathArr);
                        $destination = "/Data/ad_info/".implode($pathArr,"/");
                        saveChangeObject($bucketName,$origin,$destination,$fileName);
                    }
                }
                elseif ($bucketName == "compass.adop.cc"){ //콤파스
                    if(!empty($fullFileName)){
                        $origin      = $fullFileName;
                        $fileName = array_pop($pathArr);
                        if($pathArr[0] == "adinfo_2018"){
                            array_shift($pathArr);
                            $destination = "/Data/ad_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "areainfo"){
                            array_shift($pathArr);
                            $destination = "/Data/area_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "domain_list"){
                            array_shift($pathArr);
                            $destination = "/Data/ad_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "network_list"){
                            array_shift($pathArr);
                            $destination = "/Data/area_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "app_label_info"){
                            array_shift($pathArr);
                            $destination = "/Data/app_label_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "bidmad_info"){
                            array_shift($pathArr);
                            $destination = "/Data/bidmad_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "ecpm_rev_info"){
                            array_shift($pathArr);
                            $destination = "/Data/ecpm_rev_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "change_info"){
                            array_shift($pathArr);
                            $destination = "/Data/change_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "native_info"){
                            array_shift($pathArr);
                            $destination = "/Data/native_info/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        else{
                            return;
                        }
                    } // 변경파일명이 없으면

                } // 버킷이 compass.adop.cc 면
                elseif ($bucketName == "new.atom"){ //아톰화일이면
                    if(!empty($fullFileName)){
                        $origin      = $fullFileName;
                        $fileName = array_pop($pathArr);
                        if($pathArr[0] == "status"){
                            if($pathArr[1] == "target"){
                                array_shift($pathArr);
                                array_shift($pathArr);
                                $destination = "/Data/atom_serving/ad_info/status/target/".implode($pathArr,"/");
                                saveChangeObject($bucketName,$origin,$destination,$fileName);
                                if(!preg_match("/\.json/",$fileName,$tmpaa)){// *.json이 아니면 콤파스에 한번더 복사
                                    $destination = "/Data/ad_info/RT/".implode($pathArr,"/");
                                    saveChangeObject($bucketName,$origin,$destination,$fileName);
                                }
                            }
                            elseif ($pathArr[1] == "text"){
                                array_shift($pathArr);
                                array_shift($pathArr);
                                $destination = "/Data/atom_serving/ad_info/status/text/".implode($pathArr,"/");
                                saveChangeObject($bucketName,$origin,$destination,$fileName);
                            }
                            elseif ($pathArr[1] == "video"){
                                array_shift($pathArr);
                                array_shift($pathArr);
                                $destination = "/Data/atom_serving/ad_info/status/video/".implode($pathArr,"/");
                                saveChangeObject($bucketName,$origin,$destination,$fileName);
                            }
                            elseif ($pathArr[1] == "roadblock"){
                                array_shift($pathArr);
                                array_shift($pathArr);
                                $destination = "/Data/atom_serving/ad_info/status/roadblock/".implode($pathArr,"/");
                                saveChangeObject($bucketName,$origin,$destination,$fileName);
                            }
                            else{
                                return;
                            }
                        }
                        elseif ($pathArr[0] == "iptarget"){
                            array_shift($pathArr);
                            array_shift($pathArr);
                            $destination = "/Data/atom_serving/iptarget/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        elseif ($pathArr[0] == "sales_fee"){
                            array_shift($pathArr);
                            array_shift($pathArr);
                            $destination = "/Data/atom_serving/sales_fee/".implode($pathArr,"/");
                            saveChangeObject($bucketName,$origin,$destination,$fileName);
                        }
                        else{
                            return;
                        }

                    } // 변경파일명이 없으면
                }
                else{ //기타 버킷이 compass.adop.cc,new.atom,adop-amp-test 이 아니면
                    return;
                }
        }
    }

}

//변경 화일 로컬에 저장
function saveChangeObject($bucket,$fname,$targetPath,$fileName){

    $s3 = new S3Client([
        'version' => 'latest',
        'region'  => 'ap-northeast-2'
    ]);

    try {
        // Get the object.
        $result = $s3->getObject([
            'Bucket' => $bucket,
            'Key'    => $fname
        ]);

        if(is_dir($targetPath)){//디렉토리가 존재 하면
            saveFile($targetPath."/".$fileName,$result['Body']);
        }
        else{//데렉토리가 없으면
            mkdir($targetPath,0777,true);
            saveFile($targetPath."/".$fileName,$result['Body']);
        }

        //화일로 저장


        // Display the object in the browser.
        //header("Content-Type: {$result['ContentType']}");
        //echo $result['Body'];
        //파일로 저장

    } catch (S3Exception $e) {
        //echo $e->getMecssage() . PHP_EOL;
        errorLog($e->getMessage());
        exit;
    }

}

//로그 파일에 기록
function flog($conts){
    $logFile = fopen(LOG_FILE, "a") or die("Unable to open file!");
    fwrite($logFile,$conts);
    fwrite($logFile,"\n");
    fclose($logFile);
}
//에러로그 파일에 기록
function errorLog($conts){
    $logFile = fopen(ERRORLOG_FILE, "a") or die("Unable to open file!");
    fwrite($logFile,$conts);
    fwrite($logFile,"\n");
    fclose($logFile);
}
function saveFile($path,$conts){
    $logFile = fopen($path, "w") or die("Unable to open file!");
    fwrite($logFile,$conts);
    fclose($logFile);
}
exit("Hi~~~");
/////////////////////////////////////////////////////////



?>