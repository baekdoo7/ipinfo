window.adoptag = window.adoptag || {cmd: []};

//환경변수 설정
adoptag.adReady     = false; //광고 노출 준비
adoptag.directAd    = false; //직광고 여부 false 면 네트워크 광고 노출
adoptag.delayTime   = 5000;  //직광고 대기 시간(ms)
adoptag.atomUrl     = "";  //아톰 요청 주소


//배열 push 재정의
var eventify = function(arr, callback) {
    arr.push = function(e) {
        Array.prototype.push.call(arr, e);
        callback(arr);
    };
};

//adoptag.cmd 핸들러 추가
eventify(adoptag.cmd,function (newArray) {
    adoptag.runcmd(newArray);
});

//cmd 배열 순서대로 실행
adoptag.runcmd = function(arr){
    var arrCount = arr.length;
    for(i=0; i<arrCount; i++){
        arr.shift()();
    }
};

//광고 노출 펑션
adoptag.display = function (k) {
    var obj = document.getElementById(k);
    var adopPosition=adopZonecd=adopWidth=adopHeight="";
    var adHtmlCd = "";
    var adExist  = false;
    var adAfterTime  = 0;

    if(obj){
        //기존 영역 삭제
        while (obj.firstChild) {
            obj.firstChild.remove();
        }

        //속성 읽기
        adopPosition = obj.getAttribute("_position");
        adopZonecd   = obj.getAttribute("_adop_zonecd");
        adopWidth    = obj.getAttribute("_width");
        adopHeight   = obj.getAttribute("_heigh");

        if(!adopPosition  || !adopZonecd  || !adopWidth  || !adopHeight ){ //속성이 존재 하지 않으면 리턴
            return;
        }
    }
    else{//display 영역이 없으면 리턴
        return;
    }

    //광고 대기 중이면 0.1초 뒤에 다시 노출 시도
    if(!adoptag.adReady){
        setTimeout(function () {
            adoptag.display(k);
        },100);
        return;
    }
    //광고 대기타임

    //광고 대기타임 지났으면 직광고와 간접광고 처리
    if(adoptag.directAd){//아톰에서 직광고 응답받은 경우
        if(adoptag.adinfo.existad){//아톰에서 직광고가 있는 경우
            //직광고 있을시 리프레시 타임 세팅
            if(typeof adoptag.adinfo.refreshtime != "undefined" && adoptag.adinfo.refreshtime > 0) {//리프레시 타임 세팅
                //팝업 및 풀 배너의 경우 리프레쉬 적용 않함.
                if(adopPosition.toLowerCase() != "popup" && adopPosition.toLowerCase() != "full" && adopPosition.toLowerCase() != "skin"){
                    setTimeout(function () {
                        adoptag.display(k);
                    },adoptag.adinfo.refreshtime*1000);
                }
            }
            if(adoptag.adinfo.loadblock){// 직광고 있고 로드블록인 경우
                adoptag.adinfo.adinfos.forEach(function (v,i) {
                    if(adopPosition == v.location){
                        adHtmlCd = v.htmlcd;
                        adAfterTime = v.timer;
                        adopWidth   = v.width;
                        adopHeight  = v.height;
                        adExist  = true;
                    }
                });
                if(adExist){//아톰광고 있으며 로드블록이 아니면서 영역광고가 있는경우
                    if(adopPosition.toLowerCase() == 'popup' || adopPosition.toLowerCase() == 'full'){//popup,full 영역의 경우
                        adoptag.fullPopUpAdWrite(k,adopPosition,adopWidth,adopHeight,adAfterTime);
                    }
                    else if(adopPosition.toLowerCase() == "skin"){//스킨배너일 경우
                        adoptag.skinAdWrite(k,adopPosition,adopWidth,adopHeight);
                    }
                    else{//직광고 이면서 popup,full 이 아닌경우
                        adoptag.directAdWrite(k,adopPosition,adopWidth,adopHeight);
                    }
                }
                //로드블록 이면서 직광고 없으면 광고 없음.
            }
            else{// 직광고 있지만 로드블록 아닌경우
                adoptag.adinfo.adinfos.forEach(function (v,i) {
                    if(adopPosition == v.location){
                        adHtmlCd = v.htmlcd;
                        adAfterTime = v.timer;
                        adopWidth   = v.width;
                        adopHeight  = v.height;
                        adExist  = true;
                    }
                });

                if(adExist){//아톰광고 있으며 로드블록이 아니면서 영역광고가 있는경우
                    if(adopPosition.toLowerCase() == 'popup' || adopPosition.toLowerCase() == 'full'){//popup,full 영역의 경우
                        adoptag.fullPopUpAdWrite(k,adopPosition,adopWidth,adopHeight,adAfterTime);
                    }
                    else if(adopPosition.toLowerCase() == "skin"){
                        adoptag.skinAdWrite(k,adopPosition,adopWidth,adopHeight);
                    }
                    else{//
                        adoptag.directAdWrite(k,adopPosition,adopWidth,adopHeight);
                    }
                }
                else{//직광고가 있으나 영역광고가 없는경우
                    if(adopPosition.toLowerCase() == 'popup' || adopPosition.toLowerCase() == 'full' || adopPosition.toLowerCase() == 'skin'){//popup,full 영역의 경우 네트웍광고 보내지 않음.
                        return;
                    }
                    adoptag.netAdWrite(k,adopZonecd,adopWidth,adopHeight,adopPosition);
                }
            }
        }
        else{//아톰에서 직광고가 없는경우(직광고가 아닌 네트웍광고는 리프레시 적용 않함.)
            if(adopPosition.toLowerCase() != "popup" && adopPosition.toLowerCase() != "full" && adopPosition.toLowerCase() != "skin"){
                adoptag.netAdWrite(k,adopZonecd,adopWidth,adopHeight,adopPosition);
            }
        }

    }
    else{//아톰에서 응답을 받지 못한 경우(네트웍광고 리프래쉬 적용 않함.)
        if(adopPosition.toLowerCase() != "popup" && adopPosition.toLowerCase() != "full" && adopPosition.toLowerCase() != "skin"){
            adoptag.netAdWrite(k,adopZonecd,adopWidth,adopHeight,adopPosition);
        }
    }


};
//full,popup close
adoptag.closePopUp = function(i){
    var div = document.getElementById(i);
    if(div){
        div.style.display = "none";
    }
};
//full,popup open
adoptag.openPopUp = function(i){
    var div = document.getElementById(i);
    if(div){
        div.style.display = "block";
    }
};
//skin AD 처리
adoptag.skinAdWrite = function(i,p,w,h){
    //body 스타일 변경
    var bodyTag = document.getElementsByTagName("body");
    var div = document.getElementById(i);

    if(!bodyTag[0] || !div){//body 태그가 없거나 ins tag가 없을경우 종료
        return;
    }
    // body 클래스에 'skinbanner_type' 추가
    bodyTag[0].setAttribute("class","skinbanner_type");
    //bodyTag[0].setAttribute("style","background:#f0f0f0;padding-top:200px;")

    //배경화면 세팅 작업
    var strIframeId    = "adopB" + Math.floor(Math.random()*10000) + 1;
    var ifr = document.createElement("iframe");
    var strIfrConts = "";

    //iframe 설정
    ifr.setAttribute("id",strIframeId);
    ifr.setAttribute("frameborder","0");
    ifr.setAttribute("marginwidth","0");
    ifr.setAttribute("marginheight","0");
    ifr.setAttribute("paddingwidth","0");
    ifr.setAttribute("paddingheight","0");
    ifr.setAttribute("scrolling","no");
    ifr.setAttribute("style","width:100%;height:"+h+"px;");

    div.appendChild(ifr);
    var ifrDoc = ifr.contentDocument || ifr.contentWindow.document;

    //직광고 소재 찾아 오기
    adoptag.adinfo.adinfos.forEach(function (v,i) {
        if(v.location == p){
            strIfrConts = atob(v.htmlcd);//base64 decoding 처리;
        }
    });

    if(ifrDoc != null){
        ifrDoc.open();
        ifrDoc.write(strIfrConts);
        ifrDoc.close();
    }

    if(typeof adoptag.paraminfo.device == "string" && adoptag.paraminfo.device.toLowerCase() == "mobile") {
        //모바일일경우 리턴
        return;
    }
    else{
        var divStyle = "position:fixed;display:block;min-width:1200px;height:975px;top:0;left:0;right:0;z-index:1;padding:0;overflow:hidden;";
        div.setAttribute("style",divStyle);
    }

}
//full,popup banner 노출
adoptag.fullPopUpAdWrite = function(i,p,w,h,t){
    var div = document.getElementById(i);
    if(div){
        var strIframeId    = "adopB" + Math.floor(Math.random()*10000) + 1;
        var ifr = document.createElement("iframe");
        var closeButton = document.createElement("div");
        var strIfrConts = "";


        //iframe 설정
        ifr.setAttribute("id",strIframeId);
        ifr.setAttribute("frameborder","0");
        ifr.setAttribute("marginwidth","0");
        ifr.setAttribute("marginheight","0");
        ifr.setAttribute("paddingwidth","0");
        ifr.setAttribute("paddingheight","0");
        ifr.setAttribute("scrolling","no");
        ifr.setAttribute("style","width:"+w+"px;height:"+h+"px;");
        //ifr.setAttribute("style","width:"+w+"px;height:auto;");

        div.appendChild(ifr);
        var ifrDoc = ifr.contentDocument || ifr.contentWindow.document;

        //직광고 소재 찾아 오기
        adoptag.adinfo.adinfos.forEach(function (v,i) {
            if(v.location == p){
                strIfrConts = atob(v.htmlcd);//base64 decoding 처리;
            }
        });

        if(ifrDoc != null){
            ifrDoc.open();
            ifrDoc.write(strIfrConts);
            ifrDoc.close();
        }
        //var wcenter = parseInt(((parseInt(document.body.offsetWidth)-w)/2)/parseInt(document.body.offsetWidth)*100);
        //var hcenter = parseInt(((parseInt(window.screen.height)-h)/2)/parseInt(window.screen.height)*100);

        var wcenter = parseInt(((parseInt(window.innerWidth)-w)/2));
        var hcenter = parseInt(((parseInt(window.innerHeight)-h)/2));

        //특정시간후에 닫히게처리(시간 조정)
        if(t<1000){
            t = t * 1000;
        }

        if(typeof adoptag.paraminfo.device == "string" && adoptag.paraminfo.device.toLowerCase() == "mobile") {//모바일일 경우 처리 pop,full 제외
            if(p == "full"){
                div.style.display = "inline-block";
                div.style.width   = "100%";
                div.style.height  = "auto";
                ifr.style.width   = "100%";

                //ifr.style.height  = "auto";
                ifr.onload = function () {
                    ifr.style.height = ifr.contentWindow.document.body.scrollHeight + 'px';
                };
                setTimeout(function () {
                    adoptag.closePopUp(i);
                },t);

            }
            else if(p == "popup"){
                div.setAttribute("style","display:none;position:fixed;width:100%;height:100%;background-color:#000;left:0;top:0;overflow:hidden;opacity:1;padding-top:"+40+"px;z-index:99999;");

                ifr.style.width   = "100%";
                ifr.style.height  = "910px";

                closeButton.innerHTML = "<button style='color:white;background-color:black;border:0;outline: 0;position:absolute;top:0px;right:0px;font-size:30px;z-index:999999;' onclick='adoptag.closePopUp(\""+i+"\")'>X</button>";
                div.appendChild(closeButton);
                setTimeout(function () {
                    adoptag.openPopUp(i);
                },t);

            }
        }
        else{
            if(p == "full"){
                div.setAttribute("style","width:100%;text-align:center;");
                div.style.margin  = "20px 0";
                setTimeout(function () {
                    adoptag.closePopUp(i);
                },t);
            }
            else{//popup
                div.setAttribute("style","display:none;position:fixed;width:100%;height:100%;background-color:#000;left:0;top:0;overflow:hidden;opacity:1;padding-left:"+wcenter+"px;padding-top:"+hcenter+"px;z-index:99999;");
                //클로즈 버튼 설정
                closeButton.innerHTML = "<button style='color:white;background-color:black;border:0;outline: 0;position:absolute;top:"+(hcenter - 40)+"px;left:" + (parseInt(w) + parseInt(wcenter) + 10) + "px;font-size:30px;z-index:999999;' onclick='adoptag.closePopUp(\""+i+"\")'>X</button>";
                div.appendChild(closeButton);
                setTimeout(function () {
                    adoptag.openPopUp(i);
                },t);
            }

        }



        //div.style.display = "inline-block";
    }
};
//직접 광고 노출(탑,푸터,인리드)
adoptag.directAdWrite = function(i,p,w,h){
    var div = document.getElementById(i);
    if(div){
        var strIframeId    = "adopB" + Math.floor(Math.random()*10000) + 1;
        var ifr = document.createElement("iframe");
        var strIfrConts = "";

        ifr.setAttribute("id",strIframeId);
        ifr.setAttribute("frameborder","0");
        ifr.setAttribute("marginwidth","0");
        ifr.setAttribute("marginheight","0");
        ifr.setAttribute("paddingwidth","0");
        ifr.setAttribute("paddingheight","0");
        ifr.setAttribute("scrolling","no");
        ifr.setAttribute("style","width:"+w+"px;height:"+h+"px;");
        div.style.width = "100%";
        div.style.textAlign = "center";
        div.style.display = "block";
        div.style.maxHeight ="none";
        div.appendChild(ifr);
        var ifrDoc = ifr.contentDocument || ifr.contentWindow.document;

        //직광고 소재 찾아 오기
        adoptag.adinfo.adinfos.forEach(function (v,i) {
            if(v.location == p){
                strIfrConts = atob(v.htmlcd);//base64 decoding 처리;
            }
        });

        if(ifrDoc != null){
            ifrDoc.open();
            ifrDoc.write(strIfrConts);
            ifrDoc.close();
        }
        if(typeof adoptag.paraminfo.device == "string" && adoptag.paraminfo.device.toLowerCase() == "mobile"){//모바일일 경우 처리 pop,full 제외
            if(p == 'top'){ //탑일경우 처리
                div.style.display = "inline-block";
                div.style.width   = "100%";
                div.style.height  = "auto";
                ifr.style.width   = "100%";
                ifr.style.height  = "auto";
                ifr.onload = function () {
                    ifr.style.height = ifr.contentWindow.document.body.scrollHeight + 'px';
                }

            }
            else if(p == 'footer'){//푸터일경우 처리
                div.style.display = "inline-block";
                div.style.width   = "100%";
                div.style.textAlign = "center";
                div.style.position = "fixed";
                div.style.bottom   = "0";
                div.style.height = h + "px";

            }
            else if(p == 'inread'){
                div.style.display = "inline-block";
                div.style.width   = "100%";
                div.style.height  = "auto";
                div.style.textAlign = "center";
                ifr.style.width   = "96%";
                ifr.onload = function () {
                    ifr.style.height = ifr.contentWindow.document.body.scrollHeight + 'px';
                }

            }
        }
        else{//모바일이 아닐경우 처리
            if(p == 'top') { //탑일경우 처리
                div.style.padding = "20px 0";
            }
            else if(p == 'footer'){//푸터일경우 처리
                div.style.margin = "0 0 20px";
            }
            else if(p == 'inread'){//인리드일경우 처리
                div.style.margin = "20px 0";
            }
        }


    }
};
//네트워크 광고 노출(직광고 없을경우)
adoptag.netAdWrite = function(i,z,w,h,p){
    var div = document.getElementById(i);

    if(div){
        var scr   = document.createElement("script");
        scr.src   = "//compass.adop.cc/assets/js/adop/adopJ.js?v=14";
        scr.async = true;

        var ins   = document.createElement("ins");
        ins.setAttribute("class","adsbyadop");
        ins.setAttribute("_adop_zon",z);
        ins.setAttribute("_adop_type","re");
        ins.setAttribute("style","display:inline-block;width:"+w+"px;height:"+h+"px;");
        ins.setAttribute("_page_url","");
        div.style.width = "100%";
        div.style.textAlign = "center";

        div.appendChild(ins);
        div.appendChild(scr);
        //div.style.display = "inline-block";
        div.style.display = "block";
        div.style.maxHeight ="none";
        if(typeof adoptag.paraminfo.device == "string" && adoptag.paraminfo.device.toLowerCase() == "mobile") {//모바일일 경우 중앙정렬
            if(p == "inread"){
                ins.style.width = "300px";
                ins.style.height = "250px";
            }
            else if(p == "footer"){
                div.style.position = "fixed";
                div.style.bottom = "0";
                div.style.height = h + "px";
            }
        }
        else{ //PC 일경우
            if(p == "top"){
                div.style.padding = "20px 0";
            }
            else if(p == "inread"){
                div.style.margin = "20px 0";
            }
            else if(p == "footer"){
                div.style.margin = "0 0 20px";
            }
        }
    }
};
//카테고리 변경 함수
adoptag.changeCate = function(c){
    adoptag.paraminfo.cate = c;
}
//호출 변수 세팅
adoptag.defineAdinfo = function(o){
    //console.log(typeof o);
    if(typeof o.device == 'undefined'){
        o.device = adoptag.getDeviceType();
    }
    if(typeof o.url == 'undefined'){
        o.url = encodeURIComponent(location.href);
    }

    adoptag.paraminfo = o;
};
//request data setting
adoptag.makeSendData = function(){
    return JSON.stringify(adoptag.paraminfo);
};
//서버 데이타 동기화
adoptag.sync = function(){
    adoptag.loadadandset(adoptag.atomUrl);
};
//pc,mobile 체크 리턴
adoptag.getDeviceType = function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return "mobile";
    }
    else
    {
        return "pc";
    }
};
//아톰 주소 세팅
adoptag.defineAtomUrl = function(u){
    adoptag.atomUrl = atob(u.substr(1));
};
//Load Json(json 읽어와 광고 세팅)
adoptag.loadadandset = function(u){
    var xhr;

    //환경변수 초기화
    adoptag.adReady     = false; //광고 노출 준비
    adoptag.directAd    = false; //직광고 여부 false 면 네트워크 광고 노출

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }
    else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //지연시간후에 네트웍광고 처리
    setTimeout(function () {
        adoptag.adReady = true;
    },adoptag.delayTime);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == xhr.DONE && xhr.status == 200){
            //console.log(xhr.responseText);
            adoptag.adinfo = JSON.parse(xhr.responseText);
            if( adoptag.adReady == false && typeof adoptag.adinfo == 'object' ){
                adoptag.directAd = true;
                adoptag.adReady  = true;
                if(typeof adoptag.adinfo.refreshtime != "undefined" && adoptag.adinfo.refreshtime > 0){//리프레시 타임 세팅
                    setTimeout(function () {
                        //adoptag.sync();
                        //console.log(adoptag.adinfo.refreshtime);
                    },(adoptag.adinfo.refreshtime-3)*1000);
                }
            }
        }
    };
    xhr.open("POST",u,true);
    //xhr.open("POST","test01.php",true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(encodeURI('object='+adoptag.makeSendData()));
    //console.log(encodeURI('object='+adoptag.makeSendData()));
};


//맨마지막에 cmd 비우기 위해 호출
adoptag.runcmd(adoptag.cmd);

