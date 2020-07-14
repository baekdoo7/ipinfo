<?php
$cookie = $_COOKIE['ctest'];
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <style>
        .button {
            background-color: blue;
            border: none;
            color: white;
            padding: 15px 30px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
<script type="application/javascript">
    function setCookie(name, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + exp*24*60*60*1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
        //lax 쿠키 굽기
        document.cookie = name + "Lax" + '=' + value +'_lax'+ ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax;';
        //strict 쿠키 굽기
        document.cookie = name + "Strict" + '=' + value +'_strict'+ ';expires=' + date.toUTCString() + ';path=/;SameSite=Strict;';
        //none 쿠키 굽기
        document.cookie = name + "None" + '=' + value +'_none'+ ';expires=' + date.toUTCString() + ';path=/;SameSite=None;Secure;';

    }
    function getCookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        var valueLax = document.cookie.match('(^|;) ?' + name +'Lax'+ '=([^;]*)(;|$)');
        var valueStrict = document.cookie.match('(^|;) ?' + name +'Strict'+ '=([^;]*)(;|$)');
        var valueNone = document.cookie.match('(^|;) ?' + name +'None'+ '=([^;]*)(;|$)');

        var valueTotal = name + " : " + (value? value[2]:null) + "\n";
        if(typeof valueLax !== "undefined"){
            valueTotal += name + "Lax : " + (valueLax? valueLax[2]:null) + "\n";
        }
        if(typeof valueStrict !== "undefined"){
            valueTotal += name + "Strict : " + (valueStrict? valueStrict[2]:null) + "\n";
        }
        if(typeof valueNone !== "undefined"){
            valueTotal += name + "None : " + (valueNone? valueNone[2]:null) + "\n";
        }





            return valueTotal? valueTotal:null;
        //return value? value[2] : null;
    }
    function s_cookie() {
        var obj = document.getElementById("t_1");
        if(obj.value){
            setCookie("ctest",obj.value,1);
            alert("쿠키저장됨!");
            obj.value = "";
        }
    }
    function r_cookie() {
        var cookie = getCookie("ctest");
        if(cookie){
            var obj = document.getElementById("t_2");
            obj.value = cookie;
        }
    }
</script>
</head>
<body style='padding:0px; margin:0px;'>


<div><span style="display:inline-block;width: 100px;">처음 쿠키 내용 : </span><textarea id="t_0" style="width: 200px;height: 200px;"><?=$cookie?></textarea></div>
<div><span style="display:inline-block;width: 100px;">저장할 쿠키 : </span><textarea id="t_1" style="width: 200px;height: 200px;">오징어~</textarea></div>
<div><span style="display:inline-block;width: 100px;">저장된 쿠키 : </span><textarea id="t_2" style="width: 200px;height: 200px;">오징어~</textarea></div>

<div class="button"  onclick="r_cookie();">쿠키읽기</div><div class="button" onclick="s_cookie();">쿠키저장</div>
<!--<script src="http://localhost:8999/cookie/cjs.php"></script>-->
</body>
</html>


