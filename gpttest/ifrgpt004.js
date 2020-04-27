function makeid()
{
    var text = "div-apt-ad-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function changeid() {
    document.currentScript.parentElement.id = gbannerid;
}
function googleSetting01(gbannerid){
    googletag.cmd.push(function() {
        //var adSlot1 = googletag.defineSlot('',[300, 250], gbannerid);
        //var adSlot1 = googletag.defineSlot('/5932629/ca-pub-1474238860523410-tag/ciz_busan_rb_300x250-200121',[300, 250], gbannerid);
        var adSlot1 = googletag.defineSlot(adop_tag102[gbannerid].googleSlotCode,adop_tag102[gbannerid].googleSlotSize, gbannerid);
        adSlot1.addService(googletag.pubads());
        googletag.pubads().set("page_url", adop_tag102[gbannerid].compassPageUrl);
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if(event.isEmpty){
                console.log('no slot ad!');
            }
        });
        googletag.enableServices();
    });
}
function compassAdTagInsert(gbannerid){
    $obj = document.getElementById(gbannerid);
    if($obj){
        $script = document.createElement("script");
        $script.src = "https://compass.adop.cc/assets/js/adop/adopJ.js?v=14";

        $ins = document.createElement("ins");
        $ins.setAttribute("class","adsbyadop");
        $ins.setAttribute("_adop_zon",adop_tag102[gbannerid].compassZoneId);
        $ins.setAttribute("_adop_type","re");
        $ins.setAttribute("style","display;inline-block;width:"+adop_tag102[gbannerid].compassAdwidth+"px;height:"+adop_tag102[gbannerid].compassAdheight+"px;");
        $ins.setAttribute("_page_url","");

        $obj.appendChild($ins);
        $obj.appendChild($script);
    }
}
