<?php
/*
 * 나라장터 입찰공지 내용을 크롤링
 * 주소 : http://apis.data.go.kr/1230000/BidPublicInfoService
 * 인증키 : vsy2YH1i2ENTZv2OFaZQGCIHDNzPcv2axYPJ1GcIuKbic5WjGfzwtlMHeEBVVW472M9XbRy1%2F4sXgvCRay2v3g%3D%3D
 * */
while(ob_end_flush());
ob_start();
//메모리사이즈와 실행시간 프리...
ini_set("max_execution_time",300000);
ini_set("memory_limit",-1);
error_reporting(E_ALL);
ini_set("display_errors", 1);


//호출풀주소형식
//http://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfoServc?numOfRows=10&pageNo=1&ServiceKey=vsy2YH1i2ENTZv2OFaZQGCIHDNzPcv2axYPJ1GcIuKbic5WjGfzwtlMHeEBVVW472M9XbRy1%2F4sXgvCRay2v3g%3D%3D&inqryDiv=1&inqryBgnDt=202101010000&inqryEndDt=202103032359&type=json
//http://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfoServc?serviceKey=vsy2YH1i2ENTZv2OFaZQGCIHDNzPcv2axYPJ1GcIuKbic5WjGfzwtlMHeEBVVW472M9XbRy1%2F4sXgvCRay2v3g%3D%3D&numOfRows=10&pageNo=1&inqryDiv=1&inqryBgnDt=202101010000&inqryEndDt=202103022359&type=json
//http://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfoServc?numOfRows=10&pageNo=1&ServiceKey=vsy2YH1i2ENTZv2OFaZQGCIHDNzPcv2axYPJ1GcIuKbic5WjGfzwtlMHeEBVVW472M9XbRy1%2F4sXgvCRay2v3g%3D%3D&inqryDiv=2&bidNtceNo=20210302455-00&type=json
//20210302455


/*전역변수 정의*/
$dbInfo     = array("127.0.0.1","root","groundk1234","naraDB"); //로컬디비
$naraApiUrl = "http://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfoServc?";
$naraParmnumOfRows = 900; //한페이지 결과수
$naraParmpageNo = 1 ;    //페이지 번호
$naraParmServiceKey = "vsy2YH1i2ENTZv2OFaZQGCIHDNzPcv2axYPJ1GcIuKbic5WjGfzwtlMHeEBVVW472M9XbRy1%2F4sXgvCRay2v3g%3D%3D"; //api 서비스키
$naraParminqryDiv = 1; //검색하고자하는 조회구분 1:등록일시, 2:입찰공고번호, 3:변경일시(등록일시로 검색시 방위사업청 입찰공고데이터의 등록일시는 방위사업청에서 제공하는 오픈 API로 연계된 입찰공고정보가 조
$naraParminqryBgnDt = "202001010000"; //검색하고자하는 등록일시 또는 변경일시 조회시작일시 "YYYYMMDDHHMM",(조회구분 '1' 선택시 필수)
$naraParminqryEndDt = "202012312359"; //검색하고자하는 등록일시 또는 변경일시 조회종료일시 "YYYYMMDDHHMM",(조회구분 '1' 선택시 필수)
$naraParmbidNtceNo  = "";  //검색하고자 하는 입찰공고번호,(조회구분 '2' 선택시 필수)
$naraParmtype = "json"; //오픈API 리턴 타입을 JSON으로 받고 싶을 경우 'json'으로 지정

/***********************
********함수 정리********
************************/

//시간 처리를 위한 함수
function get_time() {
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

//최초 DB생성
function makeTable(){
    global $dbInfo;

    list($hostUrl,$user,$pwd,$dbIns) = $dbInfo;
    $conn=mysqli_connect($hostUrl,$user,$pwd,$dbIns);
    if(!$conn){
        echo "Debugging errno : ". mysqli_connect_error() .PHP_EOL;
        exit();
    }
    $conn->set_charset("utf8");

    //테이블 없으면 신규 생성
    $createMainTableSql  = "CREATE TABLE IF NOT EXISTS `naraDB`.`bidMain` ( ";
    $createMainTableSql .= "`id` INT NOT NULL AUTO_INCREMENT,"; //고유 id 자동 증가
    $createMainTableSql .= "`bidNtceNo` varchar(20) NOT NULL,"; // 입찰공고번호
    $createMainTableSql .= "`bidNtceOrd` varchar(3) NOT NULL,"; // 입찰공고차수
    $createMainTableSql .= "`ntceKindNm` varchar(20) ,";  //분류
    $createMainTableSql .= "`bidNtceNm` varchar(50) ,";   //입찰공고명
    $createMainTableSql .= "`ntceInsttNm` varchar(50) ,"; // 공고기관
    $createMainTableSql .= "`dminsttNm` varchar(50) ,";   //수요기관명
    $createMainTableSql .= "`cntrctCnclsMthdNm` varchar(100) ,"; // 계약방법
    $createMainTableSql .= "`bidNtceDt` varchar(30) ,"; //입찰공고일
    $createMainTableSql .= "`opengDt` varchar(50) ,"; //입찰마감일
    $createMainTableSql .= "`bidNtceDtlUrl` varchar(200) ,"; //상세페이지주소
    $createMainTableSql .= "`asignBdgtAmt` bigint(20) DEFAULT 0,"; //배정예산
    $createMainTableSql .= "`presmptPrce` bigint(20) DEFAULT 0,"; //추정가격
    $createMainTableSql .= "PRIMARY KEY (`id`)";
    $createMainTableSql .= ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    $createMainTableSql .= "";

    mysqli_query($conn, $createMainTableSql);
    mysqli_close($conn); //db 종료
}

function crawl(){
    global $dbInfo,$naraApiUrl,$naraParmnumOfRows,$naraParmpageNo,$naraParmServiceKey,$naraParminqryDiv,$naraParminqryBgnDt;
    global $naraParminqryEndDt,$naraParmbidNtceNo,$naraParmtype;
    $firstTimes = true; //최초에 페이지 수를 체크하기위한 변수
    $curPageNo = $naraParmpageNo; // 현재 페이지 번호
    $totPageCnt = 2; //전체 페이지 수

    //DB 설정
    list($hostUrl,$user,$pwd,$dbIns) = $dbInfo;
    $conn=mysqli_connect($hostUrl,$user,$pwd,$dbIns);
    if(!$conn){
        echo "Debugging errno : ". mysqli_connect_error() .PHP_EOL;
        exit();
    }
    $conn->set_charset("utf8");

    //현재페이지가 전체 페이지수보다 작으면 계속 호출
    while($totPageCnt > $curPageNo){
//    while($curPageNo < 3){
        $siteUrl = $naraApiUrl."numOfRows=".$naraParmnumOfRows."&pageNo=".$curPageNo."&ServiceKey=".$naraParmServiceKey."&inqryDiv=".$naraParminqryDiv;
        $siteUrl .= "&inqryBgnDt=".$naraParminqryBgnDt."&inqryEndDt=".$naraParminqryEndDt."&bidNtceNo=".$naraParmbidNtceNo."&type=".$naraParmtype;
        $json_string = file_get_contents($siteUrl);
        $R = json_decode($json_string,true);
        if(isset($R['response']['header']['resultCode']) && $R['response']['header']['resultCode'] == "00" ){
            if($firstTimes){
                //페이지계산
                $totPageCnt = ceil($R['response']['body']['totalCount']/$naraParmnumOfRows);
                $firstTimes = false;
            }
            echo "현재페이지 : ".$curPageNo. "/".$totPageCnt." <br>\n";
            ob_flush();
            flush();
            foreach ( $R['response']['body']['items']as $item) {
                if(isset($item['asignBdgtAmt']) && $item['asignBdgtAmt'] != ""){
                    $asignBdgtAmt_ = $item['asignBdgtAmt'];
                }
                else{
                    $asignBdgtAmt_ = 0;
                }
                $sqlQuery = "INSERT INTO `naraDB`.`bidMain` (`bidNtceNo`,`bidNtceOrd`,`ntceKindNm`,`bidNtceNm`,`ntceInsttNm`,`dminsttNm`,`cntrctCnclsMthdNm`,`bidNtceDt`,`opengDt`,`bidNtceDtlUrl`,`asignBdgtAmt`,`presmptPrce`)
                             VALUES (\"{$item['bidNtceNo']}\",
                                     \"{$item['bidNtceOrd']}\",
                                     \"{$item['ntceKindNm']}\",
                                     \"{$item['bidNtceNm']}\",
                                     \"{$item['ntceInsttNm']}\",
                                     \"{$item['dminsttNm']}\",
                                     \"{$item['cntrctCnclsMthdNm']}\",
                                     \"{$item['bidNtceDt']}\",
                                     \"{$item['opengDt']}\",
                                     \"{$item['bidNtceDtlUrl']}\",
                                     \"{$asignBdgtAmt_}\",
                                     \"{$item['presmptPrce']}\");";
//                echo $sqlQuery."<br>\n";
                mysqli_query($conn,$sqlQuery);
            }
            

        }else{
            echo $R['response']['header']['resultMsg'] ."\n";
            exit("api error......");
        }
        $curPageNo++;
    }
    mysqli_close($conn); //db 종료





}


$startTime = get_time();
echo "시작..... <br />\n";
makeTable();
crawl();
$worktime = round(get_time() - $startTime,3);
echo "<br />\n";
echo "[처리시간]: ".$worktime." 초";
ob_end_flush();