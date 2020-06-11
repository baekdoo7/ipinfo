<?php
?>

<html>
<head>
    <script type="application/javascript">
        var _frequency_day_limit_count = 3 ;
        var _frequency_minute          = 1 ;

        var _setCookie = function(name, value, time ,mode) { //mode 1 인경우 하루 2 인경우 분 나머지는 그냥 초
            if(mode == 1){
                var date = new Date();
                date.setTime(date.getTime() + time * 60 * 60 * 24 * 1000);
            }
            else if(mode == 2){
                var date = new Date();
                date.setTime(date.getTime() + time * 60 * 1000);
            }
            else{
                var date = new Date(parseInt(time));
            }
            document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
        };
        var _getCookie = function(name) {
            var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value? value[2] : null;
        };
        var _deleteCookie = function(name) {
            var date = new Date();
            document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
        }
        var _canItImp = function(){
            var dayCnt    = _getCookie("_dayCnt");
            var isExcuted = _getCookie("_isDone");

            if( isExcuted == null){ //분단위 프리퀀시 통과
                if(dayCnt == null){ //하루 프리퀀시 제한폭이 없음
                    var date = new Date();
                    date.setTime(date.getTime() + 1 * 60 * 60 * 24 * 1000);
                    var secs = date.getTime();
                    _setCookie('_dayCnt','1_'+secs,secs,3);
                    _setCookie('_isDone','Y',_frequency_minute,2);
                    return true;
                }
                else{
                    var dayCntArray = dayCnt.split('_');
                    if(parseInt(dayCntArray[0]) <= _frequency_day_limit_count){
                        dayCntArray[0] = parseInt(dayCntArray[0]) + 1;
                        _setCookie('_dayCnt',dayCntArray[0] + '_'+ dayCntArray[1],dayCntArray[1],3);
                        _setCookie('_isDone','Y',_frequency_minute,2);
                        return  true;
                    }
                    else{
                        return false;
                    }
                    return  true;
                }
            }
            else{
                    return  false;
            }
        }
        console.log(_canItImp());

    </script>
</head>
<body>
게임,여행,공부,영어,옷,자동차
<!--
<script src='https://compass.adop.cc/assets/js/adop/adopJ.js?v=14' ></script><ins class='adsbyadop' _adop_zon = 'fb5c3880-33d4-4cd0-bef6-dc852f4c8803' _adop_type = 're' style='display:inline-block;width:1px;height:1px;' _page_url=''></ins>
-->

<div id="bIfr100"></div>
<script type="application/javascript">
    var goAD01      = function() {
        alert(123);
        return;
        var head    = document.getElementById('bIfr100');
        var script  = document.createElement('script');
        script.type = 'text/javascript';
        script.id   = 'adop-video-ads';
        script.src  = 'https://dezf3o8j9jdt6.cloudfront.net/videoads/js/adop_video_1.9.5.min.js';
        script.setAttribute('tag','https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-1474238860523410&slotname=test_dcinside_v_sr_frequency&ad_type=video&description_url=http://www.dcinside.com&max_ad_duration=30000&videoad_start_delay=0&vpmute=0&vpa=0');
        script.setAttribute('is_customvd','n');
        script.setAttribute('customvd','');
        script.setAttribute('loc','adop-rb');
        script.setAttribute('width','1');
        script.setAttribute('height','1');
        script.setAttribute('bg','Y');
        script.setAttribute('ratio','y');
        script.setAttribute('passback','https://compass.adop.cc/RD/5312db4b-4ec1-433c-86a7-bea0609d299e');
        head.appendChild(script);
    }
    if(navigator.userAgent.indexOf('Whale') >= 0){
        console.log('whale');
    }else{
        goAD01();
    }
</script>


<script>
    // _setCookie("test", "test1234", 1);
    // alert(_getCookie("test"));
    // _deleteCookie("test");
    // alert(_getCookie("test"));

</script>
<!--<script id="adop-video-ads" src="https://dezf3o8j9jdt6.cloudfront.net/videoads/js/adop_video_1.9.5.min.js" tag="https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-1474238860523410&slotname=dcinside_video_400x225_test&ad_type=video&description_url=http://www.mt.co.kr/&max_ad_duration=30000&videoad_start_delay=0&vpmute=0&vpa=0" is_customvd="n" customvd="" loc="adop-rb" width="1" height="1" ratio="y" passback="" bg="Y"></script>-->

</body>
</html>

