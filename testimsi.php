<?php

?>

<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>CSS</title>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800&amp;subset=korean" rel="stylesheet">
    <style>
        p {
            font-family: "Nanum Gothic", sans-serif;
            font-size: 23px;
        }
        p.a {
            font-weight: 400;
        }
        p.b {
            font-weight: 700;
        }
        p.c {
            font-weight: 800;
        }
        p.d {
            font-weight: bold;
        }
    </style>
</head>
<body>
<p class="a">400 : Lorem Ipsum Dolor 하늘 바다 시나브로</p>
<p class="b">700 : Lorem Ipsum Dolor 하늘 바다 시나브로</p>
<p class="c">800 : Lorem Ipsum Dolor 하늘 바다 시나브로</p>
<p class="d">bold : Lorem Ipsum Dolor 하늘 바다 시나브로</p>
<?php
function aaa(){
    $test01 = "자갈치";
    $tmp = <<< HTML

        오징어
           꼴뚜기
 
           $test01;
        문어
    
HTML;
    echo $tmp;
}
aaa();
?>
</body>
</html>
