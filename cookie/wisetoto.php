<?php
?>

<html>
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
    <script src='https://compasscdn.adop.cc/js/ifrgpt004.min.js'></script>
</head>

<body>
<div style="width:100%; height:100%" id="ad"></div>
</body>
<script>
    $(document).ready(function(){
        $.ajax({
            //url: '/wisetoto/ajax4.php',
            url: 'ajax4.php',
            type: 'GET',
            dataType: 'html',
            async: true,
            success: function (result) {
                document.getElementById('ad').innerHTML=result;
                run_displayad();
            }
        });
    });


    function run_displayad(){
        var head01 = document.getElementsByTagName("head");
        var obj = document.getElementsByClassName("adop_ads");
        var script= document.createElement('script');
        var gpt_script = document.createElement('script');
        gpt_script.type = "text/javascript";
        gpt_script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
        head01[0].appendChild(gpt_script);
        script.type= 'text/javascript';
        script.src= 'admanager.js';
        obj[0].appendChild(script);
    }
    function ad_request() {

        var adpIns = document.getElementsByClassName("adop_ads");
        console.log(adpIns);
        for (var j = 0; j < adpIns.length; j++) {
            var ranNum = Math.floor(Math.random()*(999999-100000+1)) + 100000;

            var adop_ad =
                '<scr'+'ipt type="text/javascript">\n' +
                '    /* 환경설정 */\n' +
                '    var googleDirect01 = true;\n' +
                '    var adop_tag102    = adop_tag102 || {};\n' +
                '    var gbannerid = "div-apt-'+ranNum+'";\n' +
                '\n' +
                '    adop_tag102[gbannerid] = adop_tag102[gbannerid]||{};\n' +
                '    adop_tag102[gbannerid].googleSlotCode  = "/5932629/ca-pub-1474238860523410-tag/wisetoto_m_m_320x100-gameinfo-1-GPT";\n' +
                '    adop_tag102[gbannerid].googleSlotSize  = [320, 100];\n' +
                '    adop_tag102[gbannerid].compassPageUrl  = "wisetoto.com";\n' +
                '    adop_tag102[gbannerid].compassZoneId   = "7d89923e-c7c4-480a-b057-4f559d3f36e7";\n' +
                '    adop_tag102[gbannerid].compassAdwidth  = "320";\n' +
                '    adop_tag102[gbannerid].compassAdheight = "100";\n' +
                '\n' +
                '    var googletag = googletag || {};\n' +
                '    googletag.cmd = googletag.cmd || [];\n' +
                '\n' +
                '    if(googleDirect01){\n' +
                '        googleSetting01("div-apt-'+ranNum+'");\n' +
                '    }\n' +
                '    else{\n' +
                '        setTimeout(function(){compassAdTagInsert("div-apt-'+ranNum+'");},100);\n' +
                '    }\n' +
                '</scr'+'ipt>' +
                '<div style="width:320px; height:100px;" id="div-apt-'+ranNum+'">\n' +
                '    <scr'+'ipt type="text/javascript">\n' +
                '        googletag.cmd.push(function() { googletag.display("div-apt-'+ranNum+'"); });\n' +
                '    </scr'+'ipt>\n'+
                '</div>';

            adpIns[j].append($(adop_ad)[0]);
            adpIns[j].append($(adop_ad)[1]);
        }

    }
    function goscript(){
        alert(123);
    }
</script>
<button onclick="run_displayad();">눌러라눌러!!!</button>
</html>


