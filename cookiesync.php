<?php
/*
 * @file    cookiesync.php
 * @param   dsp : 외부 dsp 식별자
 * @brief   외부 dsp와 쿠키를 공유(쿠키싱크)하기 위한 파일
 * @date    2019.10.08
 * @author  baekdoo(baekdoo@adop.cc)
 * @testurl http://compass.adop.cc/cookiesync.php?dsp=nhnace
 * @usage   <img src="cookiesync.php?dsp=nhnace" width="1" height="1" style="display:none"  />
 * */

date_default_timezone_set('UTC');


//dsp 값 읽어오기
$dsp_cd = isset($_GET['dsp'])?$_GET['dsp']:'';

//dsp에 따른 액션 정리
switch ($dsp_cd){
    case    'nhnace':
                nhnace_go();
                break;
    case    'test102':
                test102();
                break;
    default :
        other_go();
}

//test용 처리
function test102(){
    echo set_cid();
}

//$dsp_cd가 잘못 되었을때 처리로직(1x1 이미지출력)
function other_go(){
    header('Content-Type: image/gif');
    echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');
}

//nhnace 프로세스 처리
function nhnace_go(){
    //쿠키값을 읽은후 리다이렉션 처리
    $adop_sid = set_cid();
    $target_url = "//cm-exchange.toast.com/pixel?cm_mid=1991449398&cm_muid={$adop_sid}&toast_push";
    header('Location: '.$target_url);
}

//쿠키 값 읽어 오기. 없으면 새로 생성 있으면 만료기간만 3개월로 연장.
function set_cid(){
    //현재시간 '20191008060252'
    $dt = date('YmdHis');

    //GEOIP를 이용하여 국가 코드 알아오기
    $cn = isset($_SERVER['GEOIP_COUNTRY_CODE'])?$_SERVER['GEOIP_COUNTRY_CODE']:'LO';

    //쿠키 만료 기간 현재는 3개월(90일)로 되어있음.
    $ck_ex_time = time()+(60*60*24)*90;

    if (isset($_COOKIE['ADOP_CID'])) {
        $acid = $_COOKIE['ADOP_CID'];
        setcookie('ADOP_CID', $acid, $ck_ex_time, '/', ".adop.cc");
    } else {
        $acid = $cn . "-" . substr($dt, 2, 14) . "-" . RDID();
        setcookie('ADOP_CID', $acid, $ck_ex_time, '/', ".adop.cc");
    }
    return $acid;
}

//랜덤 16진수(16자릿수) 출력
function RDID() {
    $data = openssl_random_pseudo_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
    return vsprintf('%s%s%s%s',str_split(bin2hex($data), 4));
}

?>