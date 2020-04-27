var url_string = window.top.location.href;

var sheet = document.createElement("style");
var sheet_str = "#m_footer_banner{z-index:99999;}";
var head = document.head || document.getElementsByTagName("head")[0];
sheet.type = "text/css";

if (sheet.styleSheet) sheet.styleSheet.cssText = sheet_str;
else sheet.appendChild(document.createTextNode(sheet_str));

head.appendChild(sheet);

var script = document.createElement("script");
script.src = "//test.thenextpaper.com/tdn-loader/dist/tdn.js";
// script.src = "//ads.tapzin.com/test/tdn.js";
script.async = true;
script.onload = function() {
    var tdn_config = {
        siteName: "cosmopolitan",
        adUnitPath: "/21682743634/da_medialink_cosmopolitan",
        adList: [
            {
                width: 1,
                height: 1,
                display_name: "interstitial",
                adType: "interstitial"
            }
        ],
        isSPA: true
    };

    if (url_string === "https://www.cosmopolitan.co.kr/article/34098") {
        tdn_config = {
            siteName: "cosmopolitan",
            adUnitPath: "/21682743634/da_medialink_cosmopolitan",
            adList: [
                {
                    width: 1,
                    height: 1,
                    display_name: "interstitial",
                    adType: "interstitial",
                    adUnitPath: "/21682743634/tapzin-test2"
                }
            ],
            isSPA: true
        };

        console.log("test_page");
    }
    TDN_AD.init(tdn_config);
    console.log("tdn_init");

    var googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];
    window.video_ads = window.video_ads || [];

    googletag.cmd.push(function() {
        googletag.pubads().addEventListener("slotRenderEnded", function(event) {
            if (
                event.slot.getSlotElementId().indexOf("tdn-mobile-cosmopolitan-top") !==
                -1
            ) {

                if (event.isEmpty) {

                    if (window.frameElement) {
                        window.frameElement.style.display = "none";
                    }
                } else {
                    var tdn_inter_div = document.createElement("div");
                    tdn_inter_div.id = "tdn-cosmopolitan-interstitial";
                    document.body.appendChild(tdn_inter_div);

                    TDN_AD.display("tdn-cosmopolitan-interstitial");
                    if (window.frameElement) {
                        window.frameElement.style.display = "inline";
                    }
                    window.video_ads.push({
                        qqid: event.slot.getEscapedQemQueryId(),
                        campaignId: event.campaignId,
                        lineItemId: event.lineItemId,
                        adUnitPath: event.slot.getAdUnitPath(),
                        creativeId: event.creativeId
                        // isIframe: true
                    });
                    window.dispatchEvent(new Event("tdnVideoRenderEnded"));
                    var div = document.querySelector("#" + event.slot.getSlotElementId());

                    if (div) {
                        div.style.height = "auto";
                    }

                    var iframe = document.querySelector(
                        "#" + event.slot.getSlotElementId() + " iframe"
                    );
                    if (iframe) {
                        iframe.style.width = "100%";
                        iframe.style.maxWidth = "700px";
                        if (
                            navigator.userAgent.match(
                                /Mobile|iP(hone)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
                            )
                        ) {
                            if (window.frameElement) window.document.body.style.margin = "0";
                        } else {
                        }
                    }
                }
            } else if (event.slot.getSlotElementId().indexOf("passback") !== -1) {
                if (event.isEmpty) {
                    window.frameElement.style.display = "none";
                }
            }
        });
    });

    // if (
    //   navigator.userAgent.match(
    //     /Mobile|iP(hone)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
    //   ) &&
    //   window.location.href === "https://www.cosmopolitan.co.kr/"
    // ) {
    //   initTdnAd();
    // }
};
document.getElementsByTagName("head")[0].appendChild(script);

function initTdnAd() {
    var randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);

    var API_URL = "https://api.thenextpaper.com/ads/v1/";
    var adInfo = {
        qqid: "cosmo-" + new Date().getTime() + "-" + randomArray[0],
        campaignId: 20190906,
        lineItemId: 20190906,
        adUnitPath: "/21682743634/da_medialink_cosmopolitan/native",
        creativeId: 20190906
    };

    requestAdId(adInfo)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (result.success === true && typeof result.token != null) {
                setTimeout(function() {
                    window.tdn_token = result.token;

                    var tdn_native_root_selector = "body";
                    var tdn_native_selector = ".articlebox";
                    var tdn_native_minimum = 1;

                    var tdn_native_div = document.createElement("div");
                    tdn_native_div.className = "articlebox";
                    tdn_native_div.innerHTML = `<div class="imgbox Thumb_mobile" style='background-image: url("http://cdn.thenextpaper.com/201909/puma/puma_01.jpg");' > <a href="${getLandingURL(
                        window.tdn_token,
                        "http://ads.tapzin.com/short/puma"
                    )}" target="_blank" ><img alt="" class="g-img" src="./assets/assets_magazine/images/m_default_thumb.gif"/></a> </div><div class="textbox"> <span class="menu"><a>Beauty</a></span ><em class="title"><a>PUMA, 편안하고 트렌디한 '쉐르파' 라인론칭</a></em> <p class="excerpt"> 편안한 무드 속 트렌디한 스타일 제안 </p></div>`;

                    var root_matches = document.querySelectorAll(
                        tdn_native_root_selector
                    );

                    if (root_matches.length > 0) {
                        var matches = root_matches[
                        root_matches.length - 1
                            ].querySelectorAll(tdn_native_selector);

                        if (matches.length > tdn_native_minimum) {
                            matches[tdn_native_minimum - 1].parentNode.insertBefore(
                                tdn_native_div,
                                matches[tdn_native_minimum - 1].nextElementSibling
                            );
                        } else {
                            matches[matches.length - 1].parentNode.insertBefore(
                                tdn_native_div,
                                matches[matches.length - 1].nextElementSibling
                            );
                        }
                    }
                }, 1000);

                return requestAdEvent(result.token, "impression");
            } else {
                console.error("error");
                throw new Error();
            }
        })
        .then(function(response) {
            //   console.log("succ");
        })
        .catch(function(err) {
            //   console.log(err);
        });

    function requestAdId(info) {
        const url = API_URL + "request";

        return fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ad_type: "custom",
                qqid: info.qqid,
                ad_order_id: info.campaignId,
                ad_lineitem_id: info.lineItemId,
                ad_adunit_path: info.adUnitPath,
                ad_creative_id: info.creativeId
            })
        });
    }

    function requestAdEvent(token, event) {
        const url = API_URL;

        return fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, event })
        });
    }

    function getLandingURL(token, landing) {
        const url = API_URL + "click";

        return url + "?token=" + token + "&landing=" + landing;
    }
}

var url = location.href;
/*
 document.body.addEventListener(
   "click",
   function() {
     requestAnimationFrame(function() {
       if (url !== location.href) {
         if (
           navigator.userAgent.match(
             /Mobile|iP(hone)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
           ) &&
           window.location.href === "https://www.cosmopolitan.co.kr/"
         ) {
           initTdnAd();

         //   if (typeof tdn_postital_ad !== undefined) {
         //     tdn_postital_ad.dismissAd();
         //   }
         }
         // if (
         //   Array.isArray(window.top.tdn_Video_Array) &&
         //   window.top.tdn_Video_Array.length > 0
         // ) {
         //   window.top.tdn_Video_Array.forEach(function(video) {
         //     video.destroy();
         //   });
         //   window.top.tdn_Video_Array = [];
         // }
         // if (typeof TDN_AD !== "undefined") {
         //   TDN_AD.destroy();
         // }
       }
       url = location.href;
     });
   },
   true
 );
 */
