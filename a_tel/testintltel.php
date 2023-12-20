<?php
//https://github.com/jackocnr/intl-tel-input#public-methods
//국제 전화 번호 테스트
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
    <!-- 인터네셔널 전화 CSS -->
    <link rel="stylesheet" href="css/intlTelInput.min.css">
    <!-- 합쳐지고 최소화된 최신 자바스크립트 -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script>
        $(document).on("click", "#btn_left", function () {
            alert('알림이 눌렸습니다.');
        });
    </script>
    <style>
        .iti { width: 100%; }
    </style>
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
<input type="tel" id="phone" value="">
<script src="js/intlTelInput.js"></script>
<script src="js/utils.js"></script>
<script>
    var input = document.querySelector("#phone");
    window.intlTelInput(input, {
        // any initialisation options go here
        initialCountry: "us",
        preferredCountries:['kr','us','cn','jp']
    });
    var iti = window.intlTelInputGlobals.getInstance(input);

    $(document).on("keyup","#phone",function (){
        //console.log($('#phone').val());
        iti.setNumber($('#phone').val());
    });
    input.addEventListener("countrychange", function() {
        // do something with iti.getSelectedCountryData()
        $('#phone').val('');
    });
</script>
</body>
</html>
