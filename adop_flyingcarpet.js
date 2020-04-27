//랜덤 키생성(3자리 랜덤 문자열)
function makeid328()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//플라잉카펫 광고 시작
function adop_flying_start(){
//플라잉 카펫 뷰어 id 구하기
    var flying_div = document.getElementById("adop_flyingcarpet");

    //플라잉카펫 영역 정보 및 뷰어위치가 없으면 종료
    if(!(flying_div && adop_flying)){
        return;
    }

    //플라잉 카펫 최상단 컨테이너 환경 설정
    var flying_div_style = "position:relative;;width:100%;height:"+adop_flying.viewer+"px;"
    flying_div.setAttribute("style",flying_div_style);

    //광고 영역 생성(no프레임으로 기본생성)
    var __url          = "//compass.adop.cc/RE/" + adop_flying.zoneid;
    var strFlyingMidId = "adopM" + Math.floor(Math.random()*10000) + 1;
    var strFlyingAdId  = "adopF" + Math.floor(Math.random()*10000) + 1;
    var strIframeId    = "adopB" + Math.floor(Math.random()*10000) + 1;
    var strIframe      = "<iframe id='"+strIframeId+"' frameborder='0' marginwidth='0' marginheight='0' paddingwidth='0' paddingheight='0' scrolling='no' style='width: 100%; height: 100%;' ></iframe>";
    var strScriptLink  = "<script src='"+__url+"'><\/script>";

    flying_div.innerHTML = "<div id='"+strFlyingMidId+"' style='width:"+adop_flying.width+"px;height:"+adop_flying.height+"px; '><div id='"+strFlyingAdId+"'>"+strIframe+"</div></div>";

    var passbackIframe = document.getElementById(strIframeId);
    var passbackIframeDoc = passbackIframe.contentDocument || passbackIframe.contentWindow.document;
    if(passbackIframeDoc != null){
        passbackIframeDoc.open();
        passbackIframeDoc.write(strScriptLink);
        passbackIframeDoc.close();
    }

    //스타일 작업
    var flying_mid_contanier = document.getElementById(strFlyingMidId);
    var flying_viewer_ad = document.getElementById(strFlyingAdId);
    if(!(flying_viewer_ad && flying_mid_contanier)){
        flying_div.setAttribute("style","display:none;");
        return;
    }

    var flying_mid_contanier_style = "position:absolute;width:100%;height:100%;clip:rect(auto auto auto auto);";
    flying_mid_contanier.setAttribute("style",flying_mid_contanier_style);
    var flying_viewer_ad_adjust = (window.innerHeight - adop_flying.height) / 2 + parseInt(adop_flying.adjust);

    var flying_viewer_ad_style = "top:"+flying_viewer_ad_adjust+"px;width:"+adop_flying.width+"px;height:"+adop_flying.height+"px;position:fixed;left:50%;margin-left: -"+adop_flying.width/2+"px;"

    flying_viewer_ad.setAttribute("style",flying_viewer_ad_style);
}

//도큐먼트 레디후에 광고 시작
document.addEventListener("DOMContentLoaded", function(){
    adop_flying_start();
});



