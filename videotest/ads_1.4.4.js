// Re-use this AdsLoader instance for the entire lifecycle of your page.
const adop_video_loc = document.getElementById('adop-video-container').getAttribute("class");
const adop_video_tag = document.getElementById('adop-video-container').getAttribute('tag');
const adop_video_pb = document.getElementById('adop-video-container').getAttribute('passback').split("/")[4];
const adop_video_passbackauto = document.getElementById('adop-video-container').getAttribute('passback_auto');
const adop_video_width = document.getElementById('adop-video').getAttribute('video_width');
const adop_video_height = document.getElementById('adop-video').getAttribute('video_height');

const videoContent = document.getElementById('adop-video');
const adContainer = document.getElementById('adop-adContainer');
const adopVideoContainer = document.getElementById('adop-video-container');

let adop_chk = false;
let adsManager;
let adop_passbackauto2 = true;


// iPhone - issue : Don't play video ads
google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
// Vpaid Support
google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE);

let adDisplayContainer =
    new google.ima.AdDisplayContainer(
        adContainer,
        videoContent);
// Must be done as the result of a user action on mobile
adDisplayContainer.initialize();
var adop_video_close2 = function () {
    if(adop_video_passbackauto == 'n' || adop_video_passbackauto == 'N' ){
        adop_passbackauto2 = false;
    }
    adop_video_close();
}
var adop_video_close = function() {
    if(adop_chk){
        return;
    }
    adop_chk = true;
    if(typeof admanager != "undefined"){
        adsManager.destroy();
    }
    adopVideoContainer.style.display = 'none';
    if(typeof adop_video_pb!="undefined" && adop_passbackauto2){
        //패스백처리
        let pbDiv = document.createElement('div');
        let pbIfr         = document.createElement('iframe');
        let strIframeId   = "adopB" + Math.floor(Math.random()*10000) + 1;
        pbIfr.id      = strIframeId;
        pbIfr.setAttribute("frameborder",0);
        pbIfr.setAttribute("marginwidth", 0);
        pbIfr.setAttribute("marginheight",0);
        pbIfr.setAttribute("paddingwidth", 0);
        pbIfr.setAttribute("paddingheight", 0);
        pbIfr.setAttribute("scrolling","no");


        pbDiv.setAttribute("style","height:1px; width:1px;");
        pbIfr.setAttribute("style","width:1px;height:1px;");

        if(adop_video_loc == 'adop-in-read'){
            pbDiv.setAttribute("style","height:100%; width:100%;");
            pbIfr.setAttribute("style","width:100%;height:100%;");
        }

        let strScriptLink = "<scr"+"ipt src='//compass.adop.cc/RE/"+adop_video_pb+"'><\/scr"+"ipt>";

        //아이프레임 생성
        pbDiv.appendChild(pbIfr);
        if(adop_video_loc == 'adop-in-read'){
            if(document.getElementById('adBox')==null){
                document.body.appendChild(pbDiv);
            }else {
                document.getElementById("adBox").appendChild(pbDiv);
            }
        }else {
            document.body.appendChild(pbDiv);
        }

        //아이프레임 Context 찾기
        let passbackIframe    = document.getElementById(strIframeId);
        let passbackIframeDoc = passbackIframe.contentDocument || passbackIframe.contentWindow.document;

        //찾았으면 패스백 광고노출
        if(passbackIframeDoc != null){
            passbackIframeDoc.open();
            passbackIframeDoc.write(strScriptLink);
            passbackIframeDoc.close();
        }
        if(typeof top.adopPassbackFl != "undefined" && !top.adopPassbackFl){
            top.adopPassbackFl = true;
            top.adop_transform(true);
        }

    } else {
        window.top.postMessage('adop_noad','*');
    }
}

let onAdError = function (adErrorEvent) {
    // Handle the error logging and destroy the AdsManager
    console.log(adErrorEvent.getError());
    adop_video_close();
}
let onAdLoaded = function(){
    adsManager.setVolume(0);
    if(typeof top.avaec != "undefined" && !top.avaec){
        top.avaec = true;
    }
}
let onAdStarted = function(){
    adsManager.setVolume(0);
}
let onAdsSkipped = function() {
    adsManager.stop();
    if(adop_video_passbackauto == 'n' || adop_video_passbackauto == 'N' ){
        adop_passbackauto2 = false;
    }

    adop_video_close();
}
// An event listener to tell the SDK that our content video
// is completed so the SDK can play any post-roll ads.
let contentEndedListener = function() {
    adsLoader.contentComplete();
}
let onContentPauseRequested = function() {
    // This function is where you should setup UI for showing ads (e.g.
    // display ad timer countdown, disable seeking, etc.)
    videoContent.removeEventListener('ended', contentEndedListener);
    videoContent.pause();
}
let onContentResumeRequested = function() {
    // This function is where you should ensure that your UI is ready
    // to play content.
    videoContent.addEventListener('ended', contentEndedListener);
    if(adop_video_passbackauto == 'n' || adop_video_passbackauto == 'N' ){
        adop_passbackauto2 = false;
    }

    adop_video_close();
}

let onAdsManagerLoaded = function (adsManagerLoadedEvent) {
    // Get the ads manager.
    adsManager = adsManagerLoadedEvent.getAdsManager(videoContent);
    // See API reference for contentPlayback
    // Add listeners to the required events.
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, onAdsSkipped);
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,onAdLoaded);
    adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,onAdStarted);

    try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(adop_video_width, adop_video_height, google.ima.ViewMode.NORMAL);
        // Call start to show ads. Single video and overlay ads will
        // start at this time; this call will be ignored for ad rules, as ad rules
        // ads start when the adsManager is initialized.
        adopVideoContainer.style.display = '';
        adsManager.setVolume(0);
        adsManager.start();
        adsManager.setVolume(0);
        // $('#atop-video-total').css('height', '0');
        // $('#atop-video-total').animate({'height':'250px'}, 1000,function () {
        //     adsManager.resume();
        // });
    } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        // Play content here, because we won't be getting an ad.
        adop_video_close();
    }
}

let adsLoader = new google.ima.AdsLoader(adDisplayContainer);

// Add event listeners
adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);

videoContent.onended = contentEndedListener

// Request video ads.
let adsRequest = new google.ima.AdsRequest();
adsRequest.adTagUrl = adop_video_tag;

// Specify the linear and nonlinear slot sizes. This helps the SDK to
// select the correct creative if multiple are returned.
adsRequest.linearAdSlotWidth = adop_video_width;
adsRequest.linearAdSlotHeight = adop_video_height;
adsLoader.requestAds(adsRequest);

videoContent.onended = function (ev) {
    adopVideoContainer.style.display = 'none';
}