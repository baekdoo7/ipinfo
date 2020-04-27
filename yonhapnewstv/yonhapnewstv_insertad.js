(function () {

    //환경변수값 읽어 오기
    var adop_nth     = document.currentScript.getAttribute('data-nth');
    var adop_keyword = document.currentScript.getAttribute('data-keyword');
    var adop_zone    = document.currentScript.getAttribute('data-zone');
    var adop_width   = document.currentScript.getAttribute('data-width');
    var adop_height  = document.currentScript.getAttribute('data-height');
    var adop_dptype  = document.currentScript.getAttribute('data-dptype');
    var adop_type    = "re";

    document.addEventListener("DOMContentLoaded",adopad_display );
    function adopad_display() {
        //keyword 가 본문에 없으면 종료
        if(adop_keyword == null || document.getElementsByTagName('body')[0].textContent.indexOf(adop_keyword) == -1){
            return;
        }

        //<br> 갯수 체크
        if(adop_nth == null || document.querySelectorAll('.detail br').length < adop_nth){
            return;
        }

        //동적으로 광고 코드 만든후 삽입
        var wrapper = document.createElement("div");
        if(adop_dptype == '1'){
            wrapper.setAttribute("style","width:"+ adop_width +"px; height:" + adop_height + "px; margin:0 auto; float:right;");
        }
        else{
            wrapper.setAttribute("style","width:"+ adop_width +"px; height:" + adop_height + "px; margin:0 auto;");
        }


        var cpsInstag = document.createElement("ins");
        cpsInstag.setAttribute("class","adsbyadop");
        cpsInstag.setAttribute("_adop_zon" ,adop_zone);
        cpsInstag.setAttribute("_adop_type",adop_type);
        cpsInstag.setAttribute("style", "display:inline-block;width:"+ adop_width +"px;height:"+ adop_height +"px;");
        cpsInstag.setAttribute("_page_url","");

        var cpsScript = document.createElement("script");
        cpsScript.src = "//compass.adop.cc/assets/js/adop/adopJ.js?v=14";

        wrapper.appendChild(cpsInstag);
        wrapper.appendChild(cpsScript);

        document.querySelectorAll('.detail br')[adop_nth].after(wrapper);

    }
}());

