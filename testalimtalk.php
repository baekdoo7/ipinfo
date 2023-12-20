<?php
/*

 */


class Alim
{
/*
        //알림톡이용 카톡 메시지 보내기
        //알리고 사이트에 메시지 보낼양식을 사전에 등록하고 검수 받은후
        //메시지 양식 키값을 이용하여 내려 받은후 실제메시지 작성후
        //일리고 API를 이용하여 보냄

        $test = new Alim('오징어');
        //알리고에 등록된 템플릿 번호
        $templateNo = 'TI_0484';
        //대체하고자 하는 필드명과 값 세팅
        $changeStr = '{
                        "고객명":"홍 길동",
                        "이용 일시":"2022.06.05 12:30",
                        "출발 정거장":"양재물류센터",
                        "도착 정거장":"국민대학교",
                        "티켓정보":"abcdef123",
                        "좌석정보":"16"
                       }';
        //전송받는사람 정보
        $sendInfo = '{
                        "sender":"028633540",
                        "senddate":'.date("YmdHis", strtotime("+10 minutes")).',
                        "receiver_1":"01064188532",
                        "recvname_1":"강 백두",
                        "subject_1":"하이루 ~~"
                       }';
        //리턴값은 성공은 1 실패는 0으로 던저줌
        $test->sendAlimTalk($templateNo,$changeStr,$sendInfo);

*/
    //프로퍼티
    private $tmp = '';
    private $l_token = '';
    private $l_msgTemplate = '';
    private $l_changeStr = '';
    private $l_receiveMsg = '';
    private $l_failed = false; //통신실패
    private $l_proc = '';
    private $l_apikey = 'ykrao3p032trgtr6qki50xkqee7yg4j6';
    private $l_userid = 'devgroundk';
    private $l_senderkey = '0503523dad497be1257a77bdd4e36dbaa936bf08';
    private $l_tplCode = 'TI_0484';

    public function __construct($str='오징어') {
        $this->tmp = $str;
    }
    public function checkError(){//전단계 에러 체크
        if($this->l_failed){
            return true;
        }
        else{
            return false;
        }
    }
    public function getToken(){ //토큰 받아오기
        if($this->checkError())return false;

        $_apiURL	  =	'https://kakaoapi.aligo.in/akv10/token/create/30/s/';
        $_hostInfo	=	parse_url($_apiURL);
        $_port		  =	(strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
        $_variables	=	array(
            'apikey' => $this->l_apikey,
            'userid' => $this->l_userid
        );

        $oCurl = curl_init();
        curl_setopt($oCurl, CURLOPT_PORT, $_port);
        curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
        curl_setopt($oCurl, CURLOPT_POST, 1);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

        $ret = curl_exec($oCurl);
        $error_msg = curl_error($oCurl);
        curl_close($oCurl);

        // 리턴 JSON 문자열 확인
        //print_r($ret . PHP_EOL);

        // JSON 문자열 배열 변환
        $retArr = json_decode($ret);

        // 결과값 출력
        //print_r($retArr);
        if($retArr->code == 0){//토큰 성공
            $this->l_token = $retArr->token;
            return 1;
        }
        else{//토큰 실패
            $this->l_failed = true;
            $this->l_proc = 'getToken';
            $this->l_receiveMsg = $retArr;
            return 0;
        }
    }
    public function getTemplateList(){ //템플릿 포멧 가져오기
        if($this->checkError())return false;

        $_apiURL		=	'https://kakaoapi.aligo.in/akv10/template/list/';
        $_hostInfo	    =	parse_url($_apiURL);
        $_port			=	(strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
        $_variables	=	array(
            'apikey'    => $this->l_apikey,
            'userid'    => $this->l_userid,
            'token'     => $this->l_token,
            'senderkey' => $this->l_senderkey,
            'tpl_code'  => $this->l_tplCode
        );

        $oCurl = curl_init();
        curl_setopt($oCurl, CURLOPT_PORT, $_port);
        curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
        curl_setopt($oCurl, CURLOPT_POST, 1);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

        $ret = curl_exec($oCurl);
        $error_msg = curl_error($oCurl);
        curl_close($oCurl);

        // 리턴 JSON 문자열 확인
        //print_r($ret . PHP_EOL);

        // JSON 문자열 배열 변환
        $retArr = json_decode($ret);

        // 결과값 출력
        //print_r($retArr->list[0]->templtContent);
        if($retArr->code == 0){
            $this->l_msgTemplate = $retArr->list[0]->templtContent;
            return 1;
        }
        else{
            $this->l_failed = true;
            $this->l_proc = 'getTemplateList';
            $this->l_receiveMsg = $retArr;
            return 0;
        }

    }
    public function getChangeMessage(){
        if($this->checkError())return false;
        $changeStrJson =  json_decode($this->l_changeStr);

        foreach ($changeStrJson as $key =>$val){
            $this->l_msgTemplate = preg_replace("/#{".$key."}/i",$val,$this->l_msgTemplate);
        }

        if($this->l_msgTemplate == ""){
            $this->l_failed = true;
            $this->l_proc = 'getChangeMessage';
            $this->l_receiveMsg = "change message value error!";
            return 0;
        }
    }
    public function sendAlimTalk($template_no='',$change_value='',$send_info=''){
        //템플릿번호,템플릿변경값,문자 받는사람 정보 없으면 에러 리턴 끝
        if($template_no == '' || $change_value == '' || $send_info == ''){
            //echo "파라미터에러";
            return 0;
        }
        $this->l_tplCode = $template_no;
        $this->l_changeStr = $change_value;
        $sendInfoJson = json_decode($send_info);

        $this->getToken(); //토큰 발급
        $this->getTemplateList(); // 템플릿 리스트 내려받기
        $this->getChangeMessage(); // 템플릿에서 전송메시지 작성

        //에러 체크
        if($this->checkError())return false;

        //전송세팅
        $_apiURL    =	'https://kakaoapi.aligo.in/akv10/alimtalk/send/';
        $_hostInfo  =	parse_url($_apiURL);
        $_port      =	(strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
        $_variables =	array(
            'apikey'      => $this->l_apikey,
            'userid'      => $this->l_userid,
            'token'       => $this->l_token,
            'senderkey'   => $this->l_senderkey,
            'tpl_code'    => $this->l_tplCode,
            'sender'      => $sendInfoJson->sender,
            'senddate_'    => $sendInfoJson->senddate,
            'receiver_1'  => $sendInfoJson->receiver_1,
            'recvname_1'  => $sendInfoJson->recvname_1,
            'subject_1'   => $sendInfoJson->subject_1,
            'message_1'   => $this->l_msgTemplate,
        );

        $oCurl = curl_init();
        curl_setopt($oCurl, CURLOPT_PORT, $_port);
        curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
        curl_setopt($oCurl, CURLOPT_POST, 1);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

        $ret = curl_exec($oCurl);
        $error_msg = curl_error($oCurl);
        curl_close($oCurl);

        // 리턴 JSON 문자열 확인
        //print_r($ret . PHP_EOL);

        // JSON 문자열 배열 변환
        $retArr = json_decode($ret);

        // 결과값 출력
        //print_r($retArr);
        if($retArr->code == 0){//정상
            return 1;
        }
        else{//실패
            $this->l_failed = true;
            $this->l_proc = 'sendAlimTalk';
            $this->l_receiveMsg = $retArr;
            return 0;
        }



    }
    public function getTmp(){
        return $this->tmp;
    }
}

$test = new Alim('오징어');

?>
<!doctype html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>알리고 알림톡 테스트</title>
    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <!-- 합쳐지고 최소화된 최신 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <!-- 부가적인 테마 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
    <!-- 합쳐지고 최소화된 최신 자바스크립트 -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script>
        $(document).on("click", "#btn_left", function () {
            alert('알림이 눌렸습니다.');
        });
    </script>
</head>
<body>
<div class="panel panel-default">
    <div class="panel-body">
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default" id="btn_left">알림톡 테스트</button>
            <button type="button" class="btn btn-default" id="btn_middle">Middle</button>
            <button type="button" class="btn btn-default" id="btn_right">Right</button>
        </div>
    </div>
</div>
<div>
    <pre>
        <?php
            //echo '...';
         //echo $test->getTemplateList();
        $templateNo = 'TI_0484';
        $changeStr = '{
                        "고객명":"강 백두",
                        "이용 일시":"2022.06.05 12:30",
                        "출발 정거장":"양재물류센터",
                        "도착 정거장":"국민대학교",
                        "티켓정보":"abcdef123",
                        "좌석정보":"16"                        
                       }';
        $sendInfo = '{
                        "sender":"028633540",
                        "senddate":'.date("YmdHis", strtotime("+10 minutes")).',
                        "receiver_1":"01064188532",
                        "recvname_1":"강 백두",
                        "subject_1":"하이루 ~~"
                       }';

//        $test->sendAlimTalk($templateNo,$changeStr,$sendInfo);
        ?>
    </pre>
</div>
</body>
</html>