var listener582 = listener582 || function(e){
    //메시지가 스트링이 아니면 리턴
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
    if(strMsg.res){
        if(strMsg.res == "passback01" ){
            //패스백 처리
            goPassBack104();
            return  true;
        }
        else{
            //패스백 처리
            goPassBack102();
            return  true;
        }
    }
};
//패스백 처리
var goPassBack102 = goPassBack102 || function () {
    //영역 코드 확인
    try {
        var zoneCD = document.querySelector("ins.adsbygoogle").getAttribute("data-passback");
        var ifr    = document.getElementById('aswift_0');
    }
    catch (e) {
        console.log("패스백 데이타 읽어오다가 에러!");
    }
    //console.log("패스백 요청받음");
    if(!zoneCD){
        return false;
    }
    if(!ifr){
        return  false;
    }

    postMessage("792_"+frameElement.id+"_"+zoneCD,"*");
    if(window.top._gqidtestmode){console.log('a.변경처리 실행됨');}
    return;
};
//패스백 처리
var goPassBack104 = goPassBack104 || function () {
    //영역 코드 확인
    try {
        var zoneCD = document.querySelector("ins.adsbygoogle").getAttribute("data-passback");
        var ifr    = document.getElementById('aswift_0');
    }
    catch (e) {
        console.log("패스백 데이타 읽어오다가 에러!");
    }
    //console.log("패스백 요청받음");
    if(!zoneCD){
        return false;
    }
    if(!ifr){
        return  false;
    }
    var iurl = "//compass.adop.cc/RE/" + zoneCD;
    var strScriptLink = "<scr"+"ipt src='"+iurl+"'><\/scr"+"ipt>";
    ifr.setAttribute("onload","");
    ifrDoc = ifr.contentDocument || ifr.contentWindow.document;
    if(ifrDoc != null){
        ifrDoc.open();
        ifrDoc.write(strScriptLink);
        ifrDoc.close();
    }
    return ;
};
//이벤트 리스너 등록
if(window.addEventListener){
    window.addEventListener("message",listener582,false);
}
else if(window.attatchEvent){
    window.attachEvent("onmessage",listener582);
}

//adsense 광고 체크
setTimeout(function(){
    //패스백 처리
    var googleNoFrame =  document.getElementById('aswift_0');
    if(window.top._gqidtestmode){console.log("aswift_0 엘리먼트에 접근됨!!!");}
    if(googleNoFrame){
        if(googleNoFrame.getAttribute("src") != null){
            //noframe 새로 생성 필요
            var googleNoFrameParent = googleNoFrame.parentNode;
            googleNoFrameParent.removeChild(googleNoFrame);

            var strIframe     = "<iframe id='aswift_0' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";
            googleNoFrameParent.innerHTML = strIframe;

            //goPassBack102();
            window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}','*');
            return false;
        }

        var googleNoFrameDoc = googleNoFrame.contentDocument || googleNoFrame.contentWindow.document;
        if(googleNoFrameDoc != null){
            try {
                var googleQueryId = googleNoFrameDoc.getElementById("google_ads_frame1").getAttribute("data-google-query-id");
            }catch (e) {
                //goPassBack102();
                window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}','*');
                return ;
            }

            //document.getElementById("aswift_0").contentWindow.document.getElementById("google_ads_frame1").getAttribute("data-google-query-id");
            if(googleQueryId){
                window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"'+googleQueryId+'"}','*');
            }
            else{
                //goPassBack102();
                window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}','*');
            }
        }
        else{
            //패스백 처리
            //goPassBack102();
            window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}','*');
        }
    }
    else{
        //패스백 처리
        //goPassBack102();
        window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}','*');
    }
},1000);


==================

var listener582=listener582||function(a){if("string"!=typeof a.data)return!1;try{var b=JSON.parse(a.data)}catch(c){return!1}if(b.res)return"passback01"==b.res?goPassBack104():goPassBack102(),!0},goPassBack102=goPassBack102||function(){try{var a=document.querySelector("ins.adsbygoogle").getAttribute("data-passback"),b=document.getElementById("aswift_0")}catch(c){console.log("\ud328\uc2a4\ubc31 \ub370\uc774\ud0c0 \uc77d\uc5b4\uc624\ub2e4\uac00 \uc5d0\ub7ec!")}if(!a||!b)return!1;postMessage("792_"+frameElement.id+
    "_"+a,"*");window.top._gqidtestmode&&console.log("a.\ubcc0\uacbd\ucc98\ub9ac \uc2e4\ud589\ub428")},goPassBack104=goPassBack104||function(){try{var a=document.querySelector("ins.adsbygoogle").getAttribute("data-passback"),b=document.getElementById("aswift_0")}catch(c){console.log("\ud328\uc2a4\ubc31 \ub370\uc774\ud0c0 \uc77d\uc5b4\uc624\ub2e4\uac00 \uc5d0\ub7ec!")}if(!a||!b)return!1;a="<script src='//compass.adop.cc/RE/"+a+"'></scr"+"ipt>";b.setAttribute("onload","");ifrDoc=b.contentDocument||b.contentWindow.document;
    null!=ifrDoc&&(ifrDoc.open(),ifrDoc.write(a),ifrDoc.close())};window.addEventListener?window.addEventListener("message",listener582,!1):window.attatchEvent&&window.attachEvent("onmessage",listener582);
setTimeout(function(){var a=document.getElementById("aswift_0");window.top._gqidtestmode&&console.log("aswift_0 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \uc811\uadfc\ub428!!!");if(a){if(null!=a.getAttribute("src")){var b=a.parentNode;b.removeChild(a);b.innerHTML="<iframe id='aswift_0' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}',"*");
    return!1}a=a.contentDocument||a.contentWindow.document;if(null!=a){try{b=a.getElementById("google_ads_frame1").getAttribute("data-google-query-id")}catch(c){window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}',"*");return}b?window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"'+b+'"}',"*"):window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}',"*")}else window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}',"*")}else window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}',
    "*")},1E3);



=========================
기존 코드(adsense ) vop_content_250x250

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
style="display:inline-block;width:250px;height:250px"
data-ad-client="ca-pub-6118422997023625"
data-ad-slot="9080593163"
data-override-format="true"
data-page-url="https://www.vop.co.kr/"
data-passback="2432c8fd-0730-4f02-8b25-57850bf130ad"
    >
    </ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
<script>
var listener582=listener582||function(a){if("string"!=typeof a.data)return!1;try{var b=JSON.parse(a.data)}catch(c){return!1}if(b.res)return"passback01"==b.res?goPassBack104():goPassBack102(),!0},goPassBack102=goPassBack102||function(){try{var a=document.querySelector("ins.adsbygoogle").getAttribute("data-passback"),b=document.getElementById("aswift_0")}catch(c){console.log("\ud328\uc2a4\ubc31 \ub370\uc774\ud0c0 \uc77d\uc5b4\uc624\ub2e4\uac00 \uc5d0\ub7ec!")}if(!a||!b)return!1;postMessage("792_"+frameElement.id+
    "_"+a,"*")},goPassBack104=goPassBack104||function(){try{var a=document.querySelector("ins.adsbygoogle").getAttribute("data-passback"),b=document.getElementById("aswift_0")}catch(c){console.log("\ud328\uc2a4\ubc31 \ub370\uc774\ud0c0 \uc77d\uc5b4\uc624\ub2e4\uac00 \uc5d0\ub7ec!")}if(!a||!b)return!1;a="<script src='//compass.adop.cc/RE/"+a+"'></scr"+"ipt>";b.setAttribute("onload","");ifrDoc=b.contentDocument||b.contentWindow.document;null!=ifrDoc&&(ifrDoc.open(),ifrDoc.write(a),ifrDoc.close())};
window.addEventListener?window.addEventListener("message",listener582,!1):window.attatchEvent&&window.attachEvent("onmessage",listener582);
setTimeout(function(){var a=document.getElementById("aswift_0");if(a){if(null!=a.getAttribute("src")){var b=a.parentNode;b.removeChild(a);b.innerHTML="<iframe id='aswift_0' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');return!1}a=a.contentDocument||a.contentWindow.document;if(null!=a){try{b=a.getElementById("google_ads_frame1").getAttribute("data-google-query-id")}catch(c){window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');
    return}b?window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"'+b+'"}'):window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}')}else window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}')}else window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}')},1E3);
</script>
====================================================================================
====================================================================================
var listener582 = listener582 || function(e){
    //메시지가 스트링이 아니면 리턴
    if(typeof e.data != "string"){
        return false;
    }
    console.log('test:100 - '+ e.data);
    //메시지가 제이슨 타입이 아니면 리턴
    try {
        var strMsg = JSON.parse(e.data);
    } catch (error) {
        return false;
    }
    //에드센스 광고 있는 경우만 광고 키값을 전역변수에 넣어둠.
    if(strMsg.res){
        if(strMsg.res == "passback01" ){
            //패스백 처리
            goPassBack104();
            return  true;
        }
        else{
            //패스백 처리
            goPassBack102();
            return  true;
        }
    }
};
//패스백 처리
var goPassBack102 = goPassBack102 || function () {
    //영역 코드 확인
    try {
        var zoneCD = document.querySelector("ins.adsbygoogle").getAttribute("data-passback");
        var ifr    = document.getElementById('aswift_0');
    }
    catch (e) {
        console.log("패스백 데이타 읽어오다가 에러!");
    }
    //console.log("패스백 요청받음");
    if(!zoneCD){
        return false;
    }
    if(!ifr){
        return  false;
    }

    postMessage("792_"+frameElement.id+"_"+zoneCD,"*");
    return;
};
//패스백 처리
var goPassBack104 = goPassBack104 || function () {
    //영역 코드 확인
    try {
        var zoneCD = document.querySelector("ins.adsbygoogle").getAttribute("data-passback");
        var ifr    = document.getElementById('aswift_0');
    }
    catch (e) {
        console.log("패스백 데이타 읽어오다가 에러!");
    }
    //console.log("패스백 요청받음");
    if(!zoneCD){
        return false;
    }
    if(!ifr){
        return  false;
    }
    var iurl = "//compass.adop.cc/RE/" + zoneCD;
    var strScriptLink = "<scr"+"ipt src='"+iurl+"'><\/scr"+"ipt>";
    ifr.setAttribute("onload","");
    ifrDoc = ifr.contentDocument || ifr.contentWindow.document;
    if(ifrDoc != null){
        ifrDoc.open();
        ifrDoc.write(strScriptLink);
        ifrDoc.close();
    }
    return ;
};
//이벤트 리스너 등록
if(window.addEventListener){
    window.addEventListener("message",listener582,false);
}
else if(window.attatchEvent){
    window.attachEvent("onmessage",listener582);
}

//adsense 광고 체크
setTimeout(function(){
    //패스백 처리
    var googleNoFrame =  document.getElementById('aswift_0');
    if(googleNoFrame){
        if(googleNoFrame.getAttribute("src") != null){
            //noframe 새로 생성 필요
            var googleNoFrameParent = googleNoFrame.parentNode;
            googleNoFrameParent.removeChild(googleNoFrame);

            var strIframe     = "<iframe id='aswift_0' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";
            googleNoFrameParent.innerHTML = strIframe;

            //goPassBack102();
            console.log("test:100");
            window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');
            return false;
        }

        var googleNoFrameDoc = googleNoFrame.contentDocument || googleNoFrame.contentWindow.document;
        if(googleNoFrameDoc != null){
            try {
                var googleQueryId = googleNoFrameDoc.getElementById("google_ads_frame1").getAttribute("data-google-query-id");
            }catch (e) {
                //goPassBack102();
                console.log("test:110");
                window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');
                return ;
            }

            //document.getElementById("aswift_0").contentWindow.document.getElementById("google_ads_frame1").getAttribute("data-google-query-id");
            if(googleQueryId){
                console.log("test:120");
                window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"'+googleQueryId+'"}');
            }
            else{
                //goPassBack102();
                console.log("test:130");
                window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');
            }
        }
        else{
            //패스백 처리
            //goPassBack102();
            console.log("test:140");
            window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');
        }
    }
    else{
        //패스백 처리
        //goPassBack102();
        console.log("test:150");
        window.top.postMessage('{"adopMsgType":"checkit","adopGqid":"__baekdoo__"}');
    }
},1000);





=======================================================
    {"refreshtime":"0","loadblock":true,"adinfos":[{"location":"top","timer":"0","width":"970","height":"90","htmlcd":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImtvIj4KPGhlYWQ+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LXR5cGUiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIG5hbWU9InZpZXdwb3J0Ii8+CiAgICA8dGl0bGU+QWRzQnlBRE9QPC90aXRsZT4KICAgIDxzdHlsZT4KICAgICAgICAqIHsgcGFkZGluZzowcHg7IG1hcmdpbjowcHg7IGJvcmRlci1zdHlsZTogbm9uZTt9CiAgICAgICAgYSB7IHRleHQtZGVjb3JhdGlvbjpub25lOyBjb2xvcjojMzEzNTM0OyB9CiAgICAgICAgZGl2IHsgdGV4dC1hbGlnbjogbGVmdDsgfQogICAgICAgIHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgfQogICAgICAgICAgICAgICAgLmF0b21fYWRfYm94IHtkaXNwbGF5OmJsb2NrOyBwb3NpdGlvbjpyZWxhdGl2ZTsgd2lkdGg6OTcwcHg7IGhlaWdodDo5MHB4OyBtYXJnaW46YXV0bzsgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTt9CiAgICAgICAgLmF0b20tYWQtaW1nIHsgd2lkdGg6OTcwcHg7IGhlaWdodDo5MHB4OyB9CiAgICAgICAgCiAgICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5IHN0eWxlPSJwYWRkaW5nOjA7IG1hcmdpbjowOyI+CjxkaXYgY2xhc3M9ImF0b21fYWRfYm94Ij4KICAgICAgICA8YSBocmVmPSJodHRwczovL2RzcC5hZG9wLmNjL3NlcnZpbmcvYz91PTE1OTImZz0zODcmYz0xMjExJmNtPTE1NzImdGE9MTgzOCZpPTU4OTgmaWc9MTU5MiZhcj0mdHA9MCZwYT0wJnBmPTAmcHA9MCZyZz05OSZyPWh0dHBzJTNBJTJGJTJGYWRvcC5jYyZzPWh0dHBzJTNBJTJGJTJGdC5lc3F1aXJla29yZWEuY28ua3IlMkYiIHRhcmdldD0iX2JsYW5rIj4KICAgICAgICA8aW1nIGNsYXNzPSJhdG9tLWFkLWltZyIgc3JjPSIiPiAgICA8L2E+CiAgICAgICAgPHNjcmlwdCBzcmM9Ii8vZGF0YS5hZG9wLmNjL2ltcD91PTE1OTImYT02ZGJmMzcwZC1jMThjLTRjODktOGY0My03OWQyN2RkY2U3OTkmZz0zODcmYz0xMjExJmNtPTE1NzImdGE9MTgzOCZpPTU4OTgmaWc9MTU5MiZhcj0mdHA9MCZwYT0wJnBmPTAmcHA9MCZyZz05OSZ0eT1pbXAma2U9ZGY2MTI4MzEtYWM5OC00OWNiLWJiNzEtZmFjNjZkZjBiZWI1Ij48L3NjcmlwdD4KICAgIDwvZGl2Pgo8L2JvZHk+CjxzY3JpcHQgc3JjPSIvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2pxdWVyeS8xLjExLjEvanF1ZXJ5Lm1pbi5qcyI+PC9zY3JpcHQ+CjwvaHRtbD4K"},{"location":"full","timer":"10","width":"720","height":"300_full","htmlcd":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImtvIj4KPGhlYWQ+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LXR5cGUiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIG5hbWU9InZpZXdwb3J0Ii8+CiAgICA8dGl0bGU+QWRzQnlBRE9QPC90aXRsZT4KICAgIDxzdHlsZT4KICAgICAgICAqIHsgcGFkZGluZzowcHg7IG1hcmdpbjowcHg7IGJvcmRlci1zdHlsZTogbm9uZTt9CiAgICAgICAgYSB7IHRleHQtZGVjb3JhdGlvbjpub25lOyBjb2xvcjojMzEzNTM0OyB9CiAgICAgICAgZGl2IHsgdGV4dC1hbGlnbjogbGVmdDsgfQogICAgICAgIHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgfQogICAgICAgICAgICAgICAgLmF0b21fYWRfYm94IHtkaXNwbGF5OmJsb2NrOyBwb3NpdGlvbjpyZWxhdGl2ZTsgd2lkdGg6NzIwcHg7IGhlaWdodDozMDBfZnVsbHB4OyBtYXJnaW46YXV0bzsgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTt9CiAgICAgICAgLmF0b20tYWQtaW1nIHsgd2lkdGg6NzIwcHg7IGhlaWdodDozMDBfZnVsbHB4OyB9CiAgICAgICAgCiAgICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5IHN0eWxlPSJwYWRkaW5nOjA7IG1hcmdpbjowOyI+CjxkaXYgY2xhc3M9ImF0b21fYWRfYm94Ij4KICAgICAgICA8YSBocmVmPSJodHRwczovL2RzcC5hZG9wLmNjL3NlcnZpbmcvYz91PTE1OTImZz0zODcmYz0xMjExJmNtPTE1NzImdGE9MTgzOCZpPTU4OTkmaWc9MTU5MiZhcj0mdHA9MCZwYT0wJnBmPTAmcHA9MCZyZz05OSZyPWh0dHBzJTNBJTJGJTJGYWRvcC5jYyZzPWh0dHBzJTNBJTJGJTJGdC5lc3F1aXJla29yZWEuY28ua3IlMkYiIHRhcmdldD0iX2JsYW5rIj4KICAgICAgICA8aW1nIGNsYXNzPSJhdG9tLWFkLWltZyIgc3JjPSJodHRwczovL2F0b21jZG4uYWRvcC5jYy9hZGltYWdlL2Q3MmZiYmNjZDlmZTY0YzNhMTRmODVkMjI1YTA0NmY0L2U2ZmY5YjFhYTg1NjNiZDcwNDY0YTgzYWE1NGNkOTAyIj4gICAgPC9hPgogICAgICAgIDxzY3JpcHQgc3JjPSIvL2RhdGEuYWRvcC5jYy9pbXA\/dT0xNTkyJmE9NDk2NTYwMTUtMmM2OS00ZWVmLWJjMmMtOTc2MWExODhiNDY3Jmc9Mzg3JmM9MTIxMSZjbT0xNTcyJnRhPTE4MzgmaT01ODk5JmlnPTE1OTImYXI9JnRwPTAmcGE9MCZwZj0wJnBwPTAmcmc9OTkmdHk9aW1wJmtlPWNkMzBlMGEwLWE5OWItNDg4ZC1hNmQ0LTdlMDU3YmVhZWM3NCI+PC9zY3JpcHQ+CiAgICA8L2Rpdj4KPC9ib2R5Pgo8c2NyaXB0IHNyYz0iLy9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9qcXVlcnkvMS4xMS4xL2pxdWVyeS5taW4uanMiPjwvc2NyaXB0Pgo8L2h0bWw+Cg=="},{"location":"footer","timer":"0","width":"300","height":"250","htmlcd":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImtvIj4KPGhlYWQ+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LXR5cGUiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIG5hbWU9InZpZXdwb3J0Ii8+CiAgICA8dGl0bGU+QWRzQnlBRE9QPC90aXRsZT4KICAgIDxzdHlsZT4KICAgICAgICAqIHsgcGFkZGluZzowcHg7IG1hcmdpbjowcHg7IGJvcmRlci1zdHlsZTogbm9uZTt9CiAgICAgICAgYSB7IHRleHQtZGVjb3JhdGlvbjpub25lOyBjb2xvcjojMzEzNTM0OyB9CiAgICAgICAgZGl2IHsgdGV4dC1hbGlnbjogbGVmdDsgfQogICAgICAgIHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgfQogICAgICAgICAgICAgICAgLmF0b21fYWRfYm94IHtkaXNwbGF5OmJsb2NrOyBwb3NpdGlvbjpyZWxhdGl2ZTsgd2lkdGg6MzAwcHg7IGhlaWdodDoyNTBweDsgbWFyZ2luOmF1dG87IGJhY2tncm91bmQtY29sb3I6d2hpdGU7fQogICAgICAgIC5hdG9tLWFkLWltZyB7IHdpZHRoOjMwMHB4OyBoZWlnaHQ6MjUwcHg7IH0KICAgICAgICAKICAgIDwvc3R5bGU+CjwvaGVhZD4KPGJvZHkgc3R5bGU9InBhZGRpbmc6MDsgbWFyZ2luOjA7Ij4KPGRpdiBjbGFzcz0iYXRvbV9hZF9ib3giPgogICAgICAgIDxhIGhyZWY9Imh0dHBzOi8vZHNwLmFkb3AuY2Mvc2VydmluZy9jP3U9MTU5MiZnPTM4NyZjPTEyMTEmY209MTU3MiZ0YT0xODM4Jmk9NTkwMCZpZz0xNTkyJmFyPSZ0cD0wJnBhPTAmcGY9MCZwcD0wJnJnPTk5JnI9aHR0cHMlM0ElMkYlMkZhZG9wLmNjJnM9aHR0cHMlM0ElMkYlMkZ0LmVzcXVpcmVrb3JlYS5jby5rciUyRiIgdGFyZ2V0PSJfYmxhbmsiPgogICAgICAgIDxpbWcgY2xhc3M9ImF0b20tYWQtaW1nIiBzcmM9Imh0dHBzOi8vYXRvbWNkbi5hZG9wLmNjL2FkaW1hZ2UvZDcyZmJiY2NkOWZlNjRjM2ExNGY4NWQyMjVhMDQ2ZjQvNjZkY2I2Y2I1OWRkZDYwY2JkMzZhYWM0NWRlMWM2NjkiPiAgICA8L2E+CiAgICAgICAgPHNjcmlwdCBzcmM9Ii8vZGF0YS5hZG9wLmNjL2ltcD91PTE1OTImYT1kYTFkYzZhNC00NDUxLTRhNjEtYWU1Yy1iNzU1ZWVhYmZlYTQmZz0zODcmYz0xMjExJmNtPTE1NzImdGE9MTgzOCZpPTU5MDAmaWc9MTU5MiZhcj0mdHA9MCZwYT0wJnBmPTAmcHA9MCZyZz05OSZ0eT1pbXAma2U9MGEwYmJlZGMtZmIxNy00OGMyLTk0MWItMTU1MTM1OWQyNTU0Ij48L3NjcmlwdD4KICAgIDwvZGl2Pgo8L2JvZHk+CjxzY3JpcHQgc3JjPSIvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2pxdWVyeS8xLjExLjEvanF1ZXJ5Lm1pbi5qcyI+PC9zY3JpcHQ+CjwvaHRtbD4K"},{"location":"inread","timer":"0","width":"320","height":"320_i","htmlcd":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImtvIj4KPGhlYWQ+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LXR5cGUiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIG5hbWU9InZpZXdwb3J0Ii8+CiAgICA8dGl0bGU+QWRzQnlBRE9QPC90aXRsZT4KICAgIDxzdHlsZT4KICAgICAgICAqIHsgcGFkZGluZzowcHg7IG1hcmdpbjowcHg7IGJvcmRlci1zdHlsZTogbm9uZTt9CiAgICAgICAgYSB7IHRleHQtZGVjb3JhdGlvbjpub25lOyBjb2xvcjojMzEzNTM0OyB9CiAgICAgICAgZGl2IHsgdGV4dC1hbGlnbjogbGVmdDsgfQogICAgICAgIHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgfQogICAgICAgICAgICAgICAgLmF0b21fYWRfYm94IHtkaXNwbGF5OmJsb2NrOyBwb3NpdGlvbjpyZWxhdGl2ZTsgd2lkdGg6MzIwcHg7IGhlaWdodDozMjBfaXB4OyBtYXJnaW46YXV0bzsgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTt9CiAgICAgICAgLmF0b20tYWQtaW1nIHsgd2lkdGg6MzIwcHg7IGhlaWdodDozMjBfaXB4OyB9CiAgICAgICAgCiAgICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5IHN0eWxlPSJwYWRkaW5nOjA7IG1hcmdpbjowOyI+CjxkaXYgY2xhc3M9ImF0b21fYWRfYm94Ij4KICAgICAgICA8YSBocmVmPSJodHRwczovL2RzcC5hZG9wLmNjL3NlcnZpbmcvYz91PTE1OTImZz0zODcmYz0xMjExJmNtPTE1NzImdGE9MTgzOCZpPTU5MDEmaWc9MTU5MiZhcj0mdHA9MCZwYT0wJnBmPTAmcHA9MCZyZz05OSZyPWh0dHBzJTNBJTJGJTJGYWRvcC5jYyZzPWh0dHBzJTNBJTJGJTJGdC5lc3F1aXJla29yZWEuY28ua3IlMkYiIHRhcmdldD0iX2JsYW5rIj4KICAgICAgICA8aW1nIGNsYXNzPSJhdG9tLWFkLWltZyIgc3JjPSIiPiAgICA8L2E+CiAgICAgICAgPHNjcmlwdCBzcmM9Ii8vZGF0YS5hZG9wLmNjL2ltcD91PTE1OTImYT0zN2RlYzBjNi05MGJhLTQ0NTgtOGFlZS1hMGYxN2ZmMGJkNjYmZz0zODcmYz0xMjExJmNtPTE1NzImdGE9MTgzOCZpPTU5MDEmaWc9MTU5MiZhcj0mdHA9MCZwYT0wJnBmPTAmcHA9MCZyZz05OSZ0eT1pbXAma2U9MGRhZjc0OTYtODY4Ni00M2ZjLWE4YjctM2IyN2M3ZTM2Y2I2Ij48L3NjcmlwdD4KICAgIDwvZGl2Pgo8L2JvZHk+CjxzY3JpcHQgc3JjPSIvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2pxdWVyeS8xLjExLjEvanF1ZXJ5Lm1pbi5qcyI+PC9zY3JpcHQ+CjwvaHRtbD4K"},{"location":"popup","timer":"0","width":"1280","height":"720","htmlcd":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImtvIj4KPGhlYWQ+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LXR5cGUiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIG5hbWU9InZpZXdwb3J0Ii8+CiAgICA8dGl0bGU+QWRzQnlBRE9QPC90aXRsZT4KICAgIDxzdHlsZT4KICAgICAgICAqIHsgcGFkZGluZzowcHg7IG1hcmdpbjowcHg7IGJvcmRlci1zdHlsZTogbm9uZTt9CiAgICAgICAgYSB7IHRleHQtZGVjb3JhdGlvbjpub25lOyBjb2xvcjojMzEzNTM0OyB9CiAgICAgICAgZGl2IHsgdGV4dC1hbGlnbjogbGVmdDsgfQogICAgICAgIHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgfQogICAgICAgICAgICAgICAgLmF0b21fYWRfYm94IHtkaXNwbGF5OmJsb2NrOyBwb3NpdGlvbjpyZWxhdGl2ZTsgd2lkdGg6MTI4MHB4OyBoZWlnaHQ6NzIwcHg7IG1hcmdpbjphdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO30KICAgICAgICAuYXRvbS1hZC1pbWcgeyB3aWR0aDoxMjgwcHg7IGhlaWdodDo3MjBweDsgfQogICAgICAgIAogICAgPC9zdHlsZT4KPC9oZWFkPgo8Ym9keSBzdHlsZT0icGFkZGluZzowOyBtYXJnaW46MDsiPgo8ZGl2IGNsYXNzPSJhdG9tX2FkX2JveCI+CiAgICAgICAgPGEgaHJlZj0iaHR0cHM6Ly9kc3AuYWRvcC5jYy9zZXJ2aW5nL2M\/dT0xNTkyJmc9Mzg3JmM9MTIxMSZjbT0xNTcyJnRhPTE4MzgmaT01OTAyJmlnPTE1OTImYXI9JnRwPTAmcGE9MCZwZj0wJnBwPTAmcmc9OTkmcj1odHRwcyUzQSUyRiUyRmFkb3AuY2Mmcz1odHRwcyUzQSUyRiUyRnQuZXNxdWlyZWtvcmVhLmNvLmtyJTJGIiB0YXJnZXQ9Il9ibGFuayI+CiAgICAgICAgPGltZyBjbGFzcz0iYXRvbS1hZC1pbWciIHNyYz0iIj4gICAgPC9hPgogICAgICAgIDxzY3JpcHQgc3JjPSIvL2RhdGEuYWRvcC5jYy9pbXA\/dT0xNTkyJmE9MmRiZTNmODgtMDVhZS00YzU2LTgxNWItMzUxZTU4MTk3YTJhJmc9Mzg3JmM9MTIxMSZjbT0xNTcyJnRhPTE4MzgmaT01OTAyJmlnPTE1OTImYXI9JnRwPTAmcGE9MCZwZj0wJnBwPTAmcmc9OTkmdHk9aW1wJmtlPTMwMmI0ODVhLWE4N2QtNDEwMS1iOTExLThjOWM0YmVmMDdlZCI+PC9zY3JpcHQ+CiAgICA8L2Rpdj4KPC9ib2R5Pgo8c2NyaXB0IHNyYz0iLy9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9qcXVlcnkvMS4xMS4xL2pxdWVyeS5taW4uanMiPjwvc2NyaXB0Pgo8L2h0bWw+Cg=="}]}




    [pc 에스콰이 1]     : https://t.esquirekorea.co.kr/?adc=1558&adv=417472ab3e2d56837f7bb483842a26b9
    [pc 코스모폴리탄 1]  : https://t.cosmopolitan.co.kr/?adc=1558&adv=417472ab3e2d56837f7bb483842a26b9
    [pc 하퍼스바자 1]    : https://t.harpersbazaar.co.kr/?adc=1558&adv=417472ab3e2d56837f7bb483842a26b9
    [pc 엘르 1]        : https://t.elle.co.kr/?adc=1558&adv=417472ab3e2d56837f7bb483842a26b9
