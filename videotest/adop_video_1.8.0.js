const videoEl = document.getElementById('adop-video-ads');
const adop_loc = videoEl.getAttribute('loc');
const adop_pb= videoEl.getAttribute('passback');
const adop_ratio = videoEl.getAttribute('ratio');
const adop_passbackauto = videoEl.getAttribute('passback_auto');
let adop_width = videoEl.getAttribute('width');
let adop_height = videoEl.getAttribute('height');
let adop_tag = videoEl.getAttribute('tag');

//size 1x1은 400 225 로 변경
if(adop_width == '1') {adop_width = '400'; }
if(adop_height == '1') {adop_height = '225'; }
//비디오 비율에 맞게 height 변경
if (adop_ratio=='y'){ adop_height =  parseInt(adop_width) * 0.5625; }
const adop_cover_height = parseInt(adop_height) + 60;
let body = top.document.body || window.parent.document.body;

if(adop_loc == 'adop-in-read'){
    if(document.getElementById('adBox') == null){
        body = document.body;
    }else {
        body = document.getElementById('adBox');
    }
}

let adop_link = document.createElement('link');
adop_link.rel = "stylesheet";
adop_link.href = "//dezf3o8j9jdt6.cloudfront.net/videoads/css/ads_1.0.3.css";
body.appendChild(adop_link);

if(adop_tag.indexOf("adop_dynamic")>-1){
    adop_tag = adop_tag.replace("adop_dynamic",encodeURIComponent(document.location.href));
}

let adop_video_container = document.createElement('div');
adop_video_container.id = "adop-video-container";
adop_video_container.setAttribute("class",adop_loc);
adop_video_container.setAttribute("tag",adop_tag);
adop_video_container.setAttribute("passback",adop_pb);
if(adop_passbackauto == 'n' || adop_passbackauto == 'N'){
    adop_video_container.setAttribute("passback_auto",'n');
}
adop_video_container.setAttribute("style","display: none; z-index: 2147483647;");
if(adop_loc == 'adop-in-read'){
    adop_video_container.setAttribute("style","display: none; z-index: 2147483647; position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)");
}

let adop_video_total = document.createElement('div');
adop_video_total.id = "adop-video-total";
adop_video_total.setAttribute("style","width:"+adop_width+"px; height:"+adop_cover_height+"px");

adop_video_container.appendChild(adop_video_total);

let adop_video_content = document.createElement('div');
adop_video_content.id = "adop-video-content";

let adop_videoClose = document.createElement('div');
adop_videoClose.setAttribute("class","adop-videoClose");
adop_video_content.appendChild(adop_videoClose);

let adop_videClosea = document.createElement('a');
adop_videClosea.href = "javascript:adop_video_close2();";
adop_videClosea.appendChild(document.createTextNode("x"));
adop_videoClose.appendChild(adop_videClosea);

let adop_home_link = document.createElement('a');
adop_home_link.href = "//adop.cc";
adop_home_link.setAttribute("class", "adopLink");
adop_home_link.target = "_blank";
adop_home_link.appendChild(document.createTextNode("by.ADOP"));
adop_video_content.appendChild(adop_home_link);

let adop_v = document.createElement('video');
adop_v.id = "adop-video";
adop_v.setAttribute("muted","");
adop_v.setAttribute("playsinline","");
adop_v.setAttribute("style",'display: none; top: 30px; width: '+adop_width+'px;height: '+adop_height+'px');
adop_v.setAttribute("video_height", adop_height);
adop_v.setAttribute("video_width", adop_width);
adop_v.src = "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAC721kYXQhEAUgpBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcCEQBSCkG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAsJtb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAALwABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAB7HRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAIAAAAAAAAALwAAAAAAAAAAAAAAAQEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAC8AAAAAAAEAAAAAAWRtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAAKxEAAAIAFXEAAAAAAAtaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAFNvdW5kSGFuZGxlcgAAAAEPbWluZgAAABBzbWhkAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAADTc3RibAAAAGdzdHNkAAAAAAAAAAEAAABXbXA0YQAAAAAAAAABAAAAAAAAAAAAAgAQAAAAAKxEAAAAAAAzZXNkcwAAAAADgICAIgACAASAgIAUQBUAAAAAAfQAAAHz+QWAgIACEhAGgICAAQIAAAAYc3R0cwAAAAAAAAABAAAAAgAABAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAIAAAABAAAAHHN0c3oAAAAAAAAAAAAAAAIAAAFzAAABdAAAABRzdGNvAAAAAAAAAAEAAAAsAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ni40MC4xMDE=";
adop_video_content.appendChild(adop_v);

adop_video_total.appendChild(adop_video_content);

let adop_adContainer = document.createElement('div');
adop_adContainer.id = "adop-adContainer";
adop_adContainer.setAttribute("style","top: 30px;");
adop_video_total.appendChild(adop_adContainer);

body.appendChild(adop_video_container);

let adop_ima_sdk = document.createElement('script');
adop_ima_sdk.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js";
adop_ima_sdk.addEventListener('load', adopPostLoadFunction);
body.appendChild(adop_ima_sdk);

function adopPostLoadFunction(){
    let adop_ads_js = document.createElement('script');
    adop_ads_js.id = "adop-video-ads-js";
    adop_ads_js.type = "text/javascript";
    //adop_ads_js.src = "//dezf3o8j9jdt6.cloudfront.net/videoads/js/ads_1.4.4.js";
    adop_ads_js.src = "//compasscdn.adop.cc/js/ads_1.4.4.min.js";
    adop_ads_js.height = adop_height;
    body.appendChild(adop_ads_js);
}
