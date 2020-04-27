<?php
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Lotto Test</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="css/odometer-theme-digital.css" />
    <script src="odometer.js"></script>
    <script type="application/javascript">
        var generateRandom = function (min, max) {
            var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
            return ranNum;
        }
        function go() {
            var obj = document.getElementById("sample");
            var rnd_number = generateRandom(1,99999999);
                obj.innerHTML = rnd_number;
        }
    </script>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
        }
        .odometer{
            font-size: 100px;
        }
    </style>

</head>
<body>
테스트 <br/>
<div id= "sample" class="odometer">012345</div>
<br/>
<button onclick="go();">눌러!</button>
</body>
</html>


