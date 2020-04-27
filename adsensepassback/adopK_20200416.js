//이벤트 등록을 위한 전역 변수
var adop_event_add008 = typeof adop_event_add008 == "undefined" ? false : adop_event_add008 ;
var adop_frameid_zoneid = adop_frameid_zoneid || [];

//google adsense 키워드 저장
window._gqid = window._gqid || [];
window._gqidtestmode = window._gqidtestmode || false;

//테스트모드 세팅
if(document.currentScript){
    if(document.currentScript.getAttribute("_testmode") == "true"){
        window._gqidtestmode = true;
    }
}

//랜덤 키생성(3자리 랜덤 문자열)
var makeid263 = makeid263 || function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

//콤파스 광고 로딩 시
var adopRun837 = adopRun837 || function(){
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
    var paramsTmp = "";
    var isTestServer = false;

    //adop ins tag 수집
    for(var i=0 ;i<$adpIns.length ; i++){
        if($adpIns[i].className == "adsbyadop" && ($adpIns[i].getAttribute('_adop_type') == "pl" || $adpIns[i].getAttribute('_adop_type') == "PL") ){
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
        rand_code  = makeid263();
        getPageUrl = "";
        __params   = {};
        regExp     = null;
        __url      = "";
        params     = "";
        iurl       = "";
        $iframeTmp = null;
        $adp       = null;
        isTestServer = false;

        $adp = $adpSet[j];
        getPageUrl = window.location.href;

        regExp = /compass\.adop\.cc/;
        if( getPageUrl.search( regExp ) != -1 ) {
            getPageUrl = unescape(document.referrer);
        }

        if( getPageUrl.length > 200 )   getPageUrl = '';
        //테스트서버에서 실행인지 체크
        if($adp.getAttribute('_adop_ts') == 'true'){
            isTestServer = true;
        }

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

        if(isTestServer == true){
            __url = '//compasstest.adop.cc/PA/' + encodeURIComponent(__params_zone);
        }
        else{
            __url = '//compass.adop.cc/PA/' + encodeURIComponent(__params_zone);
        }

        for(var k in __params){
            params += encodeURIComponent(k) + '=' + encodeURIComponent(__params[k]) + '&'
        }

        paramsTmp = btoa(params);
        //$adp.setAttribute('_pinfo',paramsTmp);

        iurl = __url+((params)?'?'+params:'');

        var strIframeId   = "adopB" + Math.floor(Math.random()*10000) + 1;
        if(isTestServer){
            var strIframe     = "<iframe id='"+strIframeId+"' _pinfo='"+paramsTmp+"' _adop_ts='true' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";
        }
        else{
            var strIframe     = "<iframe id='"+strIframeId+"' _pinfo='"+paramsTmp+"' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";
        }

        var strScriptLink = "<script src='"+iurl+"'><\/script>";
        strScriptLink += " <script>\n";
        strScriptLink += "     if(window.addEventListener){\n";
        strScriptLink += "         window.addEventListener(\"message\",listener321,false);\n";
        strScriptLink += "     } else if(window.attatchEvent){ \n";
        strScriptLink += "         window.attachEvent(\"onmessage\",listener321);\n";
        strScriptLink += "     } \n";
        strScriptLink += "     function listener321(e){ \n";
        strScriptLink += "         if(typeof e.data != \"string\"){ \n";
        strScriptLink += "             return; \n";
        strScriptLink += "         } \n";
        strScriptLink += "         var strMsg = e.data.split(\"_\"); \n";
        strScriptLink += "         if(strMsg.length == 3 && strMsg[0] == \"792\"){ \n";
        strScriptLink += "             parent.postMessage(\"303_\" + frameElement.id  + \"_\" + strMsg[2], \"*\"); \n";
        strScriptLink += "         } \n";
        strScriptLink += "     } \n";
        strScriptLink += " </script> ";

        $adp.innerHTML = "<div style=\"width:"+__params['size_width']+"px;height:"+__params['size_height']+"px; \">"+strIframe+"</div>";

        var passbackIframe = document.getElementById(strIframeId);
        var passbackIframeDoc = passbackIframe.contentDocument || passbackIframe.contentWindow.document;
        if(passbackIframeDoc != null){
            passbackIframeDoc.open();
            passbackIframeDoc.write(strScriptLink);
            passbackIframeDoc.close();
        }
    }//for end
};
//광고 영역 새로 로딩
var setNoframe739 = setNoframe739 || function(frameId,zondCD){
    //console.log(frameId+':'+zondCD);
    //중복 호출 방지
    if(adop_frameid_zoneid[frameId] == zondCD){
        return;
    }
    else{
        adop_frameid_zoneid[frameId] = zondCD;
    }
    var params2 = '';
    var docContent = '';
    var obj1 = document.getElementById(frameId);
    var isTestServer = false;
    if(obj1.getAttribute('_adop_ts') == 'true'){
        isTestServer = true;
    }
    if(isTestServer)
    {
        var __url2 = '//compasstest.adop.cc/PA/' + encodeURIComponent(zondCD);
    }
    else{
        var __url2 = '//compass.adop.cc/PA/' + encodeURIComponent(zondCD);
    }


    if(obj1){
        params2 = atob(obj1.getAttribute('_pinfo'));
        __url2 = __url2+((params2)?'?'+params2:'');
        docContent = "<script src='"+__url2+"'><\/script>";
        docContent += " <script>\n";
        docContent += "     if(window.addEventListener){\n";
        docContent += "         window.addEventListener(\"message\",listener321,false);\n";
        docContent += "     } else if(window.attatchEvent){ \n";
        docContent += "         window.attachEvent(\"onmessage\",listener321);\n";
        docContent += "     } \n";
        docContent += "     function listener321(e){ \n";
        docContent += "         if(typeof e.data != \"string\"){ \n";
        docContent += "             return; \n";
        docContent += "         } \n";
        docContent += "         var strMsg = e.data.split(\"_\"); \n";
        docContent += "         if(strMsg.length == 3 && strMsg[0] == \"792\"){ \n";
        docContent += "             parent.postMessage(\"303_\" + frameElement.id  + \"_\" + strMsg[2], \"*\"); \n";
        docContent += "         } \n";
        docContent += "     } \n";
        docContent += " </script> ";

        var obj1Doc = obj1.contentDocument || obj1.contentWindow.document;
        if(obj1Doc != null){
            obj1Doc.open();
            obj1Doc.write(docContent);
            obj1Doc.close();
        }
    }

};


var listener808 = listener808 || function(e){
    if(typeof e.data != "string"){
        return;
    }
    var strMsg = e.data.split("_");
    if(strMsg.length == 3 && strMsg[0] == "303"){
        //setNoframe739(strMsg[1],strMsg[2]);
        setTimeout(function () {
            setNoframe739(strMsg[1],strMsg[2]);
        },500);
        return;
        //console.log('오징어 : '+makeid263());
    }

    //메시지가 제이슨 타입이 아니면 리턴(구글 adsense 처리)
    try {
        var strMsg2 = JSON.parse(e.data);
    } catch (error) {
        return;
    }

    //에드센스 광고 있는 경우만 광고 키값을 전역변수에 넣어둠.
    if(strMsg2.googMsgType && strMsg2.googMsgType == "adpnt"){
        window._gqid.push(strMsg2.key_value[0].value);
        return  true;
    }

    //adop function call 처리
    if(strMsg2.adopMsgType && strMsg2.adopMsgType == "checkit"){
        if(strMsg2.adopGqid){
            var isAdsenseAd = false;
            window._gqid.forEach(function (v,i) {
                if(v == strMsg2.adopGqid){
                    isAdsenseAd = true;
                    return;
                }
            });
            if(isAdsenseAd){//google qid 가 있는 경우
                return ;
            }
            else{//google qid 가 없는경우
                e.source.postMessage("{\"res\":\"passback02\"}","*");
                return ;
            }
        }
        else{//저스틴 추가 부분(2020.04.06)
            //google qid 가 없는경우
            e.source.postMessage("{\"res\":\"passback02\"}","*");
        }
    }
};

//이벤트 리스너 등록
if(window.addEventListener && !adop_event_add008){
    adop_event_add008 = true;
    window.addEventListener("message",listener808,false);
} else if(window.attatchEvent){
    window.attachEvent("onmessage",listener808);
}

var checkLoad0988 = checkLoad0988 || function() {
    document.readyState !== "complete" ? setTimeout(checkLoad0988, 11) : adopRun837();
};
checkLoad0988();
setTimeout(function(){adopRun837()},200);
setTimeout(function(){adopRun837()},700);
setTimeout(function(){adopRun837()},5000);
//팩킹시 x3c주의!!!!