<?php
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>국제 전화 테스트</title>
    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <!-- 합쳐지고 최소화된 최신 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <!-- 부가적인 테마 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
    <!-- 합쳐지고 최소화된 최신 자바스크립트 -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script>
        $(document).on("click", "#btn_left", function () {
            alert('알림이 눌렸습니다.');
        });
    </script>
</head>
<body>
<div class="panel panel-default">
    <div class="panel-body">
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default" id="btn_left">전번입력 테스트</button>
            <button type="button" class="btn btn-default" id="btn_middle">Middle</button>
            <button type="button" class="btn btn-default" id="btn_right">Right</button>
        </div>
    </div>
</div>
<div>
    <pre>
        ...
    </pre>
</div>
</body>
</html>
