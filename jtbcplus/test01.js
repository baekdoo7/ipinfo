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

        if(p == "full"){
            div.setAttribute("style","width:100%;px;text-align:center;");
            setTimeout(function () {
                adoptag.closePopUp(i);
            },t);
        }
        else{//popup
            div.setAttribute("style","display:none;position:fixed;width:100%;height:100%;background-color:#000;left:0;top:0;overflow:hidden;opacity:1;padding-left:"+wcenter+"px;padding-top:"+hcenter+"px;z-index:99999;");
            //클로즈 버튼 설정
            closeButton.innerHTML = "<button style='color:white;background-color:black;border:none;position:absolute;top:"+(hcenter - 40)+"px;left:" + (parseInt(w) + parseInt(wcenter) + 10) + "px;font-size:30px;z-index:999999;' onclick='adoptag.closePopUp(\\""+i+"\\")'>X</button>";
            div.appendChild(closeButton);
            setTimeout(function () {
                adoptag.openPopUp(i);
            },t);
        }

        //div.style.display = "inline-block";
    }
};
