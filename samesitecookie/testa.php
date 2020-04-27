<?php
header("Set-Cookie: foo=bar; SameSite=Strict;Secure");
header("Set-Cookie : bob=alice; SameSite=Lax;");
header("Set-Cookie  : juno=im;");

setcookie('tiger','tig123',0,'/;Samesite=strict','',true );

echo "foo : ".$_COOKIE['foo']."<br />\n";
echo "bob : ".$_COOKIE['bob']."<br />\n";
echo "juno : ".$_COOKIE['juno']."<br />\n";
echo "tiger : ".$_COOKIE['tiger']."<br />\n";

echo "<hr />\n";
echo '<pre>';
var_dump($_SERVER['HTTP_COOKIE']);
echo '</pre>';

?>

<a href="q.php">go</a>
<br>
<form method="post" action="q.php">
    <button type=submit>go</button>
</form>


<iframe src="http://compasstest.adop.cc/q.php"></iframe>

<script>
    function setCookie(name, value, day) {
   // 변수를 선언한다.
        var date = new Date();
        date.setDate(date.getDate() + day);
        var willCookie = "";
        willCookie += name + "=" + encodeURIComponent(value) + ";";
        willCookie += "Expires=" + date.toUTCString() + ";";
        willCookie += "Samesite=Strict;Secure; ";
        // 쿠키에 넣습니다.
        document.cookie = willCookie;
    }
    function getCookie(name) {
   // 변수를 선언한다.
        var cookies = document.cookie.split(";");
        // 쿠키를 추출한다.
        for(var i in cookies) {
            if(cookies[i].search(name) != -1) {
                return(decodeURIComponent(cookies[i].replace(name + "=", "")));
            }
        }
    }
    function removeCookie(name) {
   // 변수를 선언한다.
        var date = new Date();
        date.setDate(date.getDate() - 1);
        var willCookie = "";
        willCookie += "CookieName=Value;";
        willCookie += "Expires=" + date.toUTCString();
        // 쿠키를 집어넣는다.
        document.cookie = willCookie;
    }
    function ctest(){
        setCookie('snake','rats',30);
    }
    function ctest2(){
        console.log(getCookie('snake'));
    }


</script>
<br />
<button onclick="ctest();">눌러!</button>
<button onclick="ctest2();">눌러!</button>





