const adopDiv = document.currentScript.getAttribute('data-id');
const adopWidth = document.currentScript.getAttribute('data-width');
const adopHeight = document.currentScript.getAttribute('data-height');
const adopZone = document.currentScript.getAttribute('data-zone');
const adopType = document.currentScript.getAttribute('data-type');
const adopCl = document.currentScript.getAttribute('data-cl');
const adopFl = document.currentScript.getAttribute('data-fl');
const adopFlWidth = document.currentScript.getAttribute('data-fl-width');
const target = document.getElementById(adopDiv); // 요소의 id 값이 target이라 가정
const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값
const offsetTop   = target.offsetTop; // 광고 위치의 절대 좌표
const absoluteTop = window.pageYOffset + relativeTop;
let last_known_scroll_position = 0;
let ticking = false;
let makeAds = false;
let moved = false; // 광고가 움직였는지
var avaec = false; // adop video ads execute chk
var adopPassbackFl = false; //패스백이 되었는지 여부

//광고 호출
let getAds = function(){
    let h = adopHeight;
    let w = adopWidth;

    target.style.height = h+"px";
    let wrapper = document.createElement("div");
    wrapper.setAttribute("style","width:"+ w +"px; margin:0 auto;");

    let cpsInstag = document.createElement("ins");
    cpsInstag.setAttribute("class","adsbyadop");
    cpsInstag.setAttribute("_adop_zon",adopZone);
    cpsInstag.setAttribute("_adop_type", adopType);
    cpsInstag.setAttribute("style", "display:inline-block;width:"+ w +"px;height:"+ h +"px;");
    cpsInstag.setAttribute("_page_url","");

    let cpsScript = document.createElement("script");
    cpsScript.src = "//compass.adop.cc/assets/js/adop/adopJ.js?v=14";

    wrapper.appendChild(cpsInstag);
    wrapper.appendChild(cpsScript);

    target.appendChild(wrapper);

}

let colleapse = function(scroll_pos) {
    //스크롤 위치 조건
    // if(scroll_pos > absoluteTop - window.innerHeight + window.pageYOffset/2.5 ){
    let adopad_pos = document.getElementById(adopDiv).offsetTop;
    //console.log(scroll_pos+'/'+adopad_pos+'/'+(window.innerHeight*0.6));
    if(scroll_pos > adopad_pos - (window.innerHeight*0.6)  ){
        // 광고를 호출했는지 확인
        if(!makeAds){
            makeAds = true;
            getAds();
        }
    }
}

var adop_transform = function(mv){
    const if_doc = target.getElementsByTagName('iframe')[0].contentWindow.document;
    const adContainer = if_doc.getElementById('adop-adContainer');
    let h = parseInt(adopWidth)*0.5625;
    let w = parseInt(adopWidth);

    if(!mv){
        h = parseInt(adopFlWidth)*0.5625;
        w = parseInt(adopFlWidth);
        let h60 = h+60;

        target.setAttribute('style','position:fixed;bottom:0px;right:0;');
        target.style.height = h60+"px";
        target.style.width = w+"px";

        target.childNodes[0].style.width = w+"px";
        target.getElementsByTagName('ins')[0].querySelector('div').setAttribute('style','width:'+w+'px;height:'+h60+'px');

        if(if_doc.getElementById('adBox')!=null){
            if_doc.getElementById('adBox').setAttribute('style','width:'+w+'px;height:'+h60+'px');
        }
        if_doc.getElementById('adop-video-total').setAttribute('style','width:'+w+'px;height:'+h60+'px;');

        adContainer.querySelector('div').style.width = w;
        adContainer.querySelector('div').style.height = h;
        adContainer.querySelector('video').style.width = w;
        adContainer.querySelector('video').style.height = h;
        adContainer.lastElementChild.style.width = w;
        adContainer.lastElementChild.style.height = h;
        adContainer.querySelector('iframe').setAttribute('width',w);
        adContainer.querySelector('iframe').setAttribute('height',h);

    }else {
        w = parseInt(adopWidth);
        h = parseInt(adopHeight);

        target.setAttribute('style','transition:height 1s ease-out; height:'+adopHeight+'px; overflow:hidden;');
        target.childNodes[0].style.width = w + "px";
        target.getElementsByTagName('ins')[0].querySelector('div').setAttribute('style','width:'+w+'px;height:'+parseInt(adopHeight)+'px');

        if(if_doc.getElementById('adBox')!=null){
            if_doc.getElementById('adBox').setAttribute('style','width:'+w+'px;height:'+h+'px');
        }
        if_doc.getElementById('adop-video-total').setAttribute('style','width:'+w+'px;height:'+(h-22)+'px;');

        adContainer.querySelector('div').style.width = w;
        adContainer.querySelector('div').style.height = (h+30);
        adContainer.querySelector('video').style.width = w;
        adContainer.querySelector('video').style.height = w*0.5625;
        adContainer.lastElementChild.style.width = w;
        adContainer.lastElementChild.style.height = h;
        adContainer.querySelector('iframe').setAttribute('width',w);
        adContainer.querySelector('iframe').setAttribute('height', w*0.5625);
    }
}

let transform_location = function(sp){
    //패스백 안했을 때
    if(!adopPassbackFl){
        //스크롤이 조건보다 아래로 올 경우
        if(sp > absoluteTop + parseInt(adopHeight)){
            if(!moved){
                moved = true;
                adop_transform(false);
            }
        }
        if(moved){
            if (sp < absoluteTop){
                moved = false;
                adop_transform(true);
            }
        }
    }
}

var noAds = function(){
    target.style.height = "0px";
}

window.addEventListener('scroll', function(e) {
    last_known_scroll_position =  window.scrollY || document.documentElement.scrollTop;
    if(typeof adopCl != "undefined" && adopCl == 'Y'){
        if (!ticking) {
            window.requestAnimationFrame(function() {
                colleapse(last_known_scroll_position);
                ticking = false;
            });
            ticking = true;
        }
    }

    if(typeof adopFl != "undefined" && adopFl == "Y" && avaec){
        transform_location(last_known_scroll_position);
    }
});
// colleapse 기능을 사용 안하는 경우 광고 호출
if(typeof adopCl != "undefined" && adopCl != 'Y'){
    target.style.height = adopHeight+"px";
    if(!makeAds){
        makeAds = true;
        getAds();
    }
}