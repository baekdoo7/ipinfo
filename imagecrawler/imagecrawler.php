<?php
/*
// url 정보를 읽어와 그 안에 있는 이미지 링크를 수집
// 데이타파일 : urlinfo.csv
*/

ob_start();
//메모리사이즈와 실행시간 프리...
ini_set("max_execution_time",3000);
ini_set("memory_limit",-1);

/*전역변수 정의*/
defined('DATA_FILE')  OR define('DATA_FILE', 'urlinfo.csv');
defined('RESULT_FILE')  OR define('RESULT_FILE', 'imagedata.csv');
$t_counter = 0;
$b_first   = true;
$file_data = "";

/*함수 정리*/
//시간 처리를 위한 함수
function get_time() {
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

//화일읽어 오기
function readXml($url){

    if (function_exists('curl_init')) {
        // curl 리소스를 초기화
        $ch = curl_init();

        // url을 설정
        curl_setopt($ch, CURLOPT_URL, $url);

        // 헤더는 제외하고 content 만 받음
        curl_setopt($ch, CURLOPT_HEADER, 0);

        // 응답 값을 브라우저에 표시하지 말고 값을 리턴
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // 브라우저처럼 보이기 위해 user agent 사용
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20041107 Firefox/1.0');

        $content = curl_exec($ch);

        // 리소스 해제를 위해 세션 연결 닫음
        curl_close($ch);

        //xml 파싱하기

        return $content;
    } else {
        // curl 라이브러리가 설치 되지 않음. 다른 방법 알아볼 것
        echo "error";
        exit("curl not exist!");
    }

}
//상대주소를 절대주소로 변경
function url_to_absolute($baseURL, $relativeURL) {
    if(substr($relativeURL,0,2)=='//'){
        $relativeURL = 'http:'.$relativeURL;
    }

    $relativeURL_data = parse_url($relativeURL);

    if (isset($relativeURL_data['scheme'])) {
        return $relativeURL;
    }

    $baseURL_data = parse_url($baseURL);

    if (!isset($baseURL_data['scheme'])) {
        return $relativeURL;
    }

    $absoluteURL_data = $baseURL_data;

    if (isset($relativeURL_data['path']) && $relativeURL_data['path']) {
        if (substr($relativeURL_data['path'], 0, 1) == '/') {
            $absoluteURL_data['path'] = $relativeURL_data['path'];
        } else {
            $absoluteURL_data['path'] = (isset($absoluteURL_data['path']) ? preg_replace('#[^/]*$#', '', $absoluteURL_data['path']) : '/') . $relativeURL_data['path'];
        }

        if (isset($relativeURL_data['query'])) {
            $absoluteURL_data['query'] = $relativeURL_data['query'];
        } else if (isset($absoluteURL_data['query'])) {
            unset($absoluteURL_data['query']);
        }
    } else {
        $absoluteURL_data['path'] = isset($absoluteURL_data['path']) ? $absoluteURL_data['path'] : '/';

        if (isset($relativeURL_data['query'])) {
            $absoluteURL_data['query'] = $relativeURL_data['query'];
        } else if (isset($absoluteURL_data['query'])) {
            $absoluteURL_data['query'] = $absoluteURL_data['query'];
        }
    }

    if (isset($relativeURL_data['fragment'])) {
        $absoluteURL_data['fragment'] = $relativeURL_data['fragment'];
    } else if (isset($absoluteURL_data['fragment'])) {
        unset($absoluteURL_data['fragment']);
    }

    $absoluteURL_path = ltrim($absoluteURL_data['path'], '/');
    $absoluteURL_path_parts = array();

    for ($i = 0, $i2 = 0; $i < strlen($absoluteURL_path); $i++) {
        if (isset($absoluteURL_path_parts[$i2])) {
            $absoluteURL_path_parts[$i2] .= $absoluteURL_path[$i];
        } else {
            $absoluteURL_path_parts[$i2] = $absoluteURL_path[$i];
        }

        if ($absoluteURL_path[$i] == '/') {
            $i2++;
        }
    }

    reset($absoluteURL_path_parts);

    while (true) {
        if (rtrim(current($absoluteURL_path_parts), '/') == '.') {
            unset($absoluteURL_path_parts[key($absoluteURL_path_parts)]);

            continue;
        } else if (rtrim(current($absoluteURL_path_parts), '/') == '..') {
            if (prev($absoluteURL_path_parts) !== false) {
                unset($absoluteURL_path_parts[key($absoluteURL_path_parts)]);
            } else {
                reset($absoluteURL_path_parts);
            }

            unset($absoluteURL_path_parts[key($absoluteURL_path_parts)]);

            continue;
        }

        if (next($absoluteURL_path_parts) === false) {
            break;
        }
    }

    $absoluteURL_data['path'] = '/' . implode('', $absoluteURL_path_parts);

    $absoluteURL = isset($absoluteURL_data['scheme']) ? $absoluteURL_data['scheme'] . ':' : '';
    $absoluteURL .= (isset($absoluteURL_data['user']) || isset($absoluteURL_data['host'])) ? '//' : '';
    $absoluteURL .= isset($absoluteURL_data['user']) ? $absoluteURL_data['user'] : '';
    $absoluteURL .= isset($absoluteURL_data['pass']) ? ':' . $absoluteURL_data['pass'] : '';
    $absoluteURL .= isset($absoluteURL_data['user']) ? '@' : '';
    $absoluteURL .= isset($absoluteURL_data['host']) ? $absoluteURL_data['host'] : '';
    $absoluteURL .= isset($absoluteURL_data['port']) ? ':' . $absoluteURL_data['port'] : '';
    $absoluteURL .= isset($absoluteURL_data['path']) ? $absoluteURL_data['path'] : '';
    $absoluteURL .= isset($absoluteURL_data['query']) ? '?' . $absoluteURL_data['query'] : '';
    $absoluteURL .= isset($absoluteURL_data['fragment']) ? '#' . $absoluteURL_data['fragment'] : '';

    return $absoluteURL;
}


//컨텐츠에서 이미지 URL 찾아 리턴
function get_image($conts){
    // 정규식을 이용해서 img 태그 전체 / src 값만 추출하기
    preg_match_all("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $conts, $matches);
    return $matches[1];
    //var_dump($matches[1]);
}


//echo url_to_absolute('http://adop.cc/btc/abab/abc.html','/t/k/test.html');
//exit;

/* 테스트 */
$tmp002 = getimagesize('http://image.pullbbang.com/pull2012/upload/board/2017/2/20170221130142990.JPEG');
var_dump($tmp002);
exit;

/* 프로그램 시작 */
$start_time  = get_time(); //시작시간

$fp = fopen(DATA_FILE,"r") OR die('data file not exist!');

//헤더 세팅
$file_data .= "Property Code,Page Url,Must Fix,Issues,Image Url,Width,Height,Image Hash\n";

while( !feof($fp) && $t_counter++ < 1000) {
    //최초에 한번은 그냥 읽고 버림(엑셀 해더)
    if ($b_first) {
        $doc_data = fgets($fp);
        $b_first = false;
    }
    $doc_data = fgets($fp);

    //읽은 데이터에서 url주소만 읽기
    $url_adress_data = explode(",",$doc_data);
    $property_code = $url_adress_data[0];
    $url_adress    = $url_adress_data[1];
    $must_fix      = $url_adress_data[2];
    $issues        = $url_adress_data[3];


    //url에서 이미지 읽어 오기
    $tmp01 = get_image(readXml($url_adress));
    foreach ($tmp01 as $obj){
        $image01    = url_to_absolute('http://'.$url_adress,$obj);
        $img_info   = getimagesize($image01);
        $hash_file     = hash_file("md5",$image01);
        $img_width  = $img_info[0];
        $img_height = $img_info[1];
        if($img_width >= 100 && $img_height >= 100){
            $file_data .= $property_code.",".$url_adress.",".$must_fix.",".$issues.",".$image01.",".$img_width.",".$img_height.",".$hash_file."\n";
        }else{
            continue;
        }
    }
if($t_counter%100==0 ){
    echo $t_counter."<br />\n";
    ob_flush();
    flush();
}
}

//파일 생성
$myfile = fopen(RESULT_FILE, "w") or die("Unable to open file!");
fwrite($myfile, $file_data);
fclose($myfile);

echo "\n<br />\n";
echo "작업 완료!!!(".$t_counter."개 ".(get_time()-$start_time)."초)";



?>