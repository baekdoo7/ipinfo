//google adsense 키워드 저장
window._gqid = window._gqid || [];
window._gqidtestmode = window._gqidtestmode || false;

// if(document.currentScript.getAttribute("_testmode") == "true"){
//     window._gqidtestmode = true;
// }

//랜덤 키생성(3자리 랜덤 문자열)
function makeid325()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//콤파스 광고 로딩 시
function adopRun003(){
    //기초 변수 세팅
    var $adpIns = document.getElementsByTagName("ins");
    var $adpSet =  []; //adop ins tag Elements
    var rand_code  = '' ; //rand string 3 length
    var getPageUrl = '' ; //loc info
    var __params = {}   ; //ins attr info
    var regExp   = null ; //regular expression for referer check
    var __url = "" ;
    var params = "";
    var iurl = ""  ;
    var $iframeTmp = null;
    var $adp = null;

    //adop ins tag 수집
    for(var i=0 ;i<$adpIns.length ; i++){
        if($adpIns[i].className == "adsbyadop" && ($adpIns[i].getAttribute('_adop_type') == "re" || $adpIns[i].getAttribute('_adop_type') == "RE") ){
            $adpSet.push($adpIns[i]);
        }
    }
    //adop ins tag가 없으면 종료
    if($adpSet.length <= 0){
        return;
    }
    //insert iframe to adop ins Tag
    for(var j=0;j<$adpSet.length;j++ ){
        //initialize
        rand_code  = makeid325();
        getPageUrl = "";
        __params   = {};
        regExp     = null;
        __url      = "";
        params     = "";
        iurl       = "";
        $iframeTmp = null;
        $adp       = null;

        $adp = $adpSet[j];
        getPageUrl = window.location.href;

        regExp = /compass\.adop\.cc/;
        if( getPageUrl.search( regExp ) != -1 ) {
            getPageUrl = unescape(document.referrer);
        }

        if( getPageUrl.length > 200 )   getPageUrl = '';

        __params['over-size']   = $adp.getAttribute('_over_size');
        __params['over-size-w'] = $adp.getAttribute('_over_size_w');
        __params['over-size-h'] = $adp.getAttribute('_over_size_h');
        __params['over-zone']   = $adp.getAttribute('_over_zone');
        __params['adop-zone']   = $adp.getAttribute('_adop_zon');

        if(__params['over-size'] != null && __params['over-size'] == "auto"){
            var obj001 = JSON.parse(__params['over-zone']);
            for(var key01 in obj001){
                var tmpKey = key01.split("x",2);

                if(document.body.clientWidth >= tmpKey[0]){
                    __params_zone = obj001[key01];
                    __ori_zone    = __params['adop-zone'];
                    over_size     = false;
                    $adp.style.width  = tmpKey[0] + "px";
                    $adp.style.height = tmpKey[1] + "px";
                    __params['size_width'] = tmpKey[0];
                    __params['size_height'] = tmpKey[1];
                }else{
                    __params_zone = $adp.getAttribute('_adop_zon');
                    over_size     = false;
                }

            }
        }
        else if( __params['over-size'] != null && document.body.clientWidth >= __params['over-size']){
            __params_zone = __params['over-zone'];
            __ori_zone    = __params['adop-zone'];
            over_size     = true;
        }
        else{
            __params_zone = $adp.getAttribute('_adop_zon');
            over_size     = false;
        }
        __params['type'] = $adp.getAttribute('_adop_type');
        __params['loc']  = $adp.getAttribute('_page_url') ? $adp.getAttribute('_page_url') : escape(getPageUrl);
        __params['rnd']  = rand_code;
        if($adp.style.width.substr(-1) == "%"){
            __params['percentage'] = true;
        }else{
            __params['percentage'] = false;
        }
        __params['size_width'] = $adp.style.width.replace('px', '');
        __params['size_height'] = $adp.style.height.replace('px', '');

        if (over_size){
            if(__params['over-size'] == 336) {
                $adp.style.width = "336px";
                $adp.style.height = "280px";
                __params['size_width'] = 336;
                __params['size_height'] = 280;
            }else if(__params['over-size'] == 468){
                $adp.style.width = "468px" ;
                $adp.style.height = "60px" ;
                __params['size_width'] = 468;
                __params['size_height'] = 60;
            }else if(__params['over-size'] == 600){
                $adp.style.width = "600px" ;
                $adp.style.height = "90px" ;
                __params['size_width'] = 600;
                __params['size_height'] = 90;
            }else if(__params['over-size'] == 728){
                $adp.style.width = "728px" ;
                $adp.style.height = "90px" ;
                __params['size_width'] = 728;
                __params['size_height'] = 90;
            }else if(__params['over-size'] == 970){
                $adp.style.width = "970px" ;
                $adp.style.height = "90px" ;
                __params['size_width'] = 970;
                __params['size_height'] = 90;
            }

            if(__params['over-size-w']!= null){
                $adp.style.width = __params['over-size-w'];
                __params['size_width'] = __params['over-size-w'];
            }
            if(__params['over-size-h']!= null){
                $adp.style.height = __params['over-size-h'];
                __params['size_height'] = __params['over-size-h'];
            }

            $adp.setAttribute('_adop_zon',__params_zone);
        }
        $adp.className = "adsbyadop_" + __params_zone + rand_code ;

        __url = 'https://compass.adop.cc/RE/' + encodeURIComponent(__params_zone);
        //__url = '//52.79.96.183/RE/' + encodeURIComponent(__params_zone);
        for(var k in __params){
            params += encodeURIComponent(k) + '=' + encodeURIComponent(__params[k]) + '&'
        }
        iurl = __url+((params)?'?'+params:'');

        var strIframeId   = "adopB" + Math.floor(Math.random()*10000) + 1;
        var strIframe     = "<iframe id='"+strIframeId+"' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";
        var strScriptLink = "<script src='"+iurl+"'><\/script>";

        if(__params['percentage']){//width 가 퍼센티지일경우 처리
            $adp.innerHTML = "<div style=\"width:"+__params['size_width']+";height:"+__params['size_height']+"px; \">"+strIframe+"</div>";
        }
        else{
            $adp.innerHTML = "<div style=\"width:"+__params['size_width']+"px;height:"+__params['size_height']+"px; \">"+strIframe+"</div>";
        }


        var passbackIframe = document.getElementById(strIframeId);
        var passbackIframeDoc = passbackIframe.contentDocument || passbackIframe.contentWindow.document;
        if(passbackIframeDoc != null){
            passbackIframeDoc.open();
            passbackIframeDoc.write(strScriptLink);
            passbackIframeDoc.close();
        }
    }//for end
}
var checkLoad0988 = function() {
    document.readyState !== "complete" ? setTimeout(checkLoad0988, 11) : adopRun003();
};
//이벤트 처리를 위한 리스너 정의
var listener572 = listener572 || function(e){
    //메시지가 스티링이 아니면 리턴
    if(typeof e.data != "string"){
        return false;
    }
    //메시지가 제이슨 타입이 아니면 리턴
    try {
        var strMsg = JSON.parse(e.data);
    } catch (error) {
        return false;
    }

    //에드센스 광고 있는 경우만 광고 키값을 전역변수에 넣어둠.
    if(strMsg.googMsgType && strMsg.googMsgType == "adpnt"){
        window._gqid.push(strMsg.key_value[0].value);
        return  true;
    }

    //adop function call 처리
    if(strMsg.adopMsgType && strMsg.adopMsgType == "checkit"){
        if(strMsg.adopGqid){
            var isAdsenseAd = false;
            window._gqid.forEach(function (v,i) {
                if(v == strMsg.adopGqid){
                    isAdsenseAd = true;
                    return;
                }
            });
            if(isAdsenseAd){//google qid 가 있는 경우
                return ;
            }
            else{//google qid 가 없는경우
                e.source.postMessage("{\"res\":\"passback01\"}","*");
                return ;
            }
        }
        else{//저스틴 추가 부분(2020.04.06)
            //google qid 가 없는경우
            e.source.postMessage("{\"res\":\"passback01\"}","*");
        }
    }
};
//이벤트 리스너 등록
if(window.addEventListener){
    window.addEventListener("message",listener572,false);
}
else if(window.attatchEvent){
    window.attachEvent("onmessage",listener572);
}


checkLoad0988();
setTimeout(function(){adopRun003()},200);
setTimeout(function(){adopRun003()},700);
setTimeout(function(){adopRun003()},5000);
//팩킹시 x3c주의!!!!