//javascript for chosun.com article page 20180402

//sns share functions
function _getArticleID() {
    var artid = "";
    var tmp_host = location.hostname;
    try {
        tmp_host = tmp_host.substring(0, tmp_host.indexOf(".chosun.com"));
        if (typeof (ArtID) != "undefined") artid = ArtID;
        if (artid == "") {
            var tmp_path = location.pathname;
            if (tmp_path.indexOf(".html") != -1)
                artid = tmp_path.substring(tmp_path.lastIndexOf("/") + 1, tmp_path.indexOf(".html"));
        }
        if (artid != "" && tmp_host != "") artid = (tmp_host != "news" ? tmp_host + "*" : "") + artid;
    } catch (e) {
    }
    return artid;
}

function _getArticleLink() {
    var link = location.protocol + "//" + location.hostname + "" + (location.port != "" ? ":" + location.port : "") + location.pathname;
    return link;
}

//popup window!
function j_pop_op(which1) {
    document.getElementById('j_popup' + which1).style.display = "block";
    document.getElementById('author_arrow' + which1).src = "http://image.chosun.com/cs/article/2011/title_author_arrow_down.gif";
}

function j_pop_cl(which1) {
    document.getElementById('j_popup' + which1).style.display = "none";
    document.getElementById('author_arrow' + which1).src = "http://image.chosun.com/cs/article/2011/title_author_arrow_up.gif";
}

//facebook
function facebookOpen() {
    var titl = encodeURIComponent(_getArticleTitle());
    var link = encodeURIComponent(_getArticleLink() + "?outlink=facebook");
    var url = "http://www.facebook.com/sharer.php?u=" + link + "&t=" + titl;
    windowOpen(url, 900, 450, 'no');
    _getHitlogLinkNew("FB");
    _getHitlogLink("sec_00010");
}

//twitter
function twitterOpen() {
    var titl = _getArticleTitle();
    titl = titl.replace(/'/gi, "쨈");
    titl = titl.replace(/"/gi, "�");
    titl = encodeURIComponent(titl);

    var link = encodeURIComponent(_getArticleLink() + "?outlink=twitter");
    var id = _getArticleID();
    if (id != "") link = encodeURIComponent("http://chosun.com/tw/?id=" + id);

    var url = "http://twitter.com/share?text=" + titl + "&url=" + link;
    windowOpen(url, 800, 400, 'yes');
    _getHitlogLinkNew("TW");
    _getHitlogLink("sec_00011");
}

//google plus
function googleplusOpen() {
    var titl = encodeURIComponent(_getArticleTitle());
    var link = encodeURIComponent(_getArticleLink() + "?outlink=googleplus");
    var url = "https://plus.google.com/share?url=" + link;
    windowOpen(url, 500, 500, 'no');
    _getHitlogLinkNew("GP");
    _getHitlogLink("sec_00015");
}

//kakao story
function kakaostoryOpen() {
    var titl = encodeURIComponent(_getArticleTitle());
    var link = encodeURIComponent(_getArticleLink() + "?outlink=kakaostory");
    var url = "https://story.kakao.com/share?url=" + link;
    windowOpen(url, 900, 450, 'no');
    _getHitlogLinkNew("KAS");
    //_getHitlogLink("sec_00010");
}

//twitter
function nblogOpen() {
    var link = encodeURIComponent(_getArticleLink() + "?outlink=nblog");
    var id = _getArticleID();

    var url = "http://blog.naver.com/openapi/share?url=" + link;
    windowOpen(url, 800, 400, 'yes');
}


//common function
function setCookie(name, value, expirehours) {
    var todayDate = new Date();
    todayDate.setHours(todayDate.getHours() + expirehours);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
};
cookiedata = document.cookie;

function getDzCookies(name) {
    var cookies = document.cookie;
    var value = "";
    if (cookies.indexOf(name) != -1) {
        var start = cookies.indexOf(name) + name.length + 1;
        var end = cookies.indexOf(";", start);

        if (end == -1) end = cookies.length;

        value = cookies.substring(start, end);
        value = unescape(value);
    }
    return value;
}

function setDzCookies() {
    var name;
    var value;
    var expire;
    var path;
    var domain;
    name = arguments[0];
    value = arguments[1];
    if (arguments.length > 2) path = arguments[2];
    if (arguments.length > 3) domain = arguments[3];
    if (arguments.length > 4) expire = arguments[4];

    document.cookie = name + "=" + escape(value)
        + ((expire) ? "; expires=" + expire : "")
        + ((path) ? "; path=" + path : "")
        + ((domain) ? "; domain=" + domain : "")
}

function checkLogin() {
    if (!getDzCookies('SMSESSION') || getDzCookies('SMSESSION') == "LOGGEDOFF" || !getDzCookies('SM_USER') || !getDzCookies('dz_info')) {
        return false;
    } else {
        return true;
    }
}

function windowOpen() {
    var nUrl;
    var nWidth;
    var nHeight;
    var nLeft;
    var nTop;
    var nScroll;
    nUrl = arguments[0];
    nWidth = arguments[1];
    nHeight = arguments[2];
    nScroll = (arguments.length > 3 ? arguments[3] : "no");
    nLeft = (arguments.length > 4 ? arguments[4] : (screen.width / 2 - nWidth / 2));
    nTop = (arguments.length > 5 ? arguments[5] : (screen.height / 2 - nHeight / 2));

    winopen = window.open(nUrl, 'pbml_win', "left=" + nLeft + ",top=" + nTop + ",width=" + nWidth + ",height=" + nHeight + ",scrollbars=" + nScroll + ",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no");
}

function _getArticleTitle() {
    var metas = document.getElementsByTagName("META");
    var titl = "";
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].name && metas[i].name == "twitter:title") {
            titl = metas[i].content;
            break;
        }
    }
    if (titl == "") titl = document.title;

    return titl;
}


//article print
function printOpen() {
    window.print();
}

//article email
function mailOpen() {
    if (checkLogin() == false) {
        alert('湲곗궗 �대찓�쇰낫�닿린 湲곕뒫�� 濡쒓렇�� �� �ъ슜�섏떎 �� �덉뒿�덈떎.');
        location.href = "https://membership.chosun.com/login/protect_sso/sso_user_info.jsp?returl=" + escape(location.href);
        return false;
    }
    windowOpen("/svc/news/sendContentNews.html", 540, 580);
}

//article scrap
function showNewsScrap() {
    if (checkLogin() == false) {
        alert('湲곗궗�ㅽ겕�� 湲곕뒫�� 濡쒓렇�� �� �ъ슜�섏떎 �� �덉뒿�덈떎.');
        location.href = "http://membership.chosun.com/login/protect_sso/sso_user_info.jsp?returl=" + escape(location.href);
        return;
    }
    ;

    var url = location.href;
    var sec = url.substring(7, url.indexOf(".chosun.com"));

    windowOpen("http://myhome.chosun.com/scrap/folder.php?act=1&url=" + url + "&sec=" + sec + "&usr_id=" + getDzCookies('SM_USER'), 440, 430, 'yes');
}


//jquery doc.ready fucntions start
$(document).ready(function () {
//notice message area
    var underNotice = $("#under_notice");

//article title tools
    var titTools = $("#news_title_tools_id"),
        titVoice = '<li><a href="javascript:playVoice();" class="voice" id="voice_trig_id">�뚯꽦�쇰줈 �쎄린</a></li>',
        titCons = '<li><a href="javascript:showNewsScrap();" onclick="ga(\'send\', \'event\', \'Article\', \'ArtFuction\', \'Art_Scrap\');" class="scrap">湲곗궗 �ㅽ겕��</a></li> <li><a href="javascript:mailOpen()" onclick="ga(\'send\', \'event\', \'Article\', \'ArtFuction\', \'Art_Email\');" class="email">�대찓�쇰줈 湲곗궗怨듭쑀</a></li> <li><a href="javascript:printOpen();" onclick="ga(\'send\', \'event\', \'Article\', \'ArtFuction\', \'Art_Print\');" class="print">湲곗궗 �몄뇙</a></li> <li class="font_set_layer"><a href="#" class="font int_trig" id="font" onclick="ga(\'send\', \'event\', \'Article\', \'ArtFuction\', \'Art_Font\');">湲�瑗� �ㅼ젙</a> <div class="font_set_box int_target"> <div class="font_set" id="font_set_id"> <dl class="font_set_size"> <dt>�ш린</dt> <dd> <a href="#" class="fz_small" id="fz_small_id" title="�묎쾶">媛�</a> <a href="#" class="fz_middle" id="fz_middle_id" title="以묎컙">媛�</a> <a href="#" class="fz_big" id="fz_big_id" title="�쎄컙 �ш쾶">媛�</a> <a href="#" class="fz_big2" id="fz_big2_id" title="�ш쾶">媛�</a> <a href="#" class="fz_big3" id="fz_big3_id" title="留ㅼ슦 �ш쾶">媛�</a> </dd> </dl> <dl class="font_set_family"> <dt>湲�瑗�</dt> <dd> <a href="#" class="ff_dotum" id="ff_dotum_id">�뗭�</a> <a href="#" class="ff_malgun" id="ff_malgun_id">留묒�怨좊뵓</a> </dd> </dl> </div> <!-- font_set --> </div> </li>';

    if (typeof VoiceURL !== 'undefined' && VoiceURL.length > 3) {
        titTools.append(titVoice + titCons);
    } else {
        titTools.append(titCons);
    }


//article sns apped

//sticky aside
    $("#news_aside_id, #news_left_aside_id").stick_in_parent({
        offset_top: 60
    });

//scrollbar custom
    $("#today_live_con_id, #recent_read_con_id, .nano").scrollbar();

//slider - PAN
    $("#aside_list_thumb_slidebox_id").bxSlider({
        randomStart: true,
        pager: false,
        slideSelector: '.aside_list_thumb_sli',
        prevText: '�댁쟾',
        nextText: '�ㅼ쓬'
    });

//in page scrolling
    var scrollTrig = $(".count_cmt, .count_cmt_min, #news_go_top_id");
    scrollTrig.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 38
        }, 400, function () {
        });
    });

//article like (disabled - run with DEV)
// var artLikeBtn = $("a.count_like");
// artLikeBtn.on('click', function (e) {
//     e.preventDefault();
//     if ( artLikeBtn.hasClass('liked') ) {
//         artLikeBtn.removeClass('liked');
//         underNotice.html('<span class="under_notice_item">�� 湲곗궗�� 醫뗭븘�� �쒖떆瑜� �쒓굅�덉뒿�덈떎.</span>');
//     } else {
//         artLikeBtn.addClass('liked');
//         underNotice.html('<span class="under_notice_item">�� 湲곗궗�� 醫뗭븘�� �쒖떆瑜� �덉뒿�덈떎.</span>');
//     }
// });

//sns share more
    var leftShareBtn = $("#share_more_id"),
        leftShareMore = $("#news_left_aside_sns_more_id");
    leftShareBtn.on('click', function (e) {
        e.preventDefault();
        if (leftShareMore.hasClass('vis')) {
            leftShareMore.add(leftShareBtn).removeClass('vis');
        } else {
            leftShareMore.add(leftShareBtn).addClass('vis');
        }
    });

//font setting for news body, comment body
    var fontSetTrig = $(".font_set a")
    fontsizeTarget = $("#news_body_id, #news_comment_id"),
        trigOthersFZ = $(".font_set_size a"),
        trigOthersFF = $(".font_set_family a");

    $('a.font').on('click', function (e) {
        e.preventDefault();
    });

    fontSetTrig.on('click', function (e) {
        e.preventDefault();
        var trigClass = $(this).attr("class");

        if (trigClass.indexOf('fz') > -1) {
            //change size
            if (trigClass.indexOf('small') > -1) {
                //size small
                trigOthersFZ.removeClass('set');
                $('a.fz_small').addClass('set');
                fontsizeTarget.removeClass('fz_set_big fz_set_big2 fz_set_big3').addClass('fz_set_small');
                //underNotice.html('<span class="under_notice_item">湲�瑗� �ш린媛� \'�묎쾶\'濡� �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_size", "small", 8765); // 365days
            } else if (trigClass.indexOf('big2') > -1) {
                //site big
                trigOthersFZ.removeClass('set');
                $('a.fz_big2').addClass('set');
                fontsizeTarget.removeClass('fz_set_small fz_set_big fz_set_big3').addClass('fz_set_big2');
                //underNotice.html('<span class="under_notice_item">湲�瑗� �ш린媛� \'�ш쾶\'濡� �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_size", "big2", 8765); // 365days
            } else if (trigClass.indexOf('big3') > -1) {
                //site big
                trigOthersFZ.removeClass('set');
                $('a.fz_big3').addClass('set');
                fontsizeTarget.removeClass('fz_set_small fz_set_big fz_set_big2').addClass('fz_set_big3');
                //underNotice.html('<span class="under_notice_item">湲�瑗� �ш린媛� \'留ㅼ슦 �ш쾶\'濡� �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_size", "big3", 8765); // 365days
            } else if (trigClass.indexOf('big') > -1) {
                //site big
                trigOthersFZ.removeClass('set');
                $('a.fz_big').addClass('set');
                fontsizeTarget.removeClass('fz_set_small fz_set_big2 fz_set_big3').addClass('fz_set_big');
                //underNotice.html('<span class="under_notice_item">湲�瑗� �ш린媛� \'�쎄컙 �ш쾶\'濡� �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_size", "big", 8765); // 365days
            } else {
                //size normal
                trigOthersFZ.removeClass('set');
                $('a.fz_middle').addClass('set');
                fontsizeTarget.removeClass('fz_set_small fz_set_big fz_set_big2 fz_set_big3');
                //underNotice.html('<span class="under_notice_item">湲�瑗� �ш린媛� \'以묎컙\'�쇰줈 �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_size", "", 8765); // 365days
            }

        } else {
            //change font-family
            if (trigClass.indexOf('dotum') > -1) {
                //dotum
                trigOthersFF.removeClass('set');
                $('a.ff_dotum').addClass('set');
                fontsizeTarget.addClass('ff_set_dotum');
                underNotice.html('<span class="under_notice_item">湲�瑗댁씠 \'�뗭�\'�쇰줈 �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_family", "dotum", 8765); // 365days
            } else {
                //malgun gothic
                trigOthersFF.removeClass('set');
                $('a.ff_malgun').addClass('set');
                fontsizeTarget.removeClass('ff_set_dotum');
                underNotice.html('<span class="under_notice_item">湲�瑗댁씠 \'留묒� 怨좊뵓\'�쇰줈 �ㅼ젙�섏뿀�듬땲��.</span>');
                setCookie("cs_font_family", "", 8765); // 365days
            }
        }

    });

    if (cookiedata.indexOf("cs_font_family=dotum") > -1) {
        //console.log("�댁씠援ъ빞 �뗭��쇰줈 �ㅼ젙�덉뼱!");
        fontsizeTarget.addClass('ff_set_dotum');
        $("a.ff_dotum").addClass('set');
    } else {
        //console.log("洹몃깷 湲곕낯 �고듃�몃뜲?");
        fontsizeTarget.addClass('ff_set_malgun');
        $("a.ff_malgun").addClass('set');
    }
    ;

    if (cookiedata.indexOf("cs_font_size=small") > -1) {
        //console.log("�댁씠援ъ빞 �고듃�� small�댁빞!!");
        fontsizeTarget.addClass('fz_set_small');
        $("a.fz_small").addClass('set');
    } else if (cookiedata.indexOf("cs_font_size=big2") > -1) {
        //console.log("�댁씠援ъ빞 �고듃�� big�댁빞!!");
        fontsizeTarget.addClass('fz_set_big2');
        $("a.fz_big2").addClass('set');
    } else if (cookiedata.indexOf("cs_font_size=big3") > -1) {
        //console.log("�댁씠援ъ빞 �고듃�� big�댁빞!!");
        fontsizeTarget.addClass('fz_set_big3');
        $("a.fz_big3").addClass('set');
    } else if (cookiedata.indexOf("cs_font_size=big") > -1) {
        //console.log("�댁씠援ъ빞 �고듃�� big�댁빞!!");
        fontsizeTarget.addClass('fz_set_big');
        $("a.fz_big").addClass('set');
    } else {
        //console.log("洹몃깷 湲곕낯 �ъ씠利덉씤��?");
        fontsizeTarget.addClass('fz_set_middle');
        $("a.fz_middle").addClass('set');
    }
    ;

//open recent read
    var recentRead = $('#news_recent_read_id'),
        recentBtn = $('#news_go_recent_id, #news_recent_read_closd_id');
    recentBtn.on('click', function (e) {
        e.preventDefault();
        if (recentRead.hasClass('vis')) {
            recentRead.add(recentBtn).removeClass('vis');
        } else {
            recentRead.add(recentBtn).addClass('vis');
        }
    });

//hash box
    $("ul#hash_id").bxSlider({
        touchEnabled: false,
        infiniteLoop: true,
        randomStart: true,
        //pager: true,
        speed: 400,
        slideWidth: 280,
        slideHeight: 216,
        maxSlides: 3,
        slideMargin: 10,
        //preloadImages: 'all',
        pagerCustom: '#hash_bg_id',
    });

//aside rank tab
    var asideRankTab = $('#aside_rank_tab_id a'),
        asideRankPan = $('#aside_list_rank_pan_id > ul')
    asideRankTab.click(function (e) {
        e.preventDefault();
        asideRankTab.removeClass("current");
        $(this).addClass("current");
        asideRankPan.hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).show()
    });

// news body image zoom
    $(document).on('click', '#news_body_id .zoom_img a', function (e) {
        e.preventDefault();

        if ($(this).hasClass('zoom_clone')) {
            $(this).remove();
        } else {
            $(this).clone().appendTo($(this).parent('span')).addClass('zoom_clone');
        }
    });

// carousel and fullsize carousel start
    var extCarouselBox = $('.ext_carousel_in');
    extCarousel = extCarouselBox.children('.ext_carousel').bxSlider({
        slideSelector: '.ext_carousel > li',
        mode: 'fade',
        speed: 400,
        pager: false,
        prevText: '�댁쟾',
        nextText: '�ㅼ쓬',
        responsive: true,
//        infiniteLoop : false,

        onSliderLoad: function (currentIndex) {
            var pagerBox = this.parents('.ext_carousel_in').children('.ext_carousel_pager'),
                allSli = this.getSlideCount(),
                currentSli = currentIndex + 1;
            pagerBox.html('<span class="current">' + currentSli + '</span> / ' + allSli);
            //console.log(this.getSlideCount());
        },
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
            var pagerBox = this.parents('.ext_carousel_in').children('.ext_carousel_pager'),
                allSli = this.getSlideCount(),
                newSli = newIndex + 1;
            pagerBox.html('<span class="current">' + newSli + '</span> / ' + allSli);
            //pagerBox.html(newIndex + 1);
        }
    });

    if (!screenfull.enabled) {
        return false;
    }

    $('a.ext_carousel_full_tirg').on('click', function (e) {
        e.preventDefault();
        var parentBox = $(this).parents('.ext_carousel_in');
        if (parentBox.hasClass('fullsize')) {
            //parentBox.removeClass('fullsize');
            screenfull.exit(parentBox[0]);
        } else {
            parentBox.addClass('fullsize');
            screenfull.request(parentBox[0]);
        }
    });

    function fullscreenchange() {
        var elem = screenfull.element,
            onFullsize = screenfull.isFullscreen;
        if (onFullsize === true) {
            //console.log('���ъ씠利� 異쒕젰!');

        } else {
            //console.log('���ъ씠利� �ロ옒!!');
            var nowFullsize = $('.ext_carousel_in.fullsize');
            nowFullsize.removeClass('fullsize');
        }
    }

    screenfull.on('change', fullscreenchange);
    fullscreenchange();
// carousel and fullsize carousel end

// article voice play
    if (typeof VoiceURL !== 'undefined' && VoiceURL.length > 3) {
        //mp3 url exist
        $('body').append('<div class="cv_voice_box"> <audio controls id="cv_voice_id" preload="none"> <source type="audio/mpeg" id="cv_voice_src_id" src=' + VoiceURL + '> �� �밸툕�쇱슦���� �ㅻ뵒�� �쒓렇瑜� 吏��먰븯吏� �딆뒿�덈떎. </audio> <div id="cv_now_src"></div> </div>');

        //audio player
        var csAudio = $("#cv_voice_id"),
            csAudioSrc = $("#cv_voice_src_id"),
            csArts = $("#voice_trig_id"),
            nowSrc = $("#cv_now_src"),
            artMP3 = VoiceURL;
        var underNotice = $("#under_notice");

        $("#voice_trig_id").on('click', function (e) {
            e.preventDefault();
            console.log('湲곗궗 �뚯꽦 �ъ깮');
            if ($(this).hasClass('onplay')) {
                csAudio.get(0).pause();
                csArts.removeClass("onplay");
                underNotice.html('<span class="under_notice_item">�� 湲곗궗�� �뚯꽦 �ъ깮�� 以묒��⑸땲��.</span>');
            } else {
                $(this).addClass("onplay");
                csAudio.get(0).play();
                underNotice.html('<span class="under_notice_item">�� 湲곗궗瑜� �뚯꽦�쇰줈 �ъ깮�⑸땲��.</span>');
            }
        });


    }

});
//jquery doc.ready fucntions end


//jquery win.scroll functions start
$(window).scroll(function () {
    var newsGo = $('#news_go_id, #csh_art_min_id'),
        docScroll = $(window).scrollTop(),
        recentRead = $('#news_recent_read_id'),
        recentBtn = $('#news_go_recent_id, #news_recent_read_closd_id');
    if (docScroll >= 250) {
        newsGo.addClass('vis');
    } else {
        newsGo.removeClass('vis');
        $(recentRead, recentBtn).removeClass('vis');
    }
});
//jquery win.scroll functions end

//jquery win.load functions start
$(window).load(function () {

    //comment text count
    var cmtTextArea = $("#cmt_form_textarea_id"),
        cntTextAreaCount = $("#cmt_txt_input_count_id");
    cntTextAreaCount.html("0/500");
    cmtTextArea.on('keyup', function (event) {
        var currentString = cmtTextArea.val();
        cntTextAreaCount.html(currentString.length + "/500");
        //console.log("�쇰쭏�� �쇰굹"+ currentString.length );

        //$(".cmt_go_all").html(currentString.length);
        if (currentString.length <= 100) {  /*or whatever your number is*/
            //do some css with your div

        } else {
            //do some different stuff with your div
            //console.log("洹몃쭔!")
        }
    });

});
//jquery win.load functions end


//share url copy
$(document).ready(function () {
    var artUrl = _getArticleLink() + "";
    var urlinput = $('#art_share_url_id');
    urlinput.val(artUrl);
});
document.getElementById('share_url_id').onclick = function () {
    urlCopy(event)
};
var artUrl = _getArticleLink() + "";

function urlCopy(event) {
    event.preventDefault();
    var urlinput = document.getElementById('art_share_url_id');
    urlinput.value = artUrl;
    //console.log(Url.innerHTML)
    urlinput.select();
    document.execCommand('copy');
    alert('URL�� 蹂듭궗�섏뿀�듬땲��.');
};

document.write('<div class="fixed_ad" style="width: 120px;height: 600px; position: absolute; left: 50%; margin-left: 650px; top: 350px; top: 440px;"><script src=\'http://yellow.contentsfeed.com/RealMedia/ads/adstream_jx.ads/it.chosun.com/@Right\'></script></div>');

/* document.write('<script src=\'https://ads.tapzin.com/chosun/game/tdn_vod.js\'></script>') */
//202006 article floating video ad remove

document.write('<div class="left_ad" style="width: 120px; height: 600px; position: absolute; right: 50%; margin-right: 650px; top: 440px;"><script src=\'//yellow.contentsfeed.com/RealMedia/ads/adstream_jx.ads/it.chosun.com/@Left\'></script></div>');
//20191220 article left ad