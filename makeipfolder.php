<?php
/*
// 아이피 주소 정보 파일을 읽어 아이피에 따라 폴더를 트리 형식으로 만드는 파일
// 데이타파일 : iplist_190926.csv
*/


ob_start();
//메모리사이즈와 실행시간 프리...
ini_set("max_execution_time",3000);
ini_set("memory_limit",-1);


/*전역변수 정의*/
defined('DATA_FILE')  OR define('DATA_FILE', 'iplist_190926.csv');
defined('IP_FOLDER')  OR define('IP_FOLDER', 'iplist2');
$t_counter = 0;
$b_first   = true;
/*함수 정리*/
//시간 처리를 위한 함수
function get_time() {
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}
//파일명생성하는 함수(파일패스/파일명)
function get_filename($info){
    $a = explode(".", $info[0] );
    return array($a[0]."/".$a[1],$a[2].".json");
}
//행정도시 코드 가져오는 부분
function get_city_code($city){
    switch ($city){
        case "경기도" : return 41;
        case "인천시" : return 28;
        case "충청남도" : return 44;
        case "부천시" : return 41;
        case "서울특별시" : return 11;
        case "경상남도" : return 48;
        case "경남" : return 48;
        case "경상북도" : return 47;
        case "부산광역시" : return 26;
        case "전라남도" : return 46;
        case "제주" : return 50;
        case "서울시" : return 11;
        case "전라북도" : return 45;
        case "인천광역시" : return 28;
        case "서울" : return 11;
        case "울산광역시" : return 31;
        case "강원도" : return 42;
        case "충청북도" : return 43;
        case "대구광역시" : return 27;
        case "대전광역시" : return 30;
        case "전북" : return 45;
        case "제주특별자치도" : return 50;
        case "가산디지털1로" : return 11;
        case "서울시특별시" : return 11;
        case "대구" : return 27;
        case "경북" : return 47;
        case "부산시" : return 26;
        case "충북" : return 43;
        case "인천" : return 28;
        case "경기도성남시분당구" : return 41;
        case "서울동작구신대방동" : return 11;
        case "서울강남구삼성동" : return 11;
        case "경기도의왕시" : return 41;
        case "경기도부천시" : return 41;
        case "서울구로구구로동" : return 11;
        case "서울서초구반포동" : return 11;
        case "인천남구주안동" : return 28;
        case "경기" : return 41;
        case "대전" : return 30;
        case "사상구" : return 26;
        case "대전시" : return 30;
        case "전남" : return 46;
        case "광주" : return 29;
        case "강남구" : return 11;
        case "충남" : return 44;
        case "부산" : return 26;
        case "울산" : return 31;
        case "강원" : return 42;
        case "동대문구" : return 11;
        case "서울양천구목동" : return 11;
        case "서울광진구광장동" : return 11;
        case "세종특별자치시" : return 36;
        default : return 99;
    }
}

/* 프로그램 시작 */
$start_time  = get_time(); //시작시간

$fp = fopen(DATA_FILE,"r") OR die('data file not exist!');
while( !feof($fp) && $t_counter < 1000000){
    //최초에 한번은 그냥 읽고 버림(엑셀 해더)
    if ($b_first){
        $doc_data = fgets($fp);
        $b_first = false;
    }
    $doc_data = fgets($fp);

    //파일에서 인용부호 제거
    $doc_data = str_replace("\"","",$doc_data);

    //읽은 데이터에서 주소와 ip 주소 분리
    $ip_adress_data = explode(",",$doc_data);

    //ip주소 , 실주소 로 되어 있지 않으면 패스
    if(count($ip_adress_data) != 2){
        continue;
    }
    $file_name = get_filename($ip_adress_data);

    $city = explode(" ",$ip_adress_data[1]);
    $city_code = get_city_code($city[0]);



    if (!file_exists(IP_FOLDER."/".$file_name[0])) {
        mkdir(IP_FOLDER."/".$file_name[0], 0755, true);
    }
    //파일 생성
    $myfile = fopen(IP_FOLDER."/".$file_name[0]."/".$file_name[1], "w") or die("Unable to open file!");
    fwrite($myfile, $city_code);
    fclose($myfile);

    //$city = explode(" ",$ip_adress_data[1]);
    //$city_all[$city[0]] = 0;
    //echo $city_all[0]."\n";
    //echo $doc_data. "<br>\n";
    $t_counter++;
}
//var_dump($city_all);
fclose($fp);

//echo "서울".get_city_code("서울시");
//mkdir("test1/test2/test3",0777,true);



$worktime = round(get_time() - $start_time,3);
echo "<br />\n";
echo "[처리시간]: ".$worktime." 초";




?>
