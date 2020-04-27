<?php
/**
 * Created by IntelliJ IDEA.
 * User: baekdoo
 * Date: 2020. 4. 07
 * Time: PM 2:05
 * 와이더 플래닛 코드가 변경되어
 * 기존에 태그 적용 되어 있던 코드를 신규 태그 방식을 변경 처리
 * compass_net_idx : 84efaf55-6426-44aa-9994-998dfe65c9d4
 * compass_net_idx : fb992c43-6b84-11e7-8214-02c31b446301
 */


ob_start();

//메모리사이즈와 실행시간 프리...
ini_set("max_execution_time",6000);
ini_set("memory_limit",-1);

//전역변수 설정
//$dbInfo     = array("localhost","root","root","adop_test");
$dbInfo     = array("compass-cluster.cluster-cnzcxy7quzcs.ap-northeast-2.rds.amazonaws.com","adopadmin","Adop*^14","platon");

//DB 연결변수
$connGlobal = null;

//***사전 함수정리***
//시간 체크를 위한 함수
function get_time() {
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

//글로벌 DB 컨넥트
function dbConnect(){
    global $dbInfo,$connGlobal;

    list($hostUrl,$user,$pwd,$dbIns) = $dbInfo;
    $connGlobal=new mysqli($hostUrl,$user,$pwd,$dbIns);
    if($connGlobal->connect_error){
        die("Connection failed: " . $connGlobal->connect_error);
    }
    $connGlobal->set_charset("utf8");
}
function dbDisConnect(){
    global $connGlobal;
        $connGlobal->close();
}

//슬롯id를 영역정보로 바꾸어 주기
function slotToarea($slotId){
    global $connGlobal;

    $readDataQuery = "select * from aSlot2Area where gcd = '".$slotId."'";
    $resultSet     = $connGlobal->query($readDataQuery);
    $row = $resultSet->fetch_assoc();
    if(is_null($row['areacd'])){
        return $slotId;
    }
    else {
        return $row['areacd'];
    }
}
//랜덤 문자열
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

//사이즈 알아오기
function getSize($sizeIdx){
    global $connGlobal;

    $readDataQuery = "select * from advertise_ad_size where adv_size_idx = '".$sizeIdx."'";
    //echo $readDataQuery;
    $resultSet     = $connGlobal->query($readDataQuery);
    $row = $resultSet->fetch_assoc();

    if(is_null($row)){
        $obj =(object)array();
        $obj->w         = "";
        $obj->h         = "";
        return $obj;
    }
    else {
        $obj =(object)array();
        $obj->w         = $row['size_width'];
        $obj->h         = $row['size_height'];
        return $obj;
    }
}

//와이더 플래닌 신규 코드로 변형
function makeTemplete($row){
    if($row['net_adv_param01'] == ""){
        $zoneid   = "";
        $passback = "";
        $category = "";
        $loc      = "";
        $cnt = preg_match('/zoneid=(.*?)"/i',$row['html_code'],$tmp);
        if($cnt){
            $zoneid  = $tmp[1];
        }
        $cnt = preg_match('/category=\'\s+\+\s+\'(.*?)\'/i',$row['html_code'],$tmp);
        if($cnt){
            $category  = $tmp[1];
        }
        $cnt = preg_match('/passback=\'\s+\+\s+escape\("(.*?)"/i',$row['html_code'],$tmp);
        if($cnt){
            $passback  = $tmp[1];
        }

    }
    else{
        $zoneid   = $row['net_adv_param01'];
        $passback = $row['net_adv_passback'];
        $category = $row['net_adv_param02'];
        $loc      = $row['net_adv_param03'];

    }

    $scriptTmp  = "<script type=\"text/javascript\">"."\n";
    $scriptTmp .= "WiderPlanetAdRendererVar = {"."\n";
    $scriptTmp .= "    type : \"script\","."\n";
    $scriptTmp .= "    passback :\"".$passback."\","."\n";
    $scriptTmp .= "    category : \"".$category."\","."\n";
    $scriptTmp .= "    width : \"".getSize($row['adv_size_idx'])->w."\","."\n";
    $scriptTmp .= "    height : \"".getSize($row['adv_size_idx'])->h."\","."\n";
    $scriptTmp .= "    zoneid : \"".$zoneid."\","."\n";
    $scriptTmp .= "    loc : \"".$loc."\","."\n";
    $scriptTmp .= "    ref : document.referrer"."\n";
    $scriptTmp .= "};"."\n";
    $scriptTmp .= "</script>"."\n";
    $scriptTmp .= "<script src=\"//cdn-aitg.widerplanet.com/js/adr.js\" type=\"text/javascript\"></script>"."\n";



    return $scriptTmp;
}
//데이터 변경 시작
function runConvert(){
    global $connGlobal;
    $count01 = 0;
    $html_code = "";


    $readDataQuery = "select * from advertise_ad where network_adv_idx in ('84efaf55-6426-44aa-9994-998dfe65c9d4','fb992c43-6b84-11e7-8214-02c31b446301')";
    $resultSet     = $connGlobal->query($readDataQuery);

    echo "<pre>\n";
    while($row = $resultSet->fetch_assoc()){
        $count01++;
        $html_code = makeTemplete($row);

        $updateDataQuery = "UPDATE advertise_ad set html_code = '".$html_code."' where adv_idx = '".$row['adv_idx']."'";
        $connGlobal->query($updateDataQuery);

       if($count01%100 == 0){
           //exit();
           echo $count01." : ".$row['adv_name']."<br />\n";
           //echo "----------------------------------------------------- <br />\n";
           //echo $html_code;
           //echo "----------------------------------------------------- <br />\n";
           //echo "\n\n\n";
           ob_flush();
           flush();

       }
    }
}

//


///////테스트
//
//$txtTmp = "<!--/* TargetingGates */-->
//<script type='text/javascript'><!--//<![CDATA[
//   var tg_u = (location.protocol=='https:'?'https://adtg.widerplanet.com/delivery/wjs.php':'http://adtg.widerplanet.com/delivery/wjs.php');
//var tg_html = \"<scr\"+\"ipt type='text/javascript' src='\"+tg_u;
//   tg_html += \"?zoneid=20058\";
//tg_html += '&category='  + 'im_busan_content_728x90_ctoon';
//tg_html += '&passback=' + escape(\"https://compass.adop.cc/RS/4ae2442d-36d2-4607-9c20-27323128d2e8?size_width=728&size_height=90\");
//tg_html += '&cb=' + Math.floor(Math.random()*99999999999);
//   tg_html += (document.charset ? '&charset='+document.charset : (document.characterSet ? '&charset='+document.characterSet : ''));
//   tg_html += \"&loc=\" + escape(\"http://implay.busan.com\");
//   if (document.referrer) tg_html += \"&referer=\" + escape(document.referrer);
//if (document.title) tg_html += \"&title=\" + escape(document.title);
//   if (document.mmm_fo) tg_html += \"&mmm_fo=1\";
//   tg_html += \"'><\/scr\"+\"ipt>\";
//   document.write(tg_html);
////]]>--></script>";


//$cnt = preg_match('/zoneid=(.*?)"/i',$txtTmp,$tmp);
//$cnt = preg_match('/category=\'\s+\+\s+\'(.*?)\'/i',$txtTmp,$tmp);
//$cnt = preg_match('/passback=\'\s+\+\s+escape\("(.*?)"/i',$txtTmp,$tmp);
//echo $cnt;
//if($cnt){
//  echo "result : " . $tmp[1];
//}
//
//exit();





//프로그램 스타트
$time01 = get_time();
dbConnect();
//echo slotToarea(8150151838);

runConvert();
//echo addslashes("12\'34");
dbDisConnect();
echo "<hr />";
echo "전체 진행 시간 : ".(get_time() - $time01)."\n";

//echo generateRandomString();

//$tmp = getGoogleAd('1234');


//echo $tmp->gkey;

/*
$obj =(object)array();
$obj->w         = 300;
$obj->h         = 250;
$obj->fkey      = '5932629';
$obj->pub       = 'ca-pub-1474238860523410';
$obj->slot      = '1461757438';
$obj->passback  = 'http://compass.adop.cc/RD/0c319ab4-905d-4a1f-b9a9-e2b662673e8b';

makeTemplete($obj);

*/

?>


